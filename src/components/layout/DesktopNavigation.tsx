import { NavLink } from 'react-router-dom';
import navigation from '@/data/navigation.json';
import { useLocale } from '@/hooks/useLocale';

export function DesktopNavigation() {
  const { localize } = useLocale();
  return <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">{navigation.map((item) => <NavLink key={item.id} to={item.path} className={({ isActive }) => `rounded-control px-2.5 py-2 text-sm font-medium transition ${isActive ? 'bg-brand/10 text-brand' : 'text-muted hover:bg-canvas hover:text-ink'}`}>{localize(item.label)}</NavLink>)}</nav>;
}
