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
