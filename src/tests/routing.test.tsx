import { describe, expect, it } from 'vitest'; import { routes } from '@/app/routes';
describe('routes', () => { it('defines all top-level pages', () => { expect(Object.keys(routes)).toHaveLength(10); }); });
