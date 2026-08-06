import { resolve } from 'node:path';
import { parsePublicationSource } from './publication-import/parser';
import type { ImportedPublication, PublicationInput } from './publication-import/types';
import { validatePublicationInputs } from './publication-import/validator';
import { writePublicationJson } from './publication-import/writer';

const selectedPath = resolve(process.argv[2] ?? 'selected-publications.txt');
const recentPath = resolve(process.argv[3] ?? 'recent-publications.txt');
const outputPath = resolve('src/data/publications/publications.json');

const slugify = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 96) || 'publication';
const normalizeTitle = (value: string) => value.toLowerCase().replace(/[{}\\$]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const normalizeDoi = (doi?: string) => doi?.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
const authorList = (value: string[] | string) => (Array.isArray(value) ? value : value.split(/\s+and\s+|\s*;\s*/i)).map((name) => ({ name: name.trim() })).filter(({ name }) => name);
const dedupeKey = (record: PublicationInput) => normalizeDoi(record.doi)?.toLowerCase() || normalizeTitle(record.title);
const isUsable = (record: PublicationInput) => Boolean(record.title?.trim() && authorList(record.authors).length && Number.isInteger(Number(record.year)));

const [selectedSource, recentSource] = await Promise.all([parsePublicationSource(selectedPath), parsePublicationSource(recentPath)]);
const warnings = [
  ...validatePublicationInputs(selectedSource).map((warning) => `Selected: ${warning}`),
  ...validatePublicationInputs(recentSource).map((warning) => `Recent: ${warning}`),
];
const selected = selectedSource.filter(isUsable).map((record, sourceOrder) => ({ ...record, featured: true, recent: false, sourceOrder }));
const recent = recentSource.filter(isUsable).map((record, sourceOrder) => ({ ...record, featured: false, recent: true, sourceOrder }));
const selectedTitles = new Set(selected.map((record) => normalizeTitle(record.title)));
const selectedDois = new Set(selected.map((record) => normalizeDoi(record.doi)?.toLowerCase()).filter(Boolean));
const overlappingRecords = new Set(recent.filter((record) => selectedTitles.has(normalizeTitle(record.title)) || selectedDois.has(normalizeDoi(record.doi)?.toLowerCase())).map((record) => normalizeTitle(record.title))).size;
const merged = new Map<string, PublicationInput>();
const titleKeys = new Map<string, string>();
const doiKeys = new Map<string, string>();

for (const record of [...selected, ...recent]) {
  const title = normalizeTitle(record.title);
  const doi = normalizeDoi(record.doi)?.toLowerCase();
  const key = (doi ? doiKeys.get(doi) : undefined) ?? titleKeys.get(title) ?? dedupeKey(record);
  const existing = merged.get(key);
  if (!existing) merged.set(key, record);
  else merged.set(key, {
      ...record, ...existing, featured: Boolean(existing.featured || record.featured), recent: Boolean(existing.recent || record.recent),
      citationCount: existing.citationCount ?? record.citationCount, doi: existing.doi ?? record.doi,
    });
  titleKeys.set(title, key);
  if (doi) doiKeys.set(doi, key);
}

const usedSlugs = new Set<string>();
const uniqueSlug = (record: PublicationInput) => {
  const base = slugify(record.title);
  let slug = base;
  let suffix = 2;
  while (usedSlugs.has(slug)) slug = `${base}-${suffix++}`;
  usedSlugs.add(slug);
  return slug;
};

const records = [...merged.values()];
const selectedRecords = records.filter((record) => record.featured).sort((a, b) => {
  const aHasCitations = Number.isFinite(a.citationCount);
  const bHasCitations = Number.isFinite(b.citationCount);
  if (aHasCitations || bHasCitations) return (b.citationCount ?? -1) - (a.citationCount ?? -1) || (a.sourceOrder ?? 0) - (b.sourceOrder ?? 0);
  return (a.sourceOrder ?? 0) - (b.sourceOrder ?? 0);
});
const recentOnlyRecords = records.filter((record) => record.recent && !record.featured).sort((a, b) => Number(b.year) - Number(a.year) || (a.sourceOrder ?? 0) - (b.sourceOrder ?? 0));

const publications: ImportedPublication[] = [...selectedRecords, ...recentOnlyRecords].map((record) => {
  const slug = uniqueSlug(record);
  return {
    id: slug, slug, title: record.title.trim(), authors: authorList(record.authors), type: record.type?.trim() || 'article', year: Number(record.year),
    featured: Boolean(record.featured), recent: Boolean(record.recent),
    ...(normalizeDoi(record.doi) ? { doi: normalizeDoi(record.doi) } : {}),
    ...(record.journal ? { journal: record.journal.trim() } : {}), ...(record.volume ? { volume: record.volume.trim() } : {}),
    ...(record.issue ? { issue: record.issue.trim() } : {}), ...(record.pages ? { pages: record.pages.trim() } : {}),
    ...(record.abstract ? { abstract: record.abstract.trim() } : {}), ...(record.graphicalAbstract ? { graphicalAbstract: record.graphicalAbstract.trim() } : {}),
    ...(record.relatedSoftware?.length ? { relatedSoftware: record.relatedSoftware } : {}), ...(record.relatedResearch?.length ? { relatedResearch: record.relatedResearch } : {}),
    ...(record.pdf ? { pdf: record.pdf.trim() } : {}), ...(record.citationCount !== undefined ? { citationCount: record.citationCount } : {}),
  };
});

await writePublicationJson(outputPath, publications);
console.log(`Imported ${publications.length} unique publications (${publications.filter((item) => item.featured).length} featured, ${publications.filter((item) => item.recent).length} recent).`);
console.log(`Merged ${overlappingRecords} records present in both collections.`);
for (const warning of warnings) console.warn(`Warning: ${warning}`);
