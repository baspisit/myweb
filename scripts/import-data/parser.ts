import ExcelJS from 'exceljs';
import type { CellValue, Worksheet } from 'exceljs';
import type { CourseData, CourseSheetConfig, ImportData, SoftwareData } from './types';

export const COURSE_SHEETS: readonly CourseSheetConfig[] = [
  {
    worksheet: '2302338',
    courseCode: '2302338',
    courseTitle: '',
    headers: ['Chapter', 'Topic', 'VDO link'],
  },
  {
    worksheet: '2302237',
    courseCode: '2302237',
    courseTitle: '',
    headers: ['Chapter', 'Topic', 'link'],
  },
  {
    worksheet: '2302236',
    courseCode: '2302236',
    courseTitle: '',
    headers: ['Chapter', 'Topic', 'link'],
  },
] as const;

const cellText = (value: CellValue): string => {
  if (value == null) return '';
  if (typeof value === 'object') {
    if ('text' in value && typeof value.text === 'string') return value.text;
    if ('richText' in value) return value.richText.map((part) => part.text).join('');
    if ('result' in value) return cellText(value.result);
  }
  return String(value);
};

const isBlank = (values: string[]): boolean => values.every((value) => value.trim() === '');

const parseCourse = (
  worksheet: Worksheet | undefined,
  config: CourseSheetConfig,
  warnings: string[],
): CourseData => {
  const lectures: CourseData['lectures'] = [];
  if (!worksheet) {
    warnings.push(`Missing worksheet "${config.worksheet}".`);
    return { courseCode: config.courseCode, courseTitle: config.courseTitle, lectureCount: 0, lectures };
  }

  const actualHeaders = [1, 2, 3].map((column) => cellText(worksheet.getCell(1, column).value));
  config.headers.forEach((expected, index) => {
    if (actualHeaders[index].trim() !== expected) {
      warnings.push(
        `${config.worksheet}: expected header "${expected}" in ${String.fromCharCode(65 + index)}1, found "${actualHeaders[index]}".`,
      );
    }
  });

  for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
    // Only A:C belong to the approved course table.
    const [chapter, topic, rawYoutube] = [1, 2, 3].map((column) =>
      cellText(worksheet.getCell(rowNumber, column).value),
    );
    if (isBlank([chapter, topic, rawYoutube])) continue;
    if (!chapter.trim() || !topic.trim() || !rawYoutube.trim()) {
      warnings.push(`${config.worksheet} row ${rowNumber}: incomplete lecture record was imported as stored.`);
    }
    lectures.push({ chapter, topic, youtube: rawYoutube.trim() });
  }

  return {
    courseCode: config.courseCode,
    courseTitle: config.courseTitle,
    lectureCount: lectures.length,
    lectures,
  };
};

export const inferPlatform = (softwareName: string): string => {
  const match = softwareName.match(/\((Android|Windows|Linux)\)/i);
  if (!match) return '';
  return match[1][0].toUpperCase() + match[1].slice(1).toLowerCase();
};

const parseSoftware = (worksheet: Worksheet | undefined, warnings: string[]): SoftwareData => {
  const software: SoftwareData['software'] = [];
  if (!worksheet) {
    warnings.push('Missing worksheet "Software".');
    return { software };
  }

  for (let rowNumber = 1; rowNumber <= worksheet.rowCount; rowNumber++) {
    // Software is explicitly headerless; only A:B belong to its approved table.
    const name = cellText(worksheet.getCell(rowNumber, 1).value);
    const download = cellText(worksheet.getCell(rowNumber, 2).value);
    if (isBlank([name, download])) continue;
    if (!name.trim() || !download.trim()) {
      warnings.push(`Software row ${rowNumber}: incomplete software record was skipped.`);
      continue;
    }
    software.push({ name, platform: inferPlatform(name), download: download.trim() });
  }
  return { software };
};

export const parseWorkbook = async (workbookPath: string): Promise<ImportData> => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(workbookPath);
  const warnings: string[] = [];
  const courses = COURSE_SHEETS.map((config) =>
    parseCourse(workbook.getWorksheet(config.worksheet), config, warnings),
  );
  const software = parseSoftware(workbook.getWorksheet('Software'), warnings);
  return { courses, software, warnings };
};
