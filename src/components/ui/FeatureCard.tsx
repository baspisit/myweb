import type { ComponentType, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import { ContentCard } from './ContentCard';

export function FeatureCard({
  icon: Icon,
  title,
  description,
  to,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  to?: string;
}) {
  const content = (
    <>
      <span className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent"><Icon aria-hidden="true" className="size-6" /></span>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </>
  );
  return <ContentCard interactive={Boolean(to)}>{to ? <Link className="block" to={to}>{content}</Link> : content}</ContentCard>;
}
