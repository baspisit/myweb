import { youtubeEmbedUrl } from '@/lib/youtube';
export function VideoEmbed({ youtubeId, title }: { youtubeId: string; title: string }) { return <div className="aspect-video overflow-hidden rounded-xl"><iframe className="size-full" src={youtubeEmbedUrl(youtubeId)} title={title} loading="lazy" allowFullScreen /></div>; }
