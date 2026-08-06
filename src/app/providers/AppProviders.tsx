import type { PropsWithChildren } from 'react';
import { LocaleProvider } from './LocaleProvider';
import { ThemeProvider } from './ThemeProvider';
export function AppProviders({ children }: PropsWithChildren) { return <ThemeProvider><LocaleProvider>{children}</LocaleProvider></ThemeProvider>; }
