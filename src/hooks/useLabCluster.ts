import { useState, useEffect, useCallback, useRef } from 'react';
import type { LabClusterSummary, NodeStatus } from '@/types/lab-cluster';

export type FilterStatus = 'all' | 'idle' | 'busy' | 'offline';
export type SortField = 'ip' | 'cpu-desc' | 'gpu-desc' | 'temp-desc' | 'status';

export function useLabCluster(autoRefreshIntervalSec: number = 30) {
  const [data, setData] = useState<LabClusterSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [sort, setSort] = useState<SortField>('ip');

  const mountedRef = useRef(true);

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!mountedRef.current) return;
    if (forceRefresh) setRefreshing(true);

    try {
      let response: Response | null = null;
      try {
        response = await fetch(`/api/lab-pc-status${forceRefresh ? '?refresh=true' : ''}`, {
          headers: { Accept: 'application/json' },
        });
      } catch {
        // Dev server or direct API failed, fallback to static json
        response = null;
      }

      if (!response || !response.ok) {
        // Fallback to static snapshot
        response = await fetch('/data/lab-status.json');
      }

      if (!response.ok) {
        throw new Error(`Failed to load lab data: ${response.statusText}`);
      }

      const json: LabClusterSummary = await response.json();
      if (mountedRef.current) {
        setData(json);
        setError(null);
      }
    } catch (err: unknown) {
      if (mountedRef.current) {
        const message = err instanceof Error ? err.message : 'Unable to connect to lab cluster API';
        setError(message);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    fetchData(false);
    return () => {
      mountedRef.current = false;
    };
  }, [fetchData]);

  // Auto-refresh interval
  useEffect(() => {
    if (!autoRefreshIntervalSec || autoRefreshIntervalSec <= 0) return;
    const interval = setInterval(() => {
      fetchData(false);
    }, autoRefreshIntervalSec * 1000);
    return () => clearInterval(interval);
  }, [autoRefreshIntervalSec, fetchData]);

  // Filter and Sort Nodes
  const filteredNodes = (data?.nodes || []).filter((node: NodeStatus) => {
    // Search query match
    if (search.trim()) {
      const q = search.toLowerCase();
      const ipMatch = node.ip.toLowerCase().includes(q);
      const cpuMatch = node.cpu?.model.toLowerCase().includes(q) || false;
      const gpuMatch = node.gpus?.some((g) => g.model.toLowerCase().includes(q)) || false;
      if (!ipMatch && !cpuMatch && !gpuMatch) return false;
    }

    // Status filter match
    if (filter === 'all') return true;
    if (filter === 'offline') return node.status === 'offline';
    if (node.status === 'offline') return false;

    const maxGpu = Math.max(0, ...(node.gpus?.map((g) => g.usagePercent) || [0]));
    const cpuUsage = node.cpu?.usagePercent || 0;
    const isBusy = maxGpu >= 20 || cpuUsage >= 20;

    if (filter === 'busy') return isBusy;
    if (filter === 'idle') return !isBusy;

    return true;
  });

  const sortedNodes = [...filteredNodes].sort((a, b) => {
    if (sort === 'ip') {
      const numA = parseInt(a.ip.split('.').pop() || '0', 10);
      const numB = parseInt(b.ip.split('.').pop() || '0', 10);
      return numA - numB;
    }
    if (sort === 'status') {
      if (a.status !== b.status) return a.status === 'online' ? -1 : 1;
      const numA = parseInt(a.ip.split('.').pop() || '0', 10);
      const numB = parseInt(b.ip.split('.').pop() || '0', 10);
      return numA - numB;
    }
    if (sort === 'cpu-desc') {
      const cpuA = a.cpu?.usagePercent ?? -1;
      const cpuB = b.cpu?.usagePercent ?? -1;
      return cpuB - cpuA;
    }
    if (sort === 'gpu-desc') {
      const gpuA = Math.max(-1, ...(a.gpus?.map((g) => g.usagePercent) || [-1]));
      const gpuB = Math.max(-1, ...(b.gpus?.map((g) => g.usagePercent) || [-1]));
      return gpuB - gpuA;
    }
    if (sort === 'temp-desc') {
      const tempA = Math.max(-1, ...(a.gpus?.map((g) => g.temperatureC) || [-1]));
      const tempB = Math.max(-1, ...(b.gpus?.map((g) => g.temperatureC) || [-1]));
      return tempB - tempA;
    }
    return 0;
  });

  return {
    data,
    nodes: sortedNodes,
    totalRawCount: data?.nodes.length || 0,
    loading,
    refreshing,
    error,
    refresh: () => fetchData(true),
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort,
  };
}
