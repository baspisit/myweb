import { useMemo } from 'react';
export function useContentFilter<T>(items: T[], query: string, getText: (item: T) => string) { return useMemo(() => { const term = query.trim().toLocaleLowerCase(); return term ? items.filter((item) => getText(item).toLocaleLowerCase().includes(term)) : items; }, [items, query, getText]); }
