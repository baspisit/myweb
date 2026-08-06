import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useLocale } from '@/hooks/useLocale';
import downloads from '@/data/downloads.json';

export default function DownloadsPage() {
  useDocumentTitle('Downloads'); const { localize } = useLocale();
  return <><PageHeader eyebrow="Resources" title="Downloads" description="Teaching materials and downloadable chemistry resources." /><Section><Container>{downloads.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{downloads.map((item) => <ContentCard className="flex flex-col" key={item.id}><span className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent"><ArrowDownTrayIcon aria-hidden="true" className="size-6" /></span><h2 className="mt-5 text-lg font-semibold">{localize(item.title)}</h2>{item.description && <p className="mt-2 flex-1 text-sm leading-6 text-muted">{localize(item.description)}</p>}<PrimaryButton className="mt-6" href={item.file.path} download>Download</PrimaryButton></ContentCard>)}</div> : <EmptyState title="No downloads yet" />}</Container></Section></>;
}
