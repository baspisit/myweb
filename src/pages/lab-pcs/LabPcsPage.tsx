import { useState } from 'react';
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  TableCellsIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { ClusterStatsBar } from '@/components/cluster/ClusterStatsBar';
import { NodeCard } from '@/components/cluster/NodeCard';
import { NodeTableRow } from '@/components/cluster/NodeTableRow';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useLocale } from '@/hooks/useLocale';
import { useLabCluster, type FilterStatus, type SortField } from '@/hooks/useLabCluster';

export default function LabPcsPage() {
  useDocumentTitle('Lab Workstations', 'Real-time CPU and GPU monitor for PS ChemLab workstations.');
  const { locale } = useLocale();
  const isTh = locale === 'th';

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number>(15);

  const {
    data,
    nodes,
    loading,
    refreshing,
    error,
    refresh,
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort,
  } = useLabCluster(autoRefreshInterval);

  const filterOptions: Array<{ id: FilterStatus; label: string; count?: number }> = [
    { id: 'all', label: isTh ? 'ทั้งหมด' : 'All Nodes', count: data?.totalNodes },
    { id: 'idle', label: isTh ? 'ว่าง (พร้อมใช้)' : 'Available (Idle)', count: data?.idleNodes },
    { id: 'busy', label: isTh ? 'กำลังประมวลผล' : 'In Use (Busy)', count: data?.busyNodes },
    { id: 'offline', label: isTh ? 'ออฟไลน์' : 'Offline', count: data?.offlineNodes },
  ];


  const lastUpdatedFormatted = data?.timestamp
    ? new Date(data.timestamp).toLocaleTimeString(isTh ? 'th-TH' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '';

  return (
    <>
      <PageHeader
        eyebrow={isTh ? 'โครงสร้างพื้นฐานการคำนวณ' : 'Computing Infrastructure'}
        title={isTh ? 'เครื่องเวิร์กสเตชันในแล็บ' : 'Lab Workstations'}
        description={
          isTh
            ? 'ตรวจสอบสถานะการทำงาน หน่วยประมวลผล CPU และการ์ดจอ GPU แบบเรียลไทม์ของเครื่องคอมพิวเตอร์ในห้องปฏิบัติการ'
            : 'Real-time CPU and GPU hardware status, temperature, and compute load across workstations in the lab.'
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={refresh}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-2 rounded-control border border-line bg-surface px-3 py-2 text-sm font-medium text-ink shadow-sm hover:bg-canvas disabled:opacity-60 transition"
            >
              <ArrowPathIcon className={`size-4 ${refreshing ? 'animate-spin text-brand' : ''}`} />
              <span>{refreshing ? (isTh ? 'กำลังดึงข้อมูล...' : 'Refreshing...') : isTh ? 'รีเฟรช' : 'Refresh'}</span>
            </button>
          </div>
        }
      />

      <Section>
        <Container>
          <div className="space-y-6">
            {/* Overview Stats Bar */}
            {data && <ClusterStatsBar summary={data} />}

            {/* Error notice if API had issues */}
            {error && (
              <div className="flex items-center justify-between rounded-card border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-700 dark:text-rose-300">
                <div className="flex items-center gap-2">
                  <ExclamationTriangleIcon className="size-5 shrink-0 text-rose-500" />
                  <span>{error}</span>
                </div>
                <button
                  type="button"
                  onClick={refresh}
                  className="rounded px-2.5 py-1 text-xs font-semibold bg-rose-500 text-white hover:bg-rose-600 transition"
                >
                  {isTh ? 'ลองใหม่' : 'Retry'}
                </button>
              </div>
            )}

            {/* Filter and Search Bar */}
            <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-4 shadow-card lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    isTh
                      ? 'ค้นหา IP, รุ่น GPU (เช่น 5070), หรือ CPU...'
                      : 'Search by IP, GPU model (e.g. 5070), or CPU...'
                  }
                  className="w-full rounded-control border border-line bg-canvas py-2 pl-9 pr-4 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-ink"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Status Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFilter(opt.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                      filter === opt.id
                        ? 'bg-brand text-white shadow-sm'
                        : 'border border-line bg-canvas text-muted hover:bg-surface hover:text-ink'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {opt.count !== undefined && (
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                          filter === opt.id ? 'bg-white/20 text-white' : 'bg-line text-muted'
                        }`}
                      >
                        {opt.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Sort, View Mode & Auto-refresh */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-line/60 lg:border-t-0 lg:pt-0">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <label htmlFor="sort-select" className="shrink-0">{isTh ? 'เรียง:' : 'Sort:'}</label>
                  <select
                    id="sort-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortField)}
                    className="rounded-control border border-line bg-canvas px-2.5 py-1.5 text-xs font-medium text-ink focus:border-brand focus:outline-none"
                  >
                    <option value="ip">{isTh ? 'IP Address (ตามลำดับ)' : 'IP Address (Asc)'}</option>
                    <option value="gpu-desc">{isTh ? 'GPU โหลดสูงสุด' : 'Highest GPU Usage'}</option>
                    <option value="cpu-desc">{isTh ? 'CPU โหลดสูงสุด' : 'Highest CPU Usage'}</option>
                    <option value="temp-desc">{isTh ? 'อุณหภูมิ GPU สูงสุด' : 'Highest GPU Temp'}</option>
                    <option value="status">{isTh ? 'สถานะเครื่อง' : 'Status'}</option>
                  </select>
                </div>

                {/* Auto Refresh Select */}
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <label htmlFor="refresh-select" className="shrink-0">{isTh ? 'อัปเดต:' : 'Auto:'}</label>
                  <select
                    id="refresh-select"
                    value={autoRefreshInterval}
                    onChange={(e) => setAutoRefreshInterval(Number(e.target.value))}
                    className="rounded-control border border-line bg-canvas px-2 py-1.5 text-xs font-medium text-ink focus:border-brand focus:outline-none"
                  >
                    <option value={10}>10s</option>
                    <option value={15}>15s</option>
                    <option value={30}>30s</option>
                    <option value={60}>60s</option>
                    <option value={0}>{isTh ? 'ปิด' : 'Off'}</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center rounded-control border border-line bg-canvas p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`rounded p-1 transition ${
                      viewMode === 'grid' ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
                    }`}
                    title={isTh ? 'แสดงแบบการ์ด' : 'Grid View'}
                  >
                    <Squares2X2Icon className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`rounded p-1 transition ${
                      viewMode === 'table' ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
                    }`}
                    title={isTh ? 'แสดงแบบตาราง' : 'Table View'}
                  >
                    <TableCellsIcon className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Status metadata line */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted px-1">
              <div>
                {isTh ? 'แสดง' : 'Showing'}{' '}
                <strong className="text-ink">{nodes.length}</strong>{' '}
                {isTh ? 'จาก' : 'of'}{' '}
                <strong className="text-ink">{data?.totalNodes || 0}</strong>{' '}
                {isTh ? 'เครื่อง' : 'workstations'}
              </div>
              {lastUpdatedFormatted && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-canvas px-2.5 py-1 border border-line">
                    <span className={`size-2 rounded-full ${refreshing ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
                    <span>{isTh ? 'ดึงข้อมูลเมื่อ:' : 'Data grabbed:'}</span>
                    <strong className="font-mono text-ink">{lastUpdatedFormatted}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Main Content Area */}
            {loading ? (
              <div className="py-16">
                <LoadingState />
              </div>
            ) : nodes.length === 0 ? (
              <EmptyState
                title={isTh ? 'ไม่พบเครื่องที่ตรงกับเงื่อนไข' : 'No workstations found'}
                description={
                  search
                    ? isTh
                      ? `ไม่พบเครื่องที่ตรงกับการค้นหา "${search}"`
                      : `No machines matched your search query "${search}"`
                    : isTh
                      ? 'ไม่มีเครื่องในสถานะนี้'
                      : 'No workstations currently match the selected filter.'
                }
              />
            ) : viewMode === 'grid' ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {nodes.map((node) => (
                  <NodeCard key={node.ip} node={node} />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-card border border-line bg-surface shadow-card">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-line bg-canvas/60 text-xs font-semibold uppercase tracking-wider text-muted">
                      <th className="py-3 px-4">IP Address</th>
                      <th className="py-3 px-3">{isTh ? 'สถานะ' : 'Status'}</th>
                      <th className="py-3 px-3">{isTh ? 'รุ่น CPU' : 'CPU Model'}</th>
                      <th className="py-3 px-3">{isTh ? 'โหลด CPU' : 'CPU Load'}</th>
                      <th className="py-3 px-3">{isTh ? 'รุ่น GPU' : 'GPU Model'}</th>
                      <th className="py-3 px-3">{isTh ? 'โหลด GPU' : 'GPU Load'}</th>
                      <th className="py-3 px-3">{isTh ? 'ความร้อน' : 'Temp'}</th>
                      <th className="py-3 px-3">RAM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/40">
                    {nodes.map((node) => (
                      <NodeTableRow key={node.ip} node={node} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
