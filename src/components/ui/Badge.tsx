import type { PropsWithChildren } from 'react';

export function Badge({ children, tone = 'accent' }: PropsWithChildren<{ tone?: 'accent' | 'brand' | 'neutral' }>) {
  const tones = {
    accent: 'bg-accent/10 text-accent',
    brand: 'bg-brand/10 text-brand',
    neutral: 'bg-canvas text-muted ring-1 ring-inset ring-line',
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold leading-none ${tones[tone]}`}>{children}</span>;
}
