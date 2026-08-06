import { Link } from 'react-router-dom';
import { Container } from './Container';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';
import { ThemeToggle } from '@/components/controls/ThemeToggle';
import { LanguageSwitcher } from '@/components/controls/LanguageSwitcher';

export function Header() {
  return <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-xl"><Container><div className="relative flex h-16 items-center gap-2 sm:gap-3"><Link to="/" aria-label="PS ChemLab home" className="mr-auto inline-flex items-center gap-2.5 font-semibold tracking-tight text-brand"><img alt="" className="size-9 shrink-0" src="/images/branding/ps-chemlab-mark.svg" /><span className="max-[420px]:hidden">PS ChemLab</span></Link><DesktopNavigation /><div className="ml-1 hidden h-6 w-px bg-line lg:block" /><LanguageSwitcher /><ThemeToggle /><MobileNavigation /></div></Container></header>;
}
