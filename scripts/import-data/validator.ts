import type { ImportData } from './types';

const youtubeId = (rawUrl: string): string | undefined => {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    let id: string | null | undefined;
    if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0];
    if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
      id = url.pathname === '/watch' ? url.searchParams.get('v') : undefined;
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : undefined;
  } catch {
    return undefined;
  }
};

const isGoogleDriveUrl = (rawUrl: string): boolean => {
  try {
    const url = new URL(rawUrl);
    return (
      url.protocol === 'https:' &&
      url.hostname.toLowerCase() === 'drive.google.com' &&
      (/^\/file\/d\/[^/]+\/view\/?$/.test(url.pathname) || Boolean(url.searchParams.get('id')))
    );
  } catch {
    return false;
  }
};

export const validateImport = (data: ImportData): string[] => {
  const warnings: string[] = [];
  const youtubeLocations = new Map<string, string>();

  for (const course of data.courses) {
    course.lectures.forEach((lecture, index) => {
      const location = `${course.courseCode} lecture ${index + 1}`;
      const id = youtubeId(lecture.youtube);
      if (!id) {
        warnings.push(`${location}: invalid YouTube URL "${lecture.youtube}".`);
        return;
      }
      const previous = youtubeLocations.get(id);
      if (previous) warnings.push(`${location}: duplicate YouTube URL also used by ${previous}.`);
      else youtubeLocations.set(id, location);
    });
  }

  const softwareNames = new Map<string, number>();
  data.software.software.forEach((item, index) => {
    const rowLabel = `Software item ${index + 1}`;
    const normalizedName = item.name.trim().toLocaleLowerCase();
    const previous = softwareNames.get(normalizedName);
    if (previous !== undefined) warnings.push(`${rowLabel}: duplicate software name also used by item ${previous + 1}.`);
    else softwareNames.set(normalizedName, index);
    if (!isGoogleDriveUrl(item.download)) {
      warnings.push(`${rowLabel} (${item.name}): invalid Google Drive URL "${item.download}".`);
    }
  });

  return warnings;
};
