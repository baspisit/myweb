import { useParams } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useLocale } from '@/hooks/useLocale';
import news from '@/data/news.json';

export default function NewsDetailPage() {
  const { slug } = useParams(); const { localize } = useLocale(); const article = news.find((item) => item.slug === slug); useDocumentTitle(article ? localize(article.title) : 'Article not found', article ? localize(article.summary) : 'The requested PS ChemLab news article could not be found.');
  if (!article) return <Section><Container><EmptyState title="Article not found" description="The requested news article is unavailable." action={<SecondaryButton to="/news">Back to news</SecondaryButton>} /></Container></Section>;
  return <><PageHeader eyebrow={article.category} title={localize(article.title)} description={localize(article.summary)} /><Section><Container><ContentCard className="mx-auto max-w-3xl"><p className="leading-8 text-muted">{localize(article.summary)}</p></ContentCard></Container></Section></>;
}
