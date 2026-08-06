import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { Badge } from '@/components/ui/Badge';
import { ContentCard } from '@/components/ui/ContentCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useLocale } from '@/hooks/useLocale';
import news from '@/data/news.json';

export default function NewsPage() {
  useDocumentTitle('News');
  const { localize } = useLocale();
  return <><PageHeader eyebrow="Updates" title="News" description="Latest announcements and updates from PS ChemLab." /><Section><Container>{news.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{news.map((article) => <ContentCard interactive key={article.id}><Badge>{article.category}</Badge><h2 className="mt-5 text-xl font-semibold">{localize(article.title)}</h2><p className="mt-3 line-clamp-3 leading-7 text-muted">{localize(article.summary)}</p><Link className="mt-6 inline-block text-sm font-semibold text-accent hover:underline" to={`/news/${article.slug}`}>Read article</Link></ContentCard>)}</div> : <EmptyState title="No news yet" description="Updates will appear here." />}</Container></Section></>;
}
