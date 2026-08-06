import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SearchBar } from '@/components/ui/SearchBar';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { importedLectures } from '@/lib/imported-content';
import { youtubeThumbnailUrl } from '@/lib/youtube';

export default function VideoLibraryPage() {
  useDocumentTitle('Video Library');
  const [query, setQuery] = useState('');
  const [courseCode, setCourseCode] = useState('all');
  const courseCodes = [...new Set(importedLectures.map((lecture) => lecture.courseCode))];
  const lectures = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return importedLectures.filter((lecture) => {
      const matchesCourse = courseCode === 'all' || lecture.courseCode === courseCode;
      const matchesQuery = !term || `${lecture.chapter} ${lecture.topic}`.toLocaleLowerCase().includes(term);
      return matchesCourse && matchesQuery;
    });
  }, [courseCode, query]);

  return (
    <>
      <PageHeader eyebrow="Watch and learn" title="Video Library" description={`${importedLectures.length} lectures across ${courseCodes.length} chemistry courses.`} />
      <Section>
        <Container>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_14rem]">
            <SearchBar
              aria-label="Search videos"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search chapters or topics"
              value={query}
            />
            <select
              aria-label="Filter by course"
              className="h-11 rounded-control border border-line bg-surface px-3 py-2 text-sm text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              onChange={(event) => setCourseCode(event.target.value)}
              value={courseCode}
            >
              <option value="all">All courses</option>
              {courseCodes.map((code) => <option key={code} value={code}>Course {code}</option>)}
            </select>
          </div>
          <p className="mt-4 text-sm text-muted" aria-live="polite">{lectures.length} videos found</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {lectures.map((lecture) => (
              <ContentCard className="overflow-hidden p-5" interactive key={`${lecture.courseCode}-${lecture.number}`}>
                <a href={lecture.youtube} rel="noreferrer" target="_blank">
                  <img
                    alt=""
                    className="aspect-video w-full rounded-lg bg-canvas object-cover"
                    loading="lazy"
                    src={youtubeThumbnailUrl(lecture.youtubeId)}
                  />
                </a>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>{lecture.courseCode}</Badge>
                  <span className="text-xs text-muted">Lecture {lecture.number}</span>
                </div>
                <h2 className="mt-3 font-semibold leading-snug">{lecture.topic}</h2>
                <p className="mt-2 text-sm text-muted">{lecture.chapter || 'Uncategorized'}</p>
                <div className="mt-4 flex gap-4 text-sm font-medium">
                  <a className="text-accent hover:underline" href={lecture.youtube} rel="noreferrer" target="_blank">Watch ↗</a>
                  <Link className="text-accent hover:underline" to={`/courses/${lecture.courseCode}`}>Course</Link>
                </div>
              </ContentCard>
            ))}
          </div>
          {lectures.length === 0 && <div className="mt-8"><EmptyState title="No videos found" description="Try another search or course." /></div>}
        </Container>
      </Section>
    </>
  );
}
