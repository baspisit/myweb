import type { InputHTMLAttributes } from 'react';

export function SearchInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="search"
      className={`w-full rounded-md border border-line bg-surface px-3 py-2 text-ink placeholder:text-muted ${className}`}
      {...props}
    />
  );
}
