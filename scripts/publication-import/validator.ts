import type { PublicationInput } from './types';

export function validatePublicationInputs(records: PublicationInput[]): string[] {
  const warnings: string[] = [];
  const dois = new Set<string>();
  const titles = new Set<string>();
  for (const [index, record] of records.entries()) {
    if (!record.title?.trim() || !(Array.isArray(record.authors) ? record.authors.length : record.authors?.trim()) || !Number(record.year)) warnings.push(`Record ${index + 1} is missing a title, author, or valid year and will be skipped.`);
    const title = record.title?.trim().toLowerCase();
    if (title && titles.has(title)) warnings.push(`Duplicate title: ${record.title}`);
    if (title) titles.add(title);
    const doi = record.doi?.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').toLowerCase();
    if (doi && dois.has(doi)) warnings.push(`Duplicate DOI: ${doi}`);
    if (doi) dois.add(doi);
    if (record.citationCount !== undefined && (!Number.isInteger(record.citationCount) || record.citationCount < 0)) warnings.push(`Invalid citation count for: ${record.title}`);
  }
  return warnings;
}
