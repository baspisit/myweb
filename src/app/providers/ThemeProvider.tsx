import { createContext, useEffect, useMemo, type PropsWithChildren } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
export type Theme = 'light' | 'dark';
export const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void } | null>(null);
export function ThemeProvider({ children }: PropsWithChildren) {
  const preferred: Theme = typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [theme, setTheme] = useLocalStorage<Theme>('ps-chemlab-theme', preferred);
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); }, [theme]);
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
