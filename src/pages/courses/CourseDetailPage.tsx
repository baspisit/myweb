import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SearchBar } from '@/components/ui/SearchBar';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { courseDisplayTitle, importedCourses, youtubeIdFromUrl } from '@/lib/imported-content';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [query, setQuery] = useState('');
  const course = importedCourses.find((item) => item.courseCode === slug);
  const pageTitle = course ? courseDisplayTitle(course) : 'Course not found';
  useDocumentTitle(pageTitle, course ? `Browse ${course.lectureCount} chemistry video lectures in ${pageTitle}, organized by chapter and topic.` : 'The requested PS ChemLab course could not be found.');

  const lectures = useMemo(() => {
    if (!course) return [];
    const term = query.trim().toLocaleLowerCase();
    return term
      ? course.lectures.filter(({ chapter, topic }) => `${chapter} ${topic}`.toLocaleLowerCase().includes(term))
      : course.lectures;
  }, [course, query]);

  if (!course) {
    return (
      <Section>
        <Container>
          <EmptyState title="Course not found" description="The requested course is not available." action={<SecondaryButton to="/courses">Back to courses</SecondaryButton>} />
        </Container>
      </Section>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Course collection" title={pageTitle} description={`${course.lectureCount} video lectures organized by chapter and topic.`} />
      <Section>
        <Container>
          <SearchBar
            aria-label="Search this course"
            className="max-w-xl"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chapters or topics"
            value={query}
          />
          <p className="mt-4 text-sm text-muted" aria-live="polite">
            Showing {lectures.length} of {course.lectureCount} lectures
          </p>
          <ol className="mt-8 grid gap-3">
            {lectures.map((lecture, index) => (
              <ContentCard as="li" className="flex gap-4 p-5" key={`${lecture.youtube}-${index}`}>
                <span className="w-8 shrink-0 pt-1 text-sm font-medium text-muted">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <Badge>{lecture.chapter || 'Uncategorized'}</Badge>
                  <h2 className="mt-2 font-medium">{lecture.topic}</h2>
                  <a
                    className="mt-3 inline-flex text-sm font-medium text-accent hover:underline"
                    href={`https://www.youtube.com/watch?v=${youtubeIdFromUrl(lecture.youtube)}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Watch on YouTube <span aria-hidden="true" className="ml-1">↗</span>
                  </a>
                </div>
              </ContentCard>
            ))}
          </ol>
          {lectures.length === 0 && (
            <div className="mt-8"><EmptyState title="No lectures found" description="Try a different search term." /></div>
          )}
        </Container>
      </Section>
    </>
  );
}
