import type { Locale } from '@/types/localization';

export function formatDate(value: string | Date, locale: Locale) {
  try {
    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-US', {
      dateStyle: 'medium',
    }).format(date);
  } catch {
    return '';
  }
}

export function formatDateTime(value: string | Date, locale: Locale) {
  try {
    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium',
    }).format(date);
  } catch {
    return '';
  }
}
