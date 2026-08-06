import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

const classes = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90 dark:text-slate-950';
type ActionProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { children: ReactNode; to?: string; href?: string };

export function PrimaryButton({ children, to, href, className = '', ...props }: ActionProps) {
  const merged = `${classes} ${className}`;
  if (to) return <Link className={merged} to={to}>{children}</Link>;
  if (href) return <a className={merged} href={href} {...props}>{children}</a>;
  return <button className={merged} {...props}>{children}</button>;
}
