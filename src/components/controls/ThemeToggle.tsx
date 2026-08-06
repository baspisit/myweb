import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/hooks/useTheme';
import { IconButton } from '@/components/ui/IconButton';
export function ThemeToggle() { const { theme, setTheme } = useTheme(); const dark = theme === 'dark'; return <IconButton aria-label={dark ? 'Use light mode' : 'Use dark mode'} onClick={() => setTheme(dark ? 'light' : 'dark')}>{dark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}</IconButton>; }
