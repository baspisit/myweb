import { useDocumentTitle } from './useDocumentTitle';

export function useSeoMetadata({ title, description }: { title: string; description: string }) {
  useDocumentTitle(title, description);
}
