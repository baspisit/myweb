import type { Download } from '@/types/content'; import { useLocale } from '@/hooks/useLocale';
export function DownloadItem({ item }: { item: Download }) { const { localize } = useLocale(); return <article className="border-b border-line py-4"><a href={item.file.path} download className="font-medium text-brand">{localize(item.title)}</a></article>; }
