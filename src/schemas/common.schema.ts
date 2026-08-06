import { z } from 'zod';

export const localizedTextSchema = z.object({ en: z.string(), th: z.string() });
export const baseContentSchema = z.object({
  id: z.string().min(1), slug: z.string().min(1), title: localizedTextSchema,
  summary: localizedTextSchema, status: z.enum(['draft', 'published', 'archived']),
  featured: z.boolean(), tags: z.array(z.string()),
  publishedAt: z.iso.date().optional(), updatedAt: z.iso.date().optional(),
});
