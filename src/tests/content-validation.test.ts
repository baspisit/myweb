import { describe, expect, it } from 'vitest'; import { validateContent } from '@/lib/validation';
describe('content', () => { it('matches the content schemas', () => { expect(() => validateContent()).not.toThrow(); }); });
