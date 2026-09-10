import {
  ServerIcon,
  CpuChipIcon,
  BoltIcon,
  CheckCircleIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';
import type { LabClusterSummary } from '@/types/lab-cluster';
import { useLocale } from '@/hooks/useLocale';

interface Props {
  summary: LabClusterSummary;
}

export function ClusterStatsBar({ summary }: Props) {
  const { locale } = useLocale();
  const isTh = locale === 'th';

  const stats = [
    {
      id: 'nodes',
      label: isTh ? 'เครื่องทั้งหมด' : 'Total Workstations',
      value: summary.totalNodes,
      subValue: isTh
        ? `${summary.onlineNodes} ออนไลน์ / ${summary.offlineNodes} ออฟไลน์`
        : `${summary.onlineNodes} Online · ${summary.offlineNodes} Offline`,
      icon: ServerIcon,
      color: 'text-brand bg-brand/10',
    },
    {
      id: 'available',
      label: isTh ? 'เครื่องว่าง (พร้อมใช้)' : 'Available (Idle)',
      value: summary.idleNodes,
      subValue: isTh
        ? `${summary.busyNodes} เครื่องกำลังประมวลผล`
        : `${summary.busyNodes} Nodes Active / Busy`,
      icon: CheckCircleIcon,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
    },
    {
      id: 'gpus',
      label: isTh ? 'จำนวน GPU' : 'Active GPUs',
      value: summary.totalGpus,
      subValue: isTh
        ? `โหลดเฉลี่ย ${summary.avgGpuUsagePercent}%`
        : `Avg Utilization ${summary.avgGpuUsagePercent}%`,
      icon: BoltIcon,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
    },
    {
      id: 'cpu',
      label: isTh ? 'โหลด CPU เฉลี่ย' : 'Cluster CPU Load',
      value: `${summary.avgCpuUsagePercent}%`,
      subValue: isTh ? 'ค่าเฉลี่ยทุกเครื่อง' : 'Across online nodes',
      icon: CpuChipIcon,
      color: 'text-sky-600 dark:text-sky-400 bg-sky-500/10',
    },
    {
      id: 'status',
      label: isTh ? 'สถานะคลัสเตอร์' : 'Cluster Health',
      value: summary.onlineNodes === summary.totalNodes ? '100%' : `${Math.round((summary.onlineNodes / (summary.totalNodes || 1)) * 100)}%`,
      subValue: isTh ? 'ความพร้อมใช้งานเครือข่าย' : 'Network Connectivity',
      icon: SignalIcon,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="flex flex-col justify-between rounded-card border border-line bg-surface p-4 shadow-card transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">{stat.label}</span>
              <span className={`grid size-8 place-items-center rounded-lg ${stat.color}`}>
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-ink">{stat.value}</div>
              <div className="mt-1 text-xs text-muted truncate">{stat.subValue}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
