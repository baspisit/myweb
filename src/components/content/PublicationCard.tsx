import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, DocumentTextIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';
import { ContentCard } from '@/components/ui/ContentCard';
import { OptionalImage } from '@/components/ui/OptionalImage';
import { publicationEditorial } from '@/content/content-registry';
import type { Publication } from '@/types/content';

export function PublicationCard({ publication }: { publication: Publication }) {
  const editorial = publicationEditorial[publication.id] ?? {};
  const journal = publication.journal ?? editorial.journal ?? publication.type.replaceAll('-', ' ');
  const abstract = publication.abstract ?? editorial.abstract;
  const pdfUrl = publication.pdf ?? editorial.pdfUrl;
  return (
    <ContentCard className="flex h-full flex-col overflow-hidden p-0">
      <div className="aspect-[16/7] border-b border-line bg-canvas">
        <OptionalImage
          alt={`Graphical abstract for ${publication.title}`}
          className="size-full object-cover"
          src={publication.graphicalAbstract ?? `/images/publications/${publication.id}/graphical-abstract.webp`}
          fallback={<div className="grid size-full place-items-center text-center text-muted"><div><PhotoIcon aria-hidden="true" className="mx-auto size-8" /><p className="mt-2 text-xs font-medium">Graphical abstract not available</p></div></div>}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand"><DocumentTextIcon aria-hidden="true" className="size-5" /></span>
          <Badge tone="neutral">{publication.year}</Badge>
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-accent">{journal}</p>
        <h3 className="mt-2 text-lg font-semibold leading-7">{publication.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">{publication.authors.map((author) => author.name).join(', ')}</p>
        {(publication.volume || publication.issue || publication.pages) && <p className="mt-2 text-xs leading-5 text-muted">{[publication.volume && `Vol. ${publication.volume}`, publication.issue && `Issue ${publication.issue}`, publication.pages && `pp. ${publication.pages}`].filter(Boolean).join(' · ')}</p>}
        {abstract && <p className="mt-4 line-clamp-4 flex-1 text-sm leading-6 text-muted">{abstract}</p>}
        {(publication.relatedSoftware?.length || publication.relatedResearch?.length) ? <div className="mt-4 flex flex-wrap gap-2">{publication.relatedSoftware?.map((item) => <Badge key={`software-${item}`} tone="neutral">Software: {item}</Badge>)}{publication.relatedResearch?.map((item) => <Badge key={`research-${item}`} tone="neutral">Research: {item}</Badge>)}</div> : null}
        <div className="mt-6 flex flex-wrap gap-4">
          {publication.doi && <a className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline" href={`https://doi.org/${publication.doi}`} rel="noreferrer" target="_blank">DOI <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-4" /></a>}
          {pdfUrl && <a className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline" href={pdfUrl} rel="noreferrer" target="_blank">PDF <ArrowDownTrayIcon aria-hidden="true" className="size-4" /></a>}
        </div>
      </div>
    </ContentCard>
  );
}
