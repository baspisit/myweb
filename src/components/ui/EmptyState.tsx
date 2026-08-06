import { BeakerIcon } from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';

export function EmptyState({ title, description, message, action }: { title?: string; description?: string; message?: string; action?: ReactNode }) {
  const heading = title ?? message ?? 'No items found.';
  return (
    <div className="rounded-card border border-dashed border-line bg-surface px-6 py-14 text-center shadow-card">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent/10 text-accent"><BeakerIcon aria-hidden="true" className="size-6" /></span>
      <h2 className="mt-5 font-semibold text-ink">{heading}</h2>
      {description && <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
