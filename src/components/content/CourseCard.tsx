import { ArrowRightIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { ContentCard } from '@/components/ui/ContentCard';
import { courseDisplayTitle } from '@/lib/imported-content';
import type { ImportedCourse } from '@/types/imported-catalog';

export function CourseCard({ course }: { course: ImportedCourse }) {
  const chapters = [...new Set(course.lectures.map((lecture) => lecture.chapter).filter(Boolean))];
  return (
    <ContentCard className="relative flex h-full flex-col overflow-hidden" interactive>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-accent" />
      <div className="flex items-center justify-between gap-4"><Badge>{course.courseCode}</Badge><span className="text-sm text-muted">{course.lectureCount} lectures</span></div>
      <span className="mt-7 grid size-12 place-items-center rounded-xl bg-brand/10 text-brand"><BookOpenIcon aria-hidden="true" className="size-6" /></span>
      <h3 className="mt-5 text-xl font-semibold">{courseDisplayTitle(course)}</h3>
      <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-muted">{chapters.slice(0, 4).join(' · ') || 'Chemistry lectures and learning resources'}</p>
      <Link className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline" to={`/courses/${course.courseCode}`}>Open course <ArrowRightIcon aria-hidden="true" className="size-4" /></Link>
    </ContentCard>
  );
}
