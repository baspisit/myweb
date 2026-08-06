import site from '@/data/site.json';
import { useLocale } from '@/hooks/useLocale';
export function IndependentSiteNotice() { const { localize } = useLocale(); return <p className="text-sm text-muted">{localize(site.institutionalDisclaimer)}</p>; }
