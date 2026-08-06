import { ArrowDownTrayIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';
import { ContentCard } from '@/components/ui/ContentCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { softwareSlug } from '@/lib/imported-content';
import type { ImportedSoftware } from '@/types/imported-catalog';

export function SoftwareCard({ software }: { software: ImportedSoftware }) {
  return (
    <ContentCard className="flex h-full flex-col" interactive>
      <div className="flex items-start justify-between gap-4">
        {software.icon ? (
          <img alt="" className="size-12 rounded-xl object-cover" src={software.icon} />
        ) : (
          <span className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent"><CommandLineIcon aria-hidden="true" className="size-6" /></span>
        )}
        <Badge tone={software.platform ? 'accent' : 'neutral'}>{software.platform || 'Platform not specified'}</Badge>
      </div>
      <h3 className="mt-6 text-lg font-semibold">{software.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{software.description ?? 'A downloadable PS ChemLab application for chemistry education and research.'}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <SecondaryButton to={`/software/${softwareSlug(software.name)}`}>Details</SecondaryButton>
        <PrimaryButton href={software.download} rel="noreferrer" target="_blank">
          Download <ArrowDownTrayIcon aria-hidden="true" className="size-4" />
        </PrimaryButton>
      </div>
    </ContentCard>
  );
}
