import { useEffect } from 'react';
import { pageDescriptions } from '@/content/content-registry';

const ensureMeta = (selector: string, attribute: string, value: string): HTMLMetaElement => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    const [name, attributeValue] = attribute.split('=');
    element.setAttribute(name, attributeValue);
    document.head.appendChild(element);
  }
  element.content = value;
  return element;
};

const descriptionFor = (title: string): string => {
  if (!title) return pageDescriptions.home;
  const key = title.toLowerCase().replace('video library', 'videos').replace(/ .*/, '');
  return pageDescriptions[key] ?? `${title || 'PS ChemLab'} — chemistry education, software, publications, and research resources from PS ChemLab.`;
};

export function useDocumentTitle(title: string, description = descriptionFor(title)) {
  useEffect(() => {
    const fullTitle = title ? `${title} | PS ChemLab` : 'PS ChemLab';
    const image = new URL('/images/branding/og-default.svg', window.location.origin).toString();
    document.title = fullTitle;
    ensureMeta('meta[name="description"]', 'name=description', description);
    ensureMeta('meta[property="og:title"]', 'property=og:title', fullTitle);
    ensureMeta('meta[property="og:description"]', 'property=og:description', description);
    ensureMeta('meta[property="og:image"]', 'property=og:image', image);
    ensureMeta('meta[property="og:url"]', 'property=og:url', window.location.href);
    ensureMeta('meta[name="twitter:card"]', 'name=twitter:card', 'summary_large_image');
    ensureMeta('meta[name="twitter:title"]', 'name=twitter:title', fullTitle);
    ensureMeta('meta[name="twitter:description"]', 'name=twitter:description', description);
    ensureMeta('meta[name="twitter:image"]', 'name=twitter:image', image);
  }, [description, title]);
}
