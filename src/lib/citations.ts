import type { Publication } from '@/types/content';
export function formatCitation(item: Publication) { return `${item.authors.map((author) => author.name).join(', ')} (${item.year}). ${item.title}.`; }
