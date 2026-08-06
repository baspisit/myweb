import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { EmptyState } from '@/components/ui/EmptyState';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Page not found');
  return <Section><Container><EmptyState title="Page not found" description="The page you requested does not exist or may have moved." action={<PrimaryButton to="/">Return home</PrimaryButton>} /></Container></Section>;
}
