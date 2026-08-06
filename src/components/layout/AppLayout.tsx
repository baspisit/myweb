import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { SkipLink } from '@/components/ui/SkipLink';
export function AppLayout() { return <div className="flex min-h-screen flex-col"><SkipLink /><Header /><main id="main-content" className="flex-1"><Outlet /></main><Footer /><ScrollRestoration /></div>; }
