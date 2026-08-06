import type { ComponentType, SVGProps } from 'react';
import {
  AcademicCapIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  BeakerIcon,
  BoltIcon,
  CommandLineIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PlayCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { ContentCard } from '@/components/ui/ContentCard';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useSeoMetadata } from '@/hooks/useSeoMetadata';
import { pageDescriptions } from '@/content/content-registry';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

interface ResearchArea {
  slug: string;
  title: string;
  overview: string;
  topics: string[];
  icon: Icon;
}

const researchAreas: ResearchArea[] = [
  {
    slug: 'computational-structural-biology',
    title: 'Computational Structural Biology',
    overview: 'Computational approaches for interpreting biomolecular structures, motions, and regulatory mechanisms.',
    topics: ['Protein structure and dynamics', 'Cryo-EM structure interpretation', 'Allosteric regulation'],
    icon: CubeTransparentIcon,
  },
  {
    slug: 'molecular-dynamics-simulations',
    title: 'Molecular Dynamics Simulations',
    overview: 'Simulation methods for studying molecular motion, energetics, and interactions at atomic resolution.',
    topics: ['Classical molecular dynamics', 'Enhanced sampling', 'Free-energy calculations', 'Ligand binding mechanisms'],
    icon: BeakerIcon,
  },
  {
    slug: 'ion-channels-and-membrane-proteins',
    title: 'Ion Channels and Membrane Proteins',
    overview: 'Structure–function relationships and molecular mechanisms in channels and membrane transport proteins.',
    topics: ['Ryanodine receptor (RyR1)', 'Voltage-gated calcium channels (Cav3.1)', 'Hv1 proton channel', 'CorA magnesium transporter'],
    icon: BoltIcon,
  },
  {
    slug: 'ai-assisted-molecular-simulations',
    title: 'AI-assisted Molecular Simulations',
    overview: 'Data-driven methods that extend molecular simulation analysis and computational discovery workflows.',
    topics: ['Deep learning for MD trajectories', 'Conformational landscape analysis', 'Markov state models', 'AI-assisted drug discovery'],
    icon: CpuChipIcon,
  },
  {
    slug: 'drug-discovery-and-computational-biophysics',
    title: 'Drug Discovery and Computational Biophysics',
    overview: 'Physics-based computational strategies for investigating molecular recognition and therapeutic candidates.',
    topics: ['Structure-based drug design', 'Protein–ligand interactions', 'Virtual screening', 'Binding free energy'],
    icon: MagnifyingGlassIcon,
  },
  {
    slug: 'educational-software-development',
    title: 'Educational Software Development',
    overview: 'Interactive computational tools that make chemistry concepts, structures, and molecular exploration accessible.',
    topics: ['ChemLearn', 'Drug Molecule Explorer', 'Protein Structure Explorer', 'Interactive chemistry learning'],
    icon: AcademicCapIcon,
  },
];

const connections: Array<{ label: string; description: string; icon: Icon; to?: string }> = [
  { label: 'Research Areas', description: 'Scientific questions and methods', icon: SparklesIcon },
  { label: 'Publications', description: 'Peer-reviewed scholarly outputs', icon: DocumentTextIcon, to: '/publications' },
  { label: 'Software', description: 'Computational and educational tools', icon: CommandLineIcon, to: '/software' },
  { label: 'Courses', description: 'Structured chemistry learning', icon: AcademicCapIcon, to: '/courses' },
  { label: 'Videos', description: 'Accessible lecture resources', icon: PlayCircleIcon, to: '/videos' },
];

export default function ResearchPage() {
  const reduceMotion = useReducedMotion();
  useSeoMetadata({ title: 'Research Areas', description: pageDescriptions.research });

  return (
    <>
      <PageHeader
        eyebrow="Research at PS ChemLab"
        title="Research Areas"
        description="Explore the scientific themes connecting computational chemistry research, scholarly publications, academic software, and chemistry education at PS ChemLab."
      />
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Scientific focus"
            title="From molecular mechanisms to accessible learning"
            description="Six complementary areas define the research and educational activities represented across the PS ChemLab portal."
          />
          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            initial={reduceMotion ? false : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            viewport={{ amount: 0.08, once: true }}
            whileInView="visible"
          >
            {researchAreas.map(({ icon: Icon, overview, slug, title, topics }) => (
              <motion.div key={slug} variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } }}>
                <ContentCard className="flex h-full flex-col p-7" interactive>
                  <span className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent"><Icon aria-hidden="true" className="size-6" /></span>
                  <h2 className="mt-5 text-xl font-semibold leading-7">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{overview}</p>
                  <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-5">
                    {topics.map((topic) => <li className="flex gap-3 text-sm leading-6 text-muted" key={topic}><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />{topic}</li>)}
                  </ul>
                  <div className="mt-7"><SecondaryButton aria-label={`Explore ${title}`} href="#research-connections">Explore Research <ArrowRightIcon aria-hidden="true" className="size-4" /></SecondaryButton></div>
                </ContentCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      <section className="border-t border-line bg-surface/50 py-12 sm:py-16" id="research-connections">
        <Container>
          <SectionHeader
            eyebrow="An integrated academic portal"
            title="Research Connections"
            description="PS ChemLab connects scientific inquiry with its scholarly outputs, computational tools, structured courses, and accessible video learning."
          />
          <motion.div
            className="mx-auto mt-10 grid max-w-5xl items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            viewport={{ amount: 0.25, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {connections.map(({ description, icon: Icon, label, to }, index) => {
              const card = <><span className="mx-auto grid size-11 place-items-center rounded-xl bg-brand/10 text-brand"><Icon aria-hidden="true" className="size-5" /></span><h3 className="mt-4 font-semibold">{label}</h3><p className="mt-2 text-xs leading-5 text-muted">{description}</p></>;
              return (
                <div className="contents" key={label}>
                  <ContentCard as="div" className="p-5 text-center" interactive={Boolean(to)}>{to ? <Link className="block h-full rounded-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" to={to}>{card}</Link> : card}</ContentCard>
                  {index < connections.length - 1 && <div aria-hidden="true" className="grid place-items-center text-accent"><ArrowDownIcon className="size-5 lg:hidden" /><ArrowRightIcon className="hidden size-5 lg:block" /></div>}
                </div>
              );
            })}
          </motion.div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-muted">Each layer supports the next: research questions lead to publications, inform software and computational tools, and become reusable learning resources for courses and video lectures.</p>
        </Container>
      </section>
    </>
  );
}
