import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { PublicationCard } from '@/components/content/PublicationCard';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { EmptyState } from '@/components/ui/EmptyState';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatisticsCard } from '@/components/ui/StatisticsCard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import publications from '@/data/publications/publications.json';
import type { Publication } from '@/types/content';

const googleScholarUrl = 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Pornthep+Sompornpisut';

export default function PublicationsPage() {
  useDocumentTitle('Research Highlights', 'Selected and recent publications from PS ChemLab research.');
  const sorted = [...(publications as Publication[])].sort((a, b) => b.year - a.year);
  const featured = (publications as Publication[]).filter((publication) => publication.featured);
  const recent = sorted.filter((publication) => publication.recent);
  return (
    <>
      <PageHeader eyebrow="Scholarly work" title="Research Highlights" description="A curated selection of highly cited and recent scholarly contributions from PS ChemLab." />
      <Section>
        <Container>
          <div className="max-w-sm overflow-hidden rounded-card border border-line bg-surface shadow-card"><StatisticsCard icon={DocumentTextIcon} label="Publications" value={sorted.length} /></div>
          <div className="mt-14"><SectionHeader eyebrow="Selected publications" title="Featured Publications" description="Curated research highlights, ordered by citation count when provided." />{featured.length ? <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{featured.map((publication) => <PublicationCard key={publication.id} publication={publication} />)}</div> : <div className="mt-8"><EmptyState title="No featured publications yet" description="Curated publications will appear here after import." /></div>}</div>
          <div className="mt-16"><SectionHeader eyebrow="Current scholarship" title="Recent Publications" description="The recent publication collection, ordered newest first." />{recent.length ? <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{recent.map((publication) => <PublicationCard key={publication.id} publication={publication} />)}</div> : <div className="mt-8"><EmptyState title="No recent publications yet" description="Recent curated publications will appear here after import." /></div>}</div>
          <div className="mt-12"><SecondaryButton href={googleScholarUrl} rel="noreferrer" target="_blank">View Complete Publication List</SecondaryButton></div>
        </Container>
      </Section>
    </>
  );
}
