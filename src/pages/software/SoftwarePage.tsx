import { CommandLineIcon } from '@heroicons/react/24/outline';
import { SoftwareCard } from '@/components/content/SoftwareCard';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { StatisticsCard } from '@/components/ui/StatisticsCard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { importedSoftware } from '@/lib/imported-content';

export default function SoftwarePage() {
  useDocumentTitle('Software');
  return (
    <>
      <PageHeader eyebrow="Academic tools" title="Software" description="Educational and research applications for chemistry learning and molecular exploration." />
      <Section>
        <Container>
          <div className="max-w-sm overflow-hidden rounded-card border border-line bg-surface shadow-card">
            <StatisticsCard icon={CommandLineIcon} label="Available tools" value={importedSoftware.length} />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {importedSoftware.map((software) => <SoftwareCard key={software.name} software={software} />)}
          </div>
        </Container>
      </Section>
    </>
  );
}
