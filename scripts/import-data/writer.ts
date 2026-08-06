import fs from 'node:fs/promises';
import path from 'node:path';
import type { CatalogData, ImportData } from './types';

const writeJson = async (filename: string, value: unknown): Promise<void> => {
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
};

export const createCatalog = (data: ImportData): CatalogData => ({
  courses: data.courses.map(({ courseCode, courseTitle, lectureCount }) => ({
    courseCode,
    courseTitle,
    lectureCount,
  })),
  softwareCount: data.software.software.length,
});

export const writeImport = async (data: ImportData, outputRoot: string): Promise<void> => {
  await Promise.all([
    ...data.courses.map((course) =>
      writeJson(path.join(outputRoot, 'courses', `${course.courseCode}.json`), course),
    ),
    writeJson(path.join(outputRoot, 'software', 'software.json'), data.software),
    writeJson(path.join(outputRoot, 'catalog.json'), createCatalog(data)),
  ]);
};
