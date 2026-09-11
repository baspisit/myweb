import { describe, expect, it } from 'vitest';
import { formatDate, formatDateTime } from '@/lib/dates';

describe('Date formatting utilities', () => {
  const isoString = '2026-09-10T08:37:51.459Z';

  it('formats date correctly for both English and Thai', () => {
    expect(formatDate(isoString, 'en')).toContain('2026');
    expect(formatDate(isoString, 'th')).toContain('2569');
  });

  it('formats date and time together for both English and Thai', () => {
    const enFormatted = formatDateTime(isoString, 'en');
    const thFormatted = formatDateTime(isoString, 'th');

    // English should contain date components and time
    expect(enFormatted).toContain('2026');
    expect(enFormatted).toMatch(/:\d{2}/);

    // Thai should contain Buddhist Era year and time
    expect(thFormatted).toContain('2569');
    expect(thFormatted).toMatch(/:\d{2}/);
  });

  it('handles invalid dates gracefully', () => {
    expect(formatDate('invalid-date', 'en')).toBe('');
    expect(formatDateTime('invalid-date', 'en')).toBe('');
  });
});
