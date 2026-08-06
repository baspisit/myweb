export interface PublicationInput {
  id?: string;
  slug?: string;
  title: string;
  authors: string[] | string;
  journal?: string;
  year: number | string;
  doi?: string;
  abstract?: string;
  graphicalAbstract?: string;
  relatedSoftware?: string[];
  relatedResearch?: string[];
  pdf?: string;
  citationCount?: number;
  type?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  featured?: boolean;
  recent?: boolean;
  sourceOrder?: number;
}

export interface ImportedPublication {
  id: string;
  slug: string;
  title: string;
  authors: Array<{ name: string }>;
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
