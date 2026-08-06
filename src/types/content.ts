import type { LocalizedText } from './localization';

export interface ImageReference { src: string; alt: LocalizedText; width?: number; height?: number }
export interface LinkReference { label: LocalizedText; url: string }
export interface BaseContent {
  id: string; slug: string; title: LocalizedText; summary: LocalizedText;
  status: 'draft' | 'published' | 'archived'; featured: boolean; tags: string[];
  publishedAt?: string; updatedAt?: string; image?: ImageReference;
}
export interface Software extends BaseContent { category: 'educational' | 'research'; version: string; platforms: string[] }
export interface Course extends BaseContent { code: string; level: 'undergraduate' | 'graduate' | 'professional'; videoIds: string[]; materialDownloadIds: string[] }
export interface Video extends BaseContent { youtubeId: string; language: 'en' | 'th' | 'mixed'; courseIds: string[]; durationSeconds?: number }
export interface ResearchProject extends BaseContent { currentStatus: 'active' | 'completed' | 'planned'; researchAreas: string[]; publicationIds: string[] }
export interface Publication {
  id: string;
  slug: string;
  title: string;
  authors: { name: string; personId?: string }[];
  type: string;
  year: number;
  doi?: string;
  featured: boolean;
  recent: boolean;
  journal?: string;
  abstract?: string;
  graphicalAbstract?: string;
  relatedSoftware?: string[];
  relatedResearch?: string[];
  pdf?: string;
  citationCount?: number;
  volume?: string;
  issue?: string;
  pages?: string;
}
export interface Download { id: string; title: LocalizedText; description?: LocalizedText; category: string; file: { path: string; filename: string; extension: string; sizeBytes?: number } }
export interface Documentation extends BaseContent { type: string; softwareIds: string[]; courseIds: string[]; downloadIds: string[] }
export interface NewsArticle extends BaseContent { category: string; authorId: string }
export interface Person { id: string; name: string; nameLocal?: string; titles: LocalizedText[]; biography: LocalizedText; roles: LocalizedText[]; expertise: LocalizedText[]; contact: { email?: string; website?: string } }
