import type { ReactNode } from 'react';
import { Container } from './Container';

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-surface py-12 sm:py-16">
      <div aria-hidden="true" className="absolute -right-24 -top-24 size-64 rounded-full bg-accent/5 blur-3xl" />
      <Container>
        <div className="relative flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
            <h1 className={`${eyebrow ? 'mt-3' : ''} text-4xl font-semibold tracking-[-0.025em] sm:text-5xl`}>{title}</h1>
            {description && <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
        </div>
      </Container>
    </header>
  );
}
