import type { ComponentType, SVGProps } from 'react';
import { Link } from 'react-router-dom';

export function StatisticsCard({
  icon: Icon,
  label,
  value,
  to,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: number | string;
  to?: string;
}) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent"><Icon aria-hidden="true" className="size-5" /></span>
      <span><strong className="block text-2xl font-semibold tracking-tight">{value}</strong><span className="text-sm text-muted">{label}</span></span>
    </>
  );
  return to ? <Link className="flex items-center gap-4 p-6 transition hover:bg-canvas" to={to}>{content}</Link> : <div className="flex items-center gap-4 p-6">{content}</div>;
}
