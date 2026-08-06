import type { Video } from '@/types/content'; import { useLocale } from '@/hooks/useLocale'; import { Card } from '@/components/ui/Card';
export function VideoCard({ item }: { item: Video }) { const { localize } = useLocale(); return <Card><h2>{localize(item.title)}</h2></Card>; }
