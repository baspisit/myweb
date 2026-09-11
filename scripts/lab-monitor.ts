import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';

const execAsync = promisify(exec);

export interface GpuInfo {
  model: string;
  usagePercent: number;
  memoryUsedMb: number;
  memoryTotalMb: number;
  temperatureC: number;
}

export interface NodeStatus {
  ip: string;
  status: 'online' | 'offline';
  lastUpdated: string;
  error?: string;
  cpu?: {
    model: string;
    cores: number;
    usagePercent: number;
  };
  gpus?: GpuInfo[];
  ram?: {
    totalMb: number;
    usedMb: number;
    usagePercent: number;
  };
  uptime?: string;
}

export interface LabClusterSummary {
  timestamp: string;
  fetchDurationMs?: number;
  totalNodes: number;
  onlineNodes: number;
  offlineNodes: number;
  totalGpus: number;
  avgGpuUsagePercent: number;
  avgCpuUsagePercent: number;
  busyNodes: number;
  idleNodes: number;
  nodes: NodeStatus[];
}

let cachedSummary: LabClusterSummary | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 5000;

export function loadLabConfig() {
  let mouse4Content = '';
  try {
    mouse4Content = fs.readFileSync('/home/ps012/mouse4', 'utf-8');
  } catch {
    console.warn('Could not read /home/ps012/mouse4, using fallback credentials');
  }

  const userMatch = mouse4Content.match(/username="([^"]+)"/);
  const passMatch = mouse4Content.match(/password="([^"]+)"/);
  const ipMatches = [...mouse4Content.matchAll(/"(192\.\d+\.\d+\.\d+)"/g)].map((m) => m[1]);

  const username = userMatch ? userMatch[1] : (process.env.LAB_SSH_USER || 'ps012');
  const password = passMatch ? passMatch[1] : (process.env.LAB_SSH_PASSWORD || '');
  const ips = ipMatches.length > 0 ? [...new Set(ipMatches)] : [
    '192.207.64.20', '192.207.64.39', '192.207.64.65', '192.207.64.71',
    '192.207.64.72', '192.207.64.84', '192.207.64.85', '192.207.64.86',
    '192.207.64.87', '192.207.64.88', '192.207.64.89', '192.207.64.90',
    '192.207.64.91', '192.207.64.92', '192.207.64.93', '192.207.64.94',
    '192.207.64.95', '192.207.64.97', '192.207.64.98', '192.207.64.99',
    '192.207.64.100', '192.207.64.138', '192.207.64.142', '192.207.64.144',
    '192.207.64.147', '192.207.64.149',
  ];

  return { username, password, ips };
}

function cleanCpuName(raw: string): string {
  return raw
    .replace(/\(R\)/g, '')
    .replace(/\(TM\)/g, '')
    .replace(/ CPU/g, '')
    .replace(/ Processor/g, '')
    .replace(/ @.*$/, '')
    .replace(/13th Gen /g, '')
    .replace(/14th Gen /g, '')
    .trim();
}

function cleanGpuName(raw: string): string {
  return raw
    .replace(/^NVIDIA\s+/i, '')
    .replace(/^GeForce\s+/i, '')
    .trim();
}

const REMOTE_B64_SCRIPT = Buffer.from(
  `nvidia-smi --query-gpu=name,utilization.gpu,memory.used,memory.total,temperature.gpu --format=csv,noheader,nounits 2>/dev/null
echo "---SPLIT---"
grep "model name" /proc/cpuinfo | head -n 1 | cut -d: -f2
nproc
free -m | awk '/Mem:/ {print $2, $3}'
uptime -p 2>/dev/null || uptime
read cpu u n s id io ir sir st g gn < /proc/stat
tot1=$((u+n+s+id+io+ir+sir+st))
id1=$((id+io))
sleep 0.3
read cpu u n s id io ir sir st g gn < /proc/stat
tot2=$((u+n+s+id+io+ir+sir+st))
id2=$((id+io))
totd=$((tot2-tot1))
idd=$((id2-id1))
if [ "$totd" -gt 0 ]; then
  echo $(( (100*(totd-idd))/totd ))
else
  echo 0
fi
`
).toString('base64');

export async function fetchNodeStatus(ip: string, username: string, pass: string): Promise<NodeStatus> {
  const sshCmd = `sshpass -p "${pass}" ssh -o ConnectTimeout=2 -o StrictHostKeyChecking=no -o ControlMaster=auto -o ControlPath="/tmp/ssh-%r@%h:%p" -o ControlPersist=60s ${username}@${ip} 'echo "${REMOTE_B64_SCRIPT}" | base64 -d | bash'`;

  try {
    const { stdout } = await execAsync(sshCmd, { timeout: 4000 });
    const parts = stdout.split('---SPLIT---');
    const gpuPart = (parts[0] || '').trim();
    const sysPart = (parts[1] || '').trim();

    const gpus: GpuInfo[] = [];
    if (gpuPart) {
      const gpuLines = gpuPart.split('\n').filter(Boolean);
      for (const line of gpuLines) {
        const tokens = line.split(',').map((t) => t.trim());
        if (tokens.length >= 5) {
          const name = cleanGpuName(tokens[0]);
          const usage = parseInt(tokens[1], 10) || 0;
          const memUsed = parseInt(tokens[2], 10) || 0;
          const memTotal = parseInt(tokens[3], 10) || 0;
          const temp = parseInt(tokens[4], 10) || 0;
          gpus.push({
            model: name,
            usagePercent: usage,
            memoryUsedMb: memUsed,
            memoryTotalMb: memTotal,
            temperatureC: temp,
          });
        }
      }
    }

    const sysLines = sysPart.split('\n').map((l) => l.trim()).filter(Boolean);
    const rawCpuModel = sysLines[0] || 'Unknown CPU';
    const cpuModel = cleanCpuName(rawCpuModel);
    const cpuCores = parseInt(sysLines[1] || '1', 10);

    let ramTotal = 0;
    let ramUsed = 0;
    if (sysLines[2]) {
      const ramTokens = sysLines[2].split(/\s+/);
      ramTotal = parseInt(ramTokens[0], 10) || 0;
      ramUsed = parseInt(ramTokens[1], 10) || 0;
    }
    const ramUsagePercent = ramTotal > 0 ? Math.round((ramUsed / ramTotal) * 100) : 0;

    const uptime = sysLines[3] || '';
    const cpuUsage = parseInt(sysLines[4] || '0', 10);

    return {
      ip,
      status: 'online',
      lastUpdated: new Date().toISOString(),
      cpu: {
        model: cpuModel,
        cores: cpuCores,
        usagePercent: cpuUsage,
      },
      gpus,
      ram: {
        totalMb: ramTotal,
        usedMb: ramUsed,
        usagePercent: ramUsagePercent,
      },
      uptime,
    };
  } catch {
    return {
      ip,
      status: 'offline',
      lastUpdated: new Date().toISOString(),
    };
  }
}

export async function fetchAllNodes(forceRefresh = false): Promise<LabClusterSummary> {
  const now = Date.now();
  if (!forceRefresh && cachedSummary && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedSummary;
  }

  const { username, password, ips } = loadLabConfig();
  // Sort IPs naturally
  ips.sort((a, b) => {
    const numA = parseInt(a.split('.').pop() || '0', 10);
    const numB = parseInt(b.split('.').pop() || '0', 10);
    return numA - numB;
  });

  const startTime = Date.now();
  console.log(`[${new Date().toLocaleTimeString('th-TH')}] Grepping live data from ${ips.length} lab nodes...`);

  const nodes = await Promise.all(ips.map((ip) => fetchNodeStatus(ip, username, password)));
  const fetchDurationMs = Date.now() - startTime;
  const onlineNodesList = nodes.filter((n) => n.status === 'online');
  const onlineNodes = onlineNodesList.length;
  const offlineNodes = nodes.length - onlineNodes;

  let totalGpus = 0;
  let totalGpuUsage = 0;
  let totalCpuUsage = 0;
  let busyNodes = 0;
  let idleNodes = 0;

  for (const node of onlineNodesList) {
    const nodeCpuUsage = node.cpu?.usagePercent || 0;
    totalCpuUsage += nodeCpuUsage;

    let maxGpuUsage = 0;
    if (node.gpus && node.gpus.length > 0) {
      totalGpus += node.gpus.length;
      for (const gpu of node.gpus) {
        totalGpuUsage += gpu.usagePercent;
        if (gpu.usagePercent > maxGpuUsage) {
          maxGpuUsage = gpu.usagePercent;
        }
      }
    }

    // Node is busy if either CPU or any GPU >= 20%
    if (nodeCpuUsage >= 20 || maxGpuUsage >= 20) {
      busyNodes++;
    } else {
      idleNodes++;
    }
  }

  const avgGpuUsagePercent = totalGpus > 0 ? Math.round(totalGpuUsage / totalGpus) : 0;
  const avgCpuUsagePercent = onlineNodes > 0 ? Math.round(totalCpuUsage / onlineNodes) : 0;

  console.log(
    `[${new Date().toLocaleTimeString('th-TH')}] Grep completed in ${(fetchDurationMs / 1000).toFixed(2)}s: ${onlineNodes} online, ${offlineNodes} offline, ${totalGpus} GPUs active`
  );

  const summary: LabClusterSummary = {
    timestamp: new Date().toISOString(),
    fetchDurationMs,
    totalNodes: nodes.length,
    onlineNodes,
    offlineNodes,
    totalGpus,
    avgGpuUsagePercent,
    avgCpuUsagePercent,
    busyNodes,
    idleNodes,
    nodes,
  };

  cachedSummary = summary;
  lastFetchTime = now;

  // Save to public/data/lab-status.json and src/data/lab-status.json for static fallback / build
  try {
    const publicDataDir = path.resolve(process.cwd(), 'public/data');
    if (!fs.existsSync(publicDataDir)) {
      fs.mkdirSync(publicDataDir, { recursive: true });
    }
    fs.writeFileSync(path.join(publicDataDir, 'lab-status.json'), JSON.stringify(summary, null, 2), 'utf-8');

    const srcDataDir = path.resolve(process.cwd(), 'src/data');
    if (fs.existsSync(srcDataDir)) {
      fs.writeFileSync(path.join(srcDataDir, 'lab-status.json'), JSON.stringify(summary, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Failed to write lab-status.json:', err);
  }

  return summary;
}

if (process.argv[1] && process.argv[1].endsWith('lab-monitor.ts')) {
  console.log('Fetching status from all lab nodes...');
  fetchAllNodes(true).then((summary) => {
    console.log(`\nCluster Summary (${summary.nodes.length} nodes):`);
    console.log(`Online: ${summary.onlineNodes} | Offline: ${summary.offlineNodes} | Active GPUs: ${summary.totalGpus}`);
    console.log(`Avg CPU: ${summary.avgCpuUsagePercent}% | Avg GPU: ${summary.avgGpuUsagePercent}% | Idle: ${summary.idleNodes} | Busy: ${summary.busyNodes}\n`);
    console.log('IP Address      | Status  | CPU Load | GPU Model & Load                     | Temp');
    console.log('----------------------------------------------------------------------------------');
    for (const n of summary.nodes) {
      const statusStr = n.status === 'online' ? 'Online ' : 'Offline';
      const cpuStr = n.cpu ? `${String(n.cpu.usagePercent).padStart(3)}%` : ' --- ';
      const gpuStr = n.gpus && n.gpus.length > 0
        ? n.gpus.map((g) => `${g.model} (${g.usagePercent}%)`).join(', ')
        : 'No GPU';
      const tempStr = n.gpus && n.gpus.length > 0
        ? n.gpus.map((g) => `${g.temperatureC}°C`).join(', ')
        : '---';
      console.log(`${n.ip.padEnd(15)} | ${statusStr} | ${cpuStr}   | ${gpuStr.padEnd(36)} | ${tempStr}`);
    }
  });
}
