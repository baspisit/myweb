import type { ButtonHTMLAttributes } from 'react';

export function IconButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex size-10 items-center justify-center rounded-control border border-line bg-surface text-muted shadow-sm transition hover:border-accent hover:text-accent ${className}`} {...props} />;
}
