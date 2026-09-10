import { useState, useEffect, useCallback, useRef } from 'react';
import type { LabClusterSummary, NodeStatus } from '@/types/lab-cluster';
import fallbackData from '@/data/lab-status.json';

export type FilterStatus = 'all' | 'idle' | 'busy' | 'offline';
export type SortField = 'ip' | 'cpu-desc' | 'gpu-desc' | 'temp-desc' | 'status';

export function useLabCluster(autoRefreshIntervalSec: number = 30) {
  const [data, setData] = useState<LabClusterSummary | null>(fallbackData as unknown as LabClusterSummary);
  const [loading, setLoading] = useState<boolean>(false);
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
      let json: LabClusterSummary | null = null;

      // 1. Try live API endpoint first
      try {
        const response = await fetch(`/api/lab-pc-status${forceRefresh ? '?refresh=true' : ''}`, {
          headers: { Accept: 'application/json' },
        });
        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          json = await response.json();
        }
      } catch {
        // Live API unreachable
      }

      // 2. If live API returned HTML (e.g. Netlify SPA rewrite) or failed, load static JSON
      if (!json) {
        try {
          const response = await fetch('/data/lab-status.json');
          const contentType = response.headers.get('content-type') || '';
          if (response.ok && contentType.includes('application/json')) {
            json = await response.json();
          }
        } catch {
          // Static fetch failed
        }
      }

      // 3. Fall back to bundled data if needed
      if (!json) {
        json = fallbackData as unknown as LabClusterSummary;
      }

      if (mountedRef.current) {
        setData(json);
        setError(null);
      }
    } catch {
      if (mountedRef.current) {
        setData(fallbackData as unknown as LabClusterSummary);
        setError(null);
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
