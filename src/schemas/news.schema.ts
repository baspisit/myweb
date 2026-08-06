import { z } from 'zod';
import { baseContentSchema } from './common.schema';
export const newsSchema = baseContentSchema.extend({ category: z.string(), authorId: z.string() });
export const newsListSchema = z.array(newsSchema);
