import {
  ArrowDownTrayIcon,
  CheckCircleIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import { CourseCard } from '@/components/content/CourseCard';
import { PublicationCard } from '@/components/content/PublicationCard';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { OptionalImage } from '@/components/ui/OptionalImage';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useLocale } from '@/hooks/useLocale';
import { useSeoMetadata } from '@/hooks/useSeoMetadata';
import { importedCourses, softwareBySlug } from '@/lib/imported-content';
import { getSoftwareEditorial } from '@/content/content-registry';
import publications from '@/data/publications/publications.json';
import research from '@/data/research.json';
import type { Publication } from '@/types/content';

export default function SoftwareDetailPage() {
  const { slug } = useParams();
  const { localize } = useLocale();
  const software = softwareBySlug(slug);
  const description = software
    ? (software.description ?? `${software.name} is a PS ChemLab application for chemistry education and research.`)
    : 'The requested PS ChemLab software page could not be found.';
  useSeoMetadata({ title: software?.name ?? 'Software not found', description });

  if (!software) {
    return <Section><Container><EmptyState title="Software not found" description="The requested software is not available in the current catalog." action={<SecondaryButton to="/software">Back to software</SecondaryButton>} /></Container></Section>;
  }

  const platform = software.platform || 'Not specified';
  const editorial = getSoftwareEditorial(slug ?? '');
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-surface py-8 sm:py-12">
        <div aria-hidden="true" className="absolute right-0 top-0 size-80 rounded-full bg-accent/5 blur-3xl" />
        <Container>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Software', path: '/software' }, { label: software.name }]} />
          <div className="relative mt-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-3"><Badge>{platform}</Badge><Badge tone="neutral">{editorial.version}</Badge></div>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{software.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton href={software.download} download={software.download.startsWith('/')} rel="noreferrer" target={software.download.startsWith('/') ? undefined : '_blank'}>Download <ArrowDownTrayIcon aria-hidden="true" className="size-5" /></PrimaryButton>
                <SecondaryButton to="/documentation">Documentation <DocumentTextIcon aria-hidden="true" className="size-5" /></SecondaryButton>
              </div>
            </div>
            <div className="hidden size-48 place-items-center overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-brand/10 to-accent/10 text-brand shadow-card lg:grid">
              {software.icon ? <img alt="" className="size-full object-cover" src={software.icon} /> : <CommandLineIcon aria-hidden="true" className="size-20" />}
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Preview" title="Screenshot gallery" description="Authentic screenshots supplied from the application." />
          {software.screenshots.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {software.screenshots.map((screenshot, index) => (
                <a className="group overflow-hidden rounded-card border border-line bg-surface shadow-card" href={screenshot} key={screenshot} target="_blank" rel="noreferrer">
                  <OptionalImage alt={`${software.name} screenshot ${index + 1}`} className="aspect-[4/3] size-full object-contain transition duration-300 group-hover:scale-[1.02]" src={screenshot} fallback={<div className="grid aspect-[4/3] place-items-center text-sm text-muted">Screenshot unavailable</div>} />
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-8"><EmptyState title="No screenshots available" description="This gallery will remain empty until a complete set of authentic application screenshots is available." /></div>
          )}
        </Container>
      </Section>

      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <ContentCard><h2 className="text-xl font-semibold">Overview</h2><p className="mt-4 leading-7 text-muted">{editorial.overview}</p></ContentCard>
            <ContentCard><h2 className="text-xl font-semibold">Supported operating systems</h2><div className="mt-5 flex items-center gap-3"><ComputerDesktopIcon aria-hidden="true" className="size-6 text-accent" /><span>{platform}</span></div><p className="mt-4 text-sm leading-6 text-muted">Additional compatibility information has not yet been specified.</p></ContentCard>
            <ContentCard><h2 className="text-xl font-semibold">Version information</h2><p className="mt-4 text-xl font-semibold tracking-tight">{editorial.version}</p><p className="mt-3 text-sm leading-6 text-muted">Release notes and version history will be published with verified release metadata.</p></ContentCard>
          </div>
          <ContentCard className="mt-6">
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {editorial.features.map((feature) => <li className="flex gap-3 text-sm leading-6" key={feature}><CheckCircleIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />{feature}</li>)}
            </ul>
          </ContentCard>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Learn" title="Documentation" description="Installation guides, usage notes, and technical documentation." />
              <ContentCard className="mt-8"><DocumentTextIcon aria-hidden="true" className="size-8 text-accent" /><h3 className="mt-4 font-semibold">Installation and software documentation</h3><p className="mt-2 text-sm leading-6 text-muted">{editorial.documentation}</p>{software.packages?.length ? <div className="mt-6 flex flex-wrap gap-3">{software.packages.map((item) => <SecondaryButton download href={item.url} key={item.url}>{item.label}</SecondaryButton>)}</div> : <div className="mt-6"><SecondaryButton to="/documentation">Browse documentation</SecondaryButton></div>}</ContentCard>
            </div>
            <div>
              <SectionHeader eyebrow="Support" title="Frequently asked questions" description="Common questions about installation and use." />
              <div className="mt-8 overflow-hidden rounded-card border border-line bg-surface shadow-card">
                {editorial.faqs.map(({ question, answer }) => <details className="group border-b border-line p-5 last:border-0" key={question}><summary className="cursor-pointer font-medium marker:text-accent">{question}</summary><p className="mt-3 text-sm leading-6 text-muted">{answer}</p></details>)}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeader eyebrow="Academic connections" title="Related resources" description="Explore courses, research, and publications from the existing PS ChemLab catalog." />
          <h3 className="mt-10 text-xl font-semibold">Related courses</h3>
          <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{importedCourses.map((course) => <CourseCard course={course} key={course.courseCode} />)}</div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div><h3 className="text-xl font-semibold">Related research</h3><div className="mt-5 grid gap-5">{research.slice(0, 2).map((project) => <ContentCard key={project.id}><Badge>{project.currentStatus}</Badge><h4 className="mt-4 text-lg font-semibold">{localize(project.title)}</h4><p className="mt-2 text-sm leading-6 text-muted">{localize(project.summary)}</p></ContentCard>)}</div></div>
            <div><h3 className="text-xl font-semibold">Related publications</h3><div className="mt-5 grid gap-5">{publications.length ? (publications as Publication[]).slice(0, 2).map((publication) => <PublicationCard key={publication.id} publication={publication} />) : <EmptyState title="No verified publications yet" description="Related publications will appear after bibliographic review." />}</div></div>
          </div>
        </Container>
      </section>
    </>
  );
}
