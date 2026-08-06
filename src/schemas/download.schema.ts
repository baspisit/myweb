import { z } from 'zod';
import { localizedTextSchema } from './common.schema';
export const downloadSchema = z.object({ id: z.string(), title: localizedTextSchema, description: localizedTextSchema.optional(), category: z.string(), file: z.object({ path: z.string(), filename: z.string(), extension: z.string(), sizeBytes: z.number().optional() }) });
export const downloadListSchema = z.array(downloadSchema);
