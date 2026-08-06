import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseWorkbook } from './import-data/parser';
import { validateImport } from './import-data/validator';
import { writeImport } from './import-data/writer';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workbookPath = path.join(projectRoot, 'youtube.xlsx');
const outputRoot = path.join(projectRoot, 'src', 'data');

const imported = await parseWorkbook(workbookPath);
const warnings = [...imported.warnings, ...validateImport(imported)];

for (const warning of warnings) console.warn(`WARNING: ${warning}`);

await writeImport(imported, outputRoot);

const lectureCount = imported.courses.reduce((total, course) => total + course.lectureCount, 0);
console.log(
  `Imported ${imported.courses.length} courses (${lectureCount} lectures) and ${imported.software.software.length} software records.`,
);
console.log(`Generated ${imported.courses.length + 2} JSON files with ${warnings.length} warning(s).`);
