import { z } from 'zod';
import { baseContentSchema } from './common.schema';
export const courseSchema = baseContentSchema.extend({ code: z.string(), level: z.enum(['undergraduate', 'graduate', 'professional']), videoIds: z.array(z.string()), materialDownloadIds: z.array(z.string()) });
export const courseListSchema = z.array(courseSchema);
