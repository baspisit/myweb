import type { NewsArticle } from '@/types/content'; import { useLocale } from '@/hooks/useLocale'; import { Card } from '@/components/ui/Card';
export function NewsCard({ item }: { item: NewsArticle }) { const { localize } = useLocale(); return <Card><h2>{localize(item.title)}</h2><p className="text-muted">{localize(item.summary)}</p></Card>; }
