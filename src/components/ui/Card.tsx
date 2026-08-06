import type { PropsWithChildren } from 'react';

export function Card({ children }: PropsWithChildren) {
  return <article className="rounded-card border border-line bg-surface p-6 shadow-card">{children}</article>;
}
