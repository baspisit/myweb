import type { Documentation } from '@/types/content'; import { useLocale } from '@/hooks/useLocale';
export function DocumentItem({ item }: { item: Documentation }) { const { localize } = useLocale(); return <article className="border-b border-line py-4"><h2>{localize(item.title)}</h2></article>; }
