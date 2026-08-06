import type { Publication } from '@/types/content'; import { formatCitation } from '@/lib/citations';
export function PublicationItem({ item }: { item: Publication }) { return <article className="border-b border-line py-4"><p>{formatCitation(item)}</p></article>; }
