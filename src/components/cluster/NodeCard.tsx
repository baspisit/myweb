import {
  CpuChipIcon,
  BoltIcon,
  ServerIcon,
  FireIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';
import type { NodeStatus, GpuInfo } from '@/types/lab-cluster';
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

function getTempBadgeColor(temp: number) {
  if (temp >= 80) return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/30';
  if (temp >= 70) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/30';
  return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/30';
}

export function NodeCard({ node }: Props) {
  const { locale } = useLocale();
  const isTh = locale === 'th';

  const isOffline = node.status === 'offline';
  const maxGpuUsage = Math.max(0, ...(node.gpus?.map((g) => g.usagePercent) || [0]));
  const cpuUsage = node.cpu?.usagePercent || 0;
  const isBusy = !isOffline && (maxGpuUsage >= 20 || cpuUsage >= 20);

  // Status indicator
  let statusText = isTh ? 'พร้อมใช้ (ว่าง)' : 'Available / Idle';
  let statusDotClass = 'bg-emerald-500';
  let statusBadgeClass = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';

  if (isOffline) {
    statusText = isTh ? 'ออฟไลน์' : 'Offline';
    statusDotClass = 'bg-rose-500';
    statusBadgeClass = 'bg-rose-500/10 text-rose-600 dark:text-rose-400';
  } else if (isBusy) {
    statusText = isTh ? 'กำลังประมวลผล' : 'In Use / Busy';
    statusDotClass = 'bg-amber-500';
    statusBadgeClass = 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
  }

  return (
    <div
      className={`flex flex-col justify-between rounded-card border transition duration-200 bg-surface shadow-card hover:shadow-raised ${
        isOffline
          ? 'border-line/60 opacity-70'
          : isBusy
            ? 'border-amber-500/30 ring-1 ring-amber-500/10'
            : 'border-line hover:border-brand/40'
      }`}
    >
      {/* Header */}
      <div className="border-b border-line/60 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              {!isOffline && (
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusDotClass}`}
                />
              )}
              <span className={`relative inline-flex size-2.5 rounded-full ${statusDotClass}`} />
            </span>
            <span className="font-mono text-base font-bold text-ink tracking-tight">
              {node.ip}
            </span>
          </div>

          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadgeClass}`}
          >
            {statusText}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 space-y-4">
        {isOffline ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted">
            <ServerIcon className="size-8 stroke-1 text-muted/40 mb-2" />
            <span className="text-sm font-medium text-muted/70">{isTh ? 'ออฟไลน์' : 'Offline'}</span>
          </div>
        ) : (
          <>
            {/* CPU Section */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 font-medium text-ink truncate max-w-[70%]">
                  <CpuChipIcon className="size-4 shrink-0 text-sky-500" />
                  <span className="truncate" title={node.cpu?.model}>
                    {node.cpu?.model || 'Unknown CPU'}
                  </span>
                  {node.cpu?.cores ? (
                    <span className="shrink-0 rounded bg-canvas px-1 py-0.5 text-[10px] text-muted border border-line">
                      {node.cpu.cores}c
                    </span>
                  ) : null}
                </div>
                <span className={`font-mono font-semibold ${getUsageTextColor(cpuUsage)}`}>
                  {cpuUsage}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-canvas border border-line/40">
                <div
                  className={`h-full transition-all duration-500 ${getUsageColor(cpuUsage)}`}
                  style={{ width: `${Math.min(100, Math.max(0, cpuUsage))}%` }}
                />
              </div>
            </div>

            {/* GPU Section */}
            <div className="space-y-3">
              {(!node.gpus || node.gpus.length === 0) ? (
                <div className="rounded-md border border-dashed border-line p-2 text-center text-xs text-muted">
                  {isTh ? 'ไม่พบการ์ดจอ NVIDIA' : 'No NVIDIA GPU detected'}
                </div>
              ) : (
                node.gpus.map((gpu: GpuInfo, idx: number) => {
                  const memUsedGb = (gpu.memoryUsedMb / 1024).toFixed(1);
                  const memTotalGb = (gpu.memoryTotalMb / 1024).toFixed(1);
                  const memPercent =
                    gpu.memoryTotalMb > 0
                      ? Math.round((gpu.memoryUsedMb / gpu.memoryTotalMb) * 100)
                      : 0;

                  return (
                    <div
                      key={idx}
                      className="rounded-lg border border-line/70 bg-canvas/40 p-2.5 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 font-medium text-ink truncate max-w-[65%]">
                          <BoltIcon className="size-4 shrink-0 text-amber-500" />
                          <span className="truncate font-semibold" title={gpu.model}>
                            {gpu.model}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {gpu.temperatureC > 0 && (
                            <span
                              className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${getTempBadgeColor(
                                gpu.temperatureC
                              )}`}
                              title={`GPU Temp: ${gpu.temperatureC}°C`}
                            >
                              <FireIcon className="size-3" />
                              {gpu.temperatureC}°C
                            </span>
                          )}
                          <span
                            className={`font-mono font-semibold ${getUsageTextColor(
                              gpu.usagePercent
                            )}`}
                          >
                            {gpu.usagePercent}%
                          </span>
                        </div>
                      </div>

                      {/* GPU Usage Bar */}
                      <div className="h-2 w-full overflow-hidden rounded-full bg-canvas border border-line/40">
                        <div
                          className={`h-full transition-all duration-500 ${getUsageColor(
                            gpu.usagePercent
                          )}`}
                          style={{ width: `${Math.min(100, Math.max(0, gpu.usagePercent))}%` }}
                        />
                      </div>

                      {/* GPU VRAM info */}
                      {gpu.memoryTotalMb > 0 && (
                        <div className="flex items-center justify-between text-[11px] text-muted">
                          <span className="flex items-center gap-1">
                            <CircleStackIcon className="size-3" />
                            <span>VRAM</span>
                          </span>
                          <span className="font-mono">
                            {memUsedGb} / {memTotalGb} GB ({memPercent}%)
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer Info */}
      {!isOffline && node.ram?.totalMb ? (
        <div className="border-t border-line/60 bg-canvas/30 px-4 py-2 text-[11px] text-muted flex items-center justify-between">
          <div className="flex items-center gap-1">
            <CircleStackIcon className="size-3 text-muted" />
            <span>RAM:</span>
            <span className="font-mono text-ink">
              {`${(node.ram.usedMb / 1024).toFixed(1)} / ${(node.ram.totalMb / 1024).toFixed(1)} GB`}
            </span>
          </div>
          <span className="font-mono text-muted">
            {node.ram.usagePercent}%
          </span>
        </div>
      ) : null}
    </div>
  );
}
