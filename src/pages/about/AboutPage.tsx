import {
  AcademicCapIcon,
  BeakerIcon,
  CommandLineIcon,
  EnvelopeIcon,
  LightBulbIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatisticsCard } from '@/components/ui/StatisticsCard';
import { OptionalImage } from '@/components/ui/OptionalImage';
import { useLocale } from '@/hooks/useLocale';
import { useSeoMetadata } from '@/hooks/useSeoMetadata';
import { importedCourses, importedLectures, importedSoftware } from '@/lib/imported-content';
import people from '@/data/people.json';
import research from '@/data/research.json';
import site from '@/data/site.json';
import { collaborators, professorBiography } from '@/content/content-registry';

export default function AboutPage() {
  const { localize } = useLocale();
  const person = people[0];
  const researchAreas = [...new Set(research.flatMap((project) => project.researchAreas))];
  const description = localize(site.description);
  const contactEmail = person?.contact.email ?? site.contact.email;
  const approvedContact = contactEmail.endsWith('@example.com') ? undefined : contactEmail;
  useSeoMetadata({ title: 'About', description });

  return (
    <>
      <PageHeader eyebrow="About the portal" title="PS ChemLab" description={description} />

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard icon={BeakerIcon} title="Mission" description={localize(site.tagline)} />
            <FeatureCard icon={LightBulbIcon} title="Educational philosophy" description="Make chemistry concepts approachable through structured lectures, practical digital tools, and open academic resources." />
            <FeatureCard icon={CommandLineIcon} title="Software ecosystem" description={`${importedSoftware.length} applications support chemistry education, visualization, and research workflows.`} />
          </div>
        </Container>
      </Section>

      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeader eyebrow="Research" title="Research areas" description="Scientific themes represented by the current PS ChemLab research portfolio." />
          <div className="mt-8 flex flex-wrap gap-3">{researchAreas.map((area) => <Badge key={area}>{area}</Badge>)}</div>
          <div className="mt-10 grid overflow-hidden rounded-card border border-line bg-canvas shadow-card sm:grid-cols-3">
            <StatisticsCard icon={AcademicCapIcon} label="Course collections" value={importedCourses.length} />
            <div className="border-t border-line sm:border-l sm:border-t-0"><StatisticsCard icon={BeakerIcon} label="Video lectures" value={importedLectures.length} /></div>
            <div className="border-t border-line sm:border-l sm:border-t-0"><StatisticsCard icon={CommandLineIcon} label="Software tools" value={importedSoftware.length} /></div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid items-stretch gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <ContentCard className="min-h-80 overflow-hidden p-0">
              <OptionalImage alt="Professor Pornthep Sompornpisut" className="size-full min-h-80 object-cover" src="/images/portraits/pornthep-sompornpisut.webp" fallback={<div className="grid min-h-80 place-items-center bg-gradient-to-br from-brand to-accent text-white"><UserCircleIcon aria-hidden="true" className="size-32" /></div>} />
            </ContentCard>
            <ContentCard>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Biography</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Professor {person?.name ?? 'Pornthep Sompornpisut'}</h2>
              {person && <div className="mt-4"><Badge>{localize(person.titles[0])}</Badge></div>}
              <p className="mt-6 leading-8 text-muted">{professorBiography}</p>
              {person?.expertise.length ? <div className="mt-6 flex flex-wrap gap-2">{person.expertise.map((expertise, index) => <Badge key={index} tone="neutral">{localize(expertise)}</Badge>)}</div> : null}
            </ContentCard>
          </div>
        </Container>
      </Section>

      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeader eyebrow="Community" title="Collaborators" description="Academic and research collaborators associated with PS ChemLab." />
          <div className="mt-8">{collaborators.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{collaborators.map((collaborator) => <ContentCard key={`${collaborator.name}-${collaborator.affiliation}`}><h3 className="font-semibold">{collaborator.name}</h3><p className="mt-2 text-sm text-muted">{collaborator.affiliation}</p><p className="mt-4 text-sm leading-6">{collaborator.role}</p></ContentCard>)}</div> : <EmptyState title="Collaborator information pending approval" description="Profiles will be published when names, affiliations, and roles have been verified." />}</div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Get in touch" title="Contact" description="Contact PS ChemLab about educational resources, research, or software." />
          <ContentCard className="mt-8 max-w-2xl">
            <div className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent"><EnvelopeIcon aria-hidden="true" className="size-5" /></span><div><h3 className="font-semibold">Email</h3>{approvedContact ? <a className="mt-1 inline-block text-sm text-accent hover:underline" href={`mailto:${approvedContact}`}>{approvedContact}</a> : <p className="mt-1 text-sm text-muted">Public contact details pending approval</p>}</div></div>
            <div className="mt-6 flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><UserGroupIcon aria-hidden="true" className="size-5" /></span><div><h3 className="font-semibold">Academic enquiries</h3><p className="mt-1 text-sm leading-6 text-muted">Please include the relevant course, software title, or research topic in your message.</p></div></div>
          </ContentCard>
        </Container>
      </Section>
    </>
  );
}
