import { useLocale } from '@/hooks/useLocale';
import { Select } from '@/components/ui/Select';
export function LanguageSwitcher() { const { locale, setLocale } = useLocale(); return <Select aria-label="Language" value={locale} onChange={(event) => setLocale(event.target.value as 'en' | 'th')}><option value="en">EN</option><option value="th">ไทย</option></Select>; }
