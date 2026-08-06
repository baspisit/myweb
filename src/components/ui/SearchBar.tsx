import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { InputHTMLAttributes } from 'react';

export function SearchBar({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{props['aria-label'] ?? 'Search'}</span>
      <MagnifyingGlassIcon aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted" />
      <input
        type="search"
        className="h-11 w-full rounded-control border border-line bg-surface py-2 pl-11 pr-4 text-sm text-ink shadow-sm transition placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        {...props}
      />
    </label>
  );
}
