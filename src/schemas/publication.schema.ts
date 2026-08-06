import { z } from 'zod';
export const publicationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  authors: z.array(z.object({ name: z.string(), personId: z.string().optional() })),
  type: z.string(),
  year: z.number().int(),
  doi: z.string().optional(),
  featured: z.boolean(),
  recent: z.boolean(),
  journal: z.string().optional(),
  abstract: z.string().optional(),
  graphicalAbstract: z.string().optional(),
  relatedSoftware: z.array(z.string()).optional(),
  relatedResearch: z.array(z.string()).optional(),
  pdf: z.string().optional(),
  citationCount: z.number().int().nonnegative().optional(),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
});
export const publicationListSchema = z.array(publicationSchema);
