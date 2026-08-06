import { createContext, useEffect, useMemo, type PropsWithChildren } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Locale, LocalizedText } from '@/types/localization';
export const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void; localize: (text: LocalizedText) => string } | null>(null);
export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useLocalStorage<Locale>('ps-chemlab-locale', 'en');
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const value = useMemo(() => ({ locale, setLocale, localize: (text: LocalizedText) => text[locale] || text.en }), [locale, setLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
