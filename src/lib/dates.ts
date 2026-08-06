import type { Locale } from '@/types/localization';
export function formatDate(value: string, locale: Locale) { return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-US', { dateStyle: 'medium' }).format(new Date(value)); }
