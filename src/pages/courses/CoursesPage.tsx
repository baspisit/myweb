import { AcademicCapIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { CourseCard } from '@/components/content/CourseCard';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { StatisticsCard } from '@/components/ui/StatisticsCard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { importedCourses } from '@/lib/imported-content';

export default function CoursesPage() {
  useDocumentTitle('Courses');
  const totalLectures = importedCourses.reduce((total, course) => total + course.lectureCount, 0);
  return (
    <>
      <PageHeader eyebrow="Learning library" title="Courses" description="Explore structured chemistry courses organized by chapter and topic." />
      <Section>
        <Container>
          <div className="grid overflow-hidden rounded-card border border-line bg-surface shadow-card sm:grid-cols-2">
            <StatisticsCard icon={AcademicCapIcon} label="Course collections" value={importedCourses.length} />
            <div className="border-t border-line sm:border-l sm:border-t-0"><StatisticsCard icon={PlayCircleIcon} label="Video lectures" value={totalLectures} /></div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {importedCourses.map((course) => <CourseCard course={course} key={course.courseCode} />)}
          </div>
        </Container>
      </Section>
    </>
  );
}
