import { courseListSchema } from '@/schemas/course.schema';
import { documentationListSchema } from '@/schemas/documentation.schema';
import { downloadListSchema } from '@/schemas/download.schema';
import { newsListSchema } from '@/schemas/news.schema';
import { publicationListSchema } from '@/schemas/publication.schema';
import { researchListSchema } from '@/schemas/research.schema';
import { softwareListSchema } from '@/schemas/software.schema';
import { videoListSchema } from '@/schemas/video.schema';
import * as content from './content';
export function validateContent() { courseListSchema.parse(content.courses); documentationListSchema.parse(content.documentation); downloadListSchema.parse(content.downloads); newsListSchema.parse(content.news); publicationListSchema.parse(content.publications); researchListSchema.parse(content.research); softwareListSchema.parse(content.software); videoListSchema.parse(content.videos); }
