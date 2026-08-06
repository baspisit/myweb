import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { ImportedPublication } from './types';

export async function writePublicationJson(path: string, publications: ImportedPublication[]) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(publications, null, 2)}\n`, 'utf8');
}
