import { FireIcon } from '@heroicons/react/24/outline';
import type { NodeStatus } from '@/types/lab-cluster';
import { useLocale } from '@/hooks/useLocale';

interface Props {
  node: NodeStatus;
}

function getUsageColor(percent: number) {
  if (percent >= 80) return 'bg-rose-500';
  if (percent >= 50) return 'bg-amber-500';
  return 'bg-emerald-500';
}

function getUsageTextColor(percent: number) {
  if (percent >= 80) return 'text-rose-600 dark:text-rose-400';
  if (percent >= 50) return 'text-amber-600 dark:text-amber-400';
  return 'text-emerald-600 dark:text-emerald-400';
}

export function NodeTableRow({ node }: Props) {
  const { locale } = useLocale();
  const isTh = locale === 'th';

  const isOffline = node.status === 'offline';
  const maxGpuUsage = Math.max(0, ...(node.gpus?.map((g) => g.usagePercent) || [0]));
  const cpuUsage = node.cpu?.usagePercent || 0;
  const isBusy = !isOffline && (maxGpuUsage >= 20 || cpuUsage >= 20);

  let statusBadgeClass = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
  let statusText = isTh ? 'พร้อมใช้' : 'Idle';

  if (isOffline) {
    statusBadgeClass = 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    statusText = isTh ? 'ออฟไลน์' : 'Offline';
  } else if (isBusy) {
    statusBadgeClass = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    statusText = isTh ? 'กำลังใช้งาน' : 'Busy';
  }

  return (
    <tr className={`border-b border-line/60 transition hover:bg-canvas/50 ${isOffline ? 'opacity-60 bg-canvas/20' : ''}`}>
      {/* IP Address */}
      <td className="py-3 px-4 whitespace-nowrap font-mono text-sm font-semibold text-ink">
        <div className="flex items-center gap-2">
          <span
            className={`size-2 rounded-full ${
              isOffline ? 'bg-rose-500' : isBusy ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
          />
          <span>{node.ip}</span>
        </div>
      </td>

      {/* Status */}
      <td className="py-3 px-3 whitespace-nowrap">
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold border ${statusBadgeClass}`}>
          {statusText}
        </span>
      </td>

      {/* CPU Model */}
      <td className="py-3 px-3 text-xs text-ink max-w-[180px] truncate" title={node.cpu?.model}>
        {isOffline ? '—' : node.cpu?.model || '—'}
      </td>

      {/* CPU Usage */}
      <td className="py-3 px-3 whitespace-nowrap">
        {isOffline ? (
          '—'
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 rounded-full bg-canvas border border-line/40 overflow-hidden">
              <div
                className={`h-full ${getUsageColor(cpuUsage)}`}
                style={{ width: `${Math.min(100, Math.max(0, cpuUsage))}%` }}
              />
            </div>
            <span className={`font-mono text-xs font-semibold ${getUsageTextColor(cpuUsage)}`}>
              {cpuUsage}%
            </span>
          </div>
        )}
      </td>

      {/* GPU Model(s) */}
      <td className="py-3 px-3 text-xs text-ink">
        {isOffline ? (
          '—'
        ) : !node.gpus || node.gpus.length === 0 ? (
          <span className="text-muted text-[11px]">No GPU</span>
        ) : (
          <div className="space-y-1">
            {node.gpus.map((g, i) => (
              <div key={i} className="font-medium truncate max-w-[160px]" title={g.model}>
                {g.model}
              </div>
            ))}
          </div>
        )}
      </td>

      {/* GPU Usage */}
      <td className="py-3 px-3 whitespace-nowrap">
        {isOffline || !node.gpus || node.gpus.length === 0 ? (
          '—'
        ) : (
          <div className="space-y-1.5">
            {node.gpus.map((g, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-16 h-2 rounded-full bg-canvas border border-line/40 overflow-hidden">
                  <div
                    className={`h-full ${getUsageColor(g.usagePercent)}`}
                    style={{ width: `${Math.min(100, Math.max(0, g.usagePercent))}%` }}
                  />
                </div>
                <span className={`font-mono text-xs font-semibold ${getUsageTextColor(g.usagePercent)}`}>
                  {g.usagePercent}%
                </span>
              </div>
            ))}
          </div>
        )}
      </td>

      {/* GPU Temp */}
      <td className="py-3 px-3 whitespace-nowrap text-xs">
        {isOffline || !node.gpus || node.gpus.length === 0 ? (
          '—'
        ) : (
          <div className="space-y-1">
            {node.gpus.map((g, i) => (
              <div key={i} className="flex items-center gap-1 font-mono text-muted">
                {g.temperatureC >= 75 && <FireIcon className="size-3 text-rose-500" />}
                <span>{g.temperatureC > 0 ? `${g.temperatureC}°C` : '—'}</span>
              </div>
            ))}
          </div>
        )}
      </td>

      {/* RAM */}
      <td className="py-3 px-3 whitespace-nowrap font-mono text-xs text-muted">
        {isOffline || !node.ram?.totalMb
          ? '—'
          : `${(node.ram.usedMb / 1024).toFixed(1)} / ${(node.ram.totalMb / 1024).toFixed(0)} GB`}
      </td>
    </tr>
  );
}
