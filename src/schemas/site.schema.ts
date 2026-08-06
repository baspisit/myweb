import { z } from 'zod';
import { localizedTextSchema } from './common.schema';
export const siteSchema = z.object({
  siteName: z.string(), shortName: z.string(), tagline: localizedTextSchema,
  description: localizedTextSchema, defaultLocale: z.enum(['en', 'th']),
  supportedLocales: z.array(z.enum(['en', 'th'])), authorId: z.string(),
  institutionalDisclaimer: localizedTextSchema,
  contact: z.object({ email: z.email(), website: z.url().optional() }),
});
