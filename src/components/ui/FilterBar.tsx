import type { PropsWithChildren } from 'react';
export function FilterBar({ children }: PropsWithChildren) { return <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 sm:flex-row">{children}</div>; }
