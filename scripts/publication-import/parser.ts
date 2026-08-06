import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import type { PublicationInput } from './types';

const cleanBibValue = (value: string) => {
  const trimmed = value.trim();
  return ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('"') && trimmed.endsWith('"')))
    ? trimmed.slice(1, -1).trim()
    : trimmed;
};

function splitEntries(source: string): Array<{ type: string; key: string; body: string }> {
  const entries: Array<{ type: string; key: string; body: string }> = [];
  const startPattern = /@(\w+)\s*\{/g;
  let start: RegExpExecArray | null;
  while ((start = startPattern.exec(source))) {
    let depth = 1;
    let quote = false;
    let cursor = startPattern.lastIndex;
    for (; cursor < source.length && depth > 0; cursor += 1) {
      const character = source[cursor];
      if (character === '"' && source[cursor - 1] !== '\\') quote = !quote;
      if (!quote && character === '{') depth += 1;
      if (!quote && character === '}') depth -= 1;
    }
    const entry = source.slice(startPattern.lastIndex, cursor - 1);
    const comma = entry.indexOf(',');
    if (comma >= 0) entries.push({ type: start[1].toLowerCase(), key: entry.slice(0, comma).trim(), body: entry.slice(comma + 1) });
    startPattern.lastIndex = cursor;
  }
  return entries;
}

function parseFields(body: string): Record<string, string> {
  const fields: Record<string, string> = {};
  let cursor = 0;
  while (cursor < body.length) {
    while (cursor < body.length && /[\s,]/.test(body[cursor])) cursor += 1;
    const nameMatch = /^[A-Za-z][\w-]*/.exec(body.slice(cursor));
    if (!nameMatch) break;
    const name = nameMatch[0].toLowerCase();
    cursor += nameMatch[0].length;
    while (/\s/.test(body[cursor] ?? '')) cursor += 1;
    if (body[cursor] !== '=') break;
    cursor += 1;
    while (/\s/.test(body[cursor] ?? '')) cursor += 1;
    const opener = body[cursor];
    if (opener !== '{' && opener !== '"') break;
    const closer = opener === '{' ? '}' : '"';
    const start = cursor;
    let depth = opener === '{' ? 1 : 0;
    cursor += 1;
    while (cursor < body.length) {
      if (opener === '{' && body[cursor] === '{') depth += 1;
      if (body[cursor] === closer && body[cursor - 1] !== '\\') {
        if (opener === '"' || --depth === 0) { cursor += 1; break; }
      }
      cursor += 1;
    }
    fields[name] = cleanBibValue(body.slice(start, cursor));
  }
  return fields;
}

export function parseBibTeX(source: string): PublicationInput[] {
  const entries: PublicationInput[] = [];
  for (const [sourceOrder, entry] of splitEntries(source).entries()) {
    const fields = parseFields(entry.body);
    entries.push({
      id: entry.key, title: fields.title ?? '', authors: fields.author?.split(/\s+and\s+/i) ?? [],
      journal: fields.journal ?? fields.booktitle, year: fields.year ?? '', doi: fields.doi,
      abstract: fields.abstract, pdf: fields.pdf ?? fields.url, type: entry.type,
      citationCount: fields.citationcount || fields.citations ? Number(fields.citationcount ?? fields.citations) : undefined,
      volume: fields.volume, issue: fields.number, pages: fields.pages, sourceOrder,
    });
  }
  return entries;
}

export async function parsePublicationSource(path: string): Promise<PublicationInput[]> {
  const source = await readFile(path, 'utf8');
  if (extname(path).toLowerCase() === '.bib' || source.trimStart().startsWith('@')) return parseBibTeX(source);
  const value: unknown = JSON.parse(source);
  if (Array.isArray(value)) return value as PublicationInput[];
  if (value && typeof value === 'object' && Array.isArray((value as { publications?: unknown }).publications)) return (value as { publications: PublicationInput[] }).publications;
  throw new Error('JSON source must be an array or an object with a publications array.');
}
