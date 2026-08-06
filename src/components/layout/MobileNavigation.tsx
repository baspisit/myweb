import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import navigation from '@/data/navigation.json';
import { useLocale } from '@/hooks/useLocale';
import { IconButton } from '@/components/ui/IconButton';
export function MobileNavigation() { const [open, setOpen] = useState(false); const { localize } = useLocale(); return <div className="lg:hidden"><IconButton aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <XMarkIcon className="size-5" /> : <Bars3Icon className="size-5" />}</IconButton>{open && <nav className="absolute inset-x-0 top-full border-b border-line bg-surface p-4 shadow-lg">{navigation.map((item) => <NavLink key={item.id} to={item.path} onClick={() => setOpen(false)} className="block rounded px-3 py-2 text-muted hover:bg-canvas hover:text-ink">{localize(item.label)}</NavLink>)}</nav>}</div>; }
