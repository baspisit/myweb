import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  ArrowRightIcon,
  BeakerIcon,
  CommandLineIcon,
  PlayCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { CourseCard } from '@/components/content/CourseCard';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { PublicationCard } from '@/components/content/PublicationCard';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SoftwareCard } from '@/components/content/SoftwareCard';
import { StatisticsCard } from '@/components/ui/StatisticsCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useLocale } from '@/hooks/useLocale';
import {
  importedCourses,
  importedLectures,
  importedSoftware,
} from '@/lib/imported-content';
import publications from '@/data/publications/publications.json';
import research from '@/data/research.json';
import people from '@/data/people.json';
import site from '@/data/site.json';
import type { Publication } from '@/types/content';

const sectionAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      variants={sectionAnimation}
      viewport={{ amount: 0.15, once: true }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  useDocumentTitle('');
  const { localize } = useLocale();
  const reduceMotion = useReducedMotion();
  const person = people[0];
  const featuredResearch = research.filter((item) => item.featured).slice(0, 3);
  const latestPublications = [...(publications as Publication[])].sort((a, b) => b.year - a.year).slice(0, 3);
  const featuredSoftware = importedSoftware.slice(0, 3);

  const features = [
    { label: 'Video lectures', value: importedLectures.length, icon: PlayCircleIcon, to: '/videos' },
    { label: 'Course collections', value: importedCourses.length, icon: AcademicCapIcon, to: '/courses' },
    { label: 'Software tools', value: importedSoftware.length, icon: CommandLineIcon, to: '/software' },
    { label: 'Research areas', value: new Set(research.flatMap((item) => item.researchAreas)).size, icon: BeakerIcon, to: '/research' },
  ];

  return (
    <>
      <section className="relative isolate min-h-[min(760px,calc(100vh-4rem))] overflow-hidden bg-brand text-white dark:text-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgb(var(--color-accent)/0.42),transparent_30%),radial-gradient(circle_at_15%_85%,rgb(255_255_255/0.14),transparent_32%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div aria-hidden="true" className="absolute -right-24 top-20 size-96 rounded-full border border-white/15 sm:right-8 sm:size-[32rem]">
          <div className="absolute inset-16 rounded-full border border-white/15" />
          <div className="absolute inset-36 rounded-full border border-white/15" />
          <motion.div
            animate={reduceMotion ? undefined : { rotate: 360 }}
            className="absolute inset-7 rounded-full border border-dashed border-white/20"
            transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
          />
        </div>
        <Container>
          <div className="relative flex min-h-[min(760px,calc(100vh-4rem))] items-center py-20 sm:py-28">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs font-medium leading-5 backdrop-blur-sm sm:px-4 sm:text-sm">
                <BeakerIcon aria-hidden="true" className="size-4" />
                Computational chemistry · Education · Research
              </div>
              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Chemistry knowledge, made accessible.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 dark:text-slate-900/75 sm:text-xl">
                {localize(site.description)}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <PrimaryButton className="!bg-white !text-brand dark:!bg-slate-950 dark:!text-white" to="/courses">
                  Explore courses <ArrowRightIcon aria-hidden="true" className="size-4" />
                </PrimaryButton>
                <SecondaryButton className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-white/60 hover:text-white dark:text-slate-950" to="/research">
                  View research
                </SecondaryButton>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 -mt-10 pb-16 sm:-mt-14 sm:pb-24">
        <Container>
          <Reveal className="grid overflow-hidden rounded-2xl border border-line bg-surface shadow-xl shadow-slate-950/5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon, label, to, value }, index) => (
              <div className={`${index ? 'border-t border-line sm:border-l sm:border-t-0 lg:border-l' : ''} ${index === 2 ? 'sm:border-l-0 lg:border-l' : ''}`} key={label}>
                <StatisticsCard icon={icon} label={label} to={to} value={value} />
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Learn" title="Featured courses" description="Structured lecture collections spanning physical and computational chemistry topics." action={<SecondaryButton to="/courses">Browse all courses <ArrowRightIcon aria-hidden="true" className="size-4" /></SecondaryButton>} />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {importedCourses.map((course) => <CourseCard course={course} key={course.courseCode} />)}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Tools" title="Featured software" description="Educational and research applications developed to support chemistry learning and molecular exploration." action={<SecondaryButton to="/software">View all software <ArrowRightIcon aria-hidden="true" className="size-4" /></SecondaryButton>} />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {featuredSoftware.map((software) => <SoftwareCard key={software.name} software={software} />)}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <SectionHeader eyebrow="Discover" title="Research highlights" description="Exploring molecular systems through computational chemistry and modeling." />
              <div className="mt-9 space-y-4">
                {featuredResearch.map((project) => (
                  <FeatureCard description={localize(project.summary)} icon={BeakerIcon} key={project.id} title={localize(project.title)} to="/research" />
                ))}
              </div>
              <div className="mt-7"><SecondaryButton to="/research">Explore research <ArrowRightIcon aria-hidden="true" className="size-4" /></SecondaryButton></div>
            </Reveal>

            <Reveal>
              <SectionHeader eyebrow="Read" title="Latest publications" description="Recent scholarly work and contributions from PS ChemLab." />
              <div className="mt-9 grid gap-4">{latestPublications.length ? latestPublications.map((publication) => <PublicationCard key={publication.id} publication={publication} />) : <EmptyState title="Publications under editorial review" description="Verified publication records will appear here after bibliographic approval." />}</div>
              <div className="mt-7"><SecondaryButton to="/publications">View publications <ArrowRightIcon aria-hidden="true" className="size-4" /></SecondaryButton></div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="overflow-hidden bg-slate-950 py-20 text-white sm:py-28 dark:bg-slate-900">
        <Container>
          <Reveal className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand to-accent">
              <div className="absolute inset-5 rounded-[1.6rem] border border-white/15" />
              <UserCircleIcon aria-hidden="true" className="size-32 text-white/80" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">About PS ChemLab</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">An independent academic resource for chemistry.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{localize(site.description)}</p>
              {person && <p className="mt-6 text-sm text-slate-400">Curated by <span className="font-medium text-white">{person.name}</span> · {localize(person.titles[0])}</p>}
              <Link className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-50" to="/about">Learn more <ArrowRightIcon aria-hidden="true" className="size-4" /></Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
