import { z } from 'zod';
import { baseContentSchema } from './common.schema';
export const videoSchema = baseContentSchema.extend({ youtubeId: z.string(), language: z.enum(['en', 'th', 'mixed']), courseIds: z.array(z.string()), durationSeconds: z.number().optional() });
export const videoListSchema = z.array(videoSchema);
