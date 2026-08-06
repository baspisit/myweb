import catalogJson from '@/data/catalog.json';
import course2302236Json from '@/data/courses/2302236.json';
import course2302237Json from '@/data/courses/2302237.json';
import course2302338Json from '@/data/courses/2302338.json';
import softwareJson from '@/data/software/software.json';
import type {
  ImportedCatalog,
  ImportedCourse,
  ImportedLecture,
  ImportedSoftware,
} from '@/types/imported-catalog';

export const importedCatalog = catalogJson as ImportedCatalog;

export const importedCourses: ImportedCourse[] = [
  course2302338Json,
  course2302237Json,
  course2302236Json,
] as ImportedCourse[];

export const importedSoftware = softwareJson.software as ImportedSoftware[];

export const softwareSlug = (name: string): string =>
  name
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const softwareBySlug = (slug: string | undefined): ImportedSoftware | undefined =>
  importedSoftware.find((software) => softwareSlug(software.name) === slug);

export const courseDisplayTitle = (course: Pick<ImportedCourse, 'courseCode' | 'courseTitle'>): string =>
  course.courseTitle || `Course ${course.courseCode}`;

export const youtubeIdFromUrl = (rawUrl: string): string => {
  try {
    const url = new URL(rawUrl);
    if (url.hostname === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] ?? '';
    return url.searchParams.get('v') ?? '';
  } catch {
    return '';
  }
};

export interface CatalogLecture extends ImportedLecture {
  courseCode: string;
  courseTitle: string;
  number: number;
  youtubeId: string;
}

export const importedLectures: CatalogLecture[] = importedCourses.flatMap((course) =>
  course.lectures.map((lecture, index) => ({
    ...lecture,
    courseCode: course.courseCode,
    courseTitle: courseDisplayTitle(course),
    number: index + 1,
    youtubeId: youtubeIdFromUrl(lecture.youtube),
  })),
);
