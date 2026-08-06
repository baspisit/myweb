import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoadingState } from '@/components/ui/LoadingState';
const HomePage = lazy(() => import('@/pages/home/HomePage')); const SoftwarePage = lazy(() => import('@/pages/software/SoftwarePage')); const SoftwareDetailPage = lazy(() => import('@/pages/software/SoftwareDetailPage')); const CoursesPage = lazy(() => import('@/pages/courses/CoursesPage')); const CourseDetailPage = lazy(() => import('@/pages/courses/CourseDetailPage')); const VideoLibraryPage = lazy(() => import('@/pages/videos/VideoLibraryPage')); const ResearchPage = lazy(() => import('@/pages/research/ResearchPage')); const PublicationsPage = lazy(() => import('@/pages/publications/PublicationsPage')); const DownloadsPage = lazy(() => import('@/pages/downloads/DownloadsPage')); const DocumentationPage = lazy(() => import('@/pages/documentation/DocumentationPage')); const NewsPage = lazy(() => import('@/pages/news/NewsPage')); const NewsDetailPage = lazy(() => import('@/pages/news/NewsDetailPage')); const AboutPage = lazy(() => import('@/pages/about/AboutPage')); const NotFoundPage = lazy(() => import('@/pages/system/NotFoundPage'));
const pending = (element: ReactNode) => <Suspense fallback={<LoadingState />}>{element}</Suspense>;
export const router = createBrowserRouter([{ element: <AppLayout />, children: [
  { index: true, element: pending(<HomePage />) },
  { path: 'software', element: pending(<SoftwarePage />) }, { path: 'software/:slug', element: pending(<SoftwareDetailPage />) },
  { path: 'courses', element: pending(<CoursesPage />) }, { path: 'courses/:slug', element: pending(<CourseDetailPage />) },
  { path: 'videos', element: pending(<VideoLibraryPage />) }, { path: 'research', element: pending(<ResearchPage />) },
  { path: 'publications', element: pending(<PublicationsPage />) }, { path: 'downloads', element: pending(<DownloadsPage />) },
  { path: 'documentation', element: pending(<DocumentationPage />) }, { path: 'news', element: pending(<NewsPage />) },
  { path: 'news/:slug', element: pending(<NewsDetailPage />) }, { path: 'about', element: pending(<AboutPage />) },
  { path: '*', element: pending(<NotFoundPage />) },
] }]);
