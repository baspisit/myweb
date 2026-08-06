import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

const classes = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:text-accent';
type ActionProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { children: ReactNode; to?: string; href?: string };

export function SecondaryButton({ children, to, href, className = '', ...props }: ActionProps) {
  const merged = `${classes} ${className}`;
  if (to) return <Link className={merged} to={to}>{children}</Link>;
  if (href) return <a className={merged} href={href} {...props}>{children}</a>;
  return <button className={merged} {...props}>{children}</button>;
}
