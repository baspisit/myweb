import { z } from 'zod';
import { baseContentSchema } from './common.schema';
export const documentationSchema = baseContentSchema.extend({ type: z.string(), softwareIds: z.array(z.string()), courseIds: z.array(z.string()), downloadIds: z.array(z.string()) });
export const documentationListSchema = z.array(documentationSchema);
