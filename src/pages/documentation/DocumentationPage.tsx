import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useLocale } from '@/hooks/useLocale';
import documentation from '@/data/documentation.json';

export default function DocumentationPage() {
  useDocumentTitle('Documentation'); const { localize } = useLocale();
  return <><PageHeader eyebrow="Guides" title="Documentation" description="Guides and reference material for PS ChemLab resources." /><Section><Container>{documentation.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{documentation.map((item) => <ContentCard key={item.id}><span className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand"><DocumentTextIcon aria-hidden="true" className="size-6" /></span><div className="mt-5"><Badge>{item.type}</Badge></div><h2 className="mt-4 text-lg font-semibold">{localize(item.title)}</h2><p className="mt-2 text-sm leading-6 text-muted">{localize(item.summary)}</p></ContentCard>)}</div> : <EmptyState title="No documentation yet" />}</Container></Section></>;
}
