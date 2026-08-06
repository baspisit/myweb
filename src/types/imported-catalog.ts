export interface ImportedLecture {
  chapter: string;
  topic: string;
  youtube: string;
}

export interface ImportedCourse {
  courseCode: string;
  courseTitle: string;
  lectureCount: number;
  lectures: ImportedLecture[];
}

export interface ImportedSoftware {
  name: string;
  platform: string;
  download: string;
  description?: string;
  icon?: string;
  screenshots: string[];
  packages?: Array<{ label: string; url: string }>;
}

export interface ImportedCatalog {
  courses: Array<Pick<ImportedCourse, 'courseCode' | 'courseTitle' | 'lectureCount'>>;
  softwareCount: number;
}
