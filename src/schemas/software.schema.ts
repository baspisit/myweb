import { z } from 'zod';
import { baseContentSchema } from './common.schema';
export const softwareSchema = baseContentSchema.extend({ category: z.enum(['educational', 'research']), version: z.string(), platforms: z.array(z.string()) });
export const softwareListSchema = z.array(softwareSchema);
