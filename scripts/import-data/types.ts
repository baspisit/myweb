export interface Lecture {
  chapter: string;
  topic: string;
  youtube: string;
}

export interface CourseData {
  courseCode: string;
  courseTitle: string;
  lectureCount: number;
  lectures: Lecture[];
}

export interface SoftwareItem {
  name: string;
  platform: string;
  download: string;
}

export interface SoftwareData {
  software: SoftwareItem[];
}

export interface CatalogData {
  courses: Array<Pick<CourseData, 'courseCode' | 'courseTitle' | 'lectureCount'>>;
  softwareCount: number;
}

export interface ImportData {
  courses: CourseData[];
  software: SoftwareData;
  warnings: string[];
}

export interface CourseSheetConfig {
  worksheet: string;
  courseCode: string;
  courseTitle: string;
  headers: readonly [string, string, string];
}
