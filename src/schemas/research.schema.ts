import { z } from 'zod';
import { baseContentSchema } from './common.schema';
export const researchSchema = baseContentSchema.extend({ currentStatus: z.enum(['active', 'completed', 'planned']), researchAreas: z.array(z.string()), publicationIds: z.array(z.string()) });
export const researchListSchema = z.array(researchSchema);
