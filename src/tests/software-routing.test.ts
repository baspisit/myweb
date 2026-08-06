import { describe, expect, it } from 'vitest';
import { importedSoftware, softwareBySlug, softwareSlug } from '@/lib/imported-content';

describe('software detail routing', () => {
  it('creates a unique resolvable slug for every imported software item', () => {
    const slugs = importedSoftware.map((software) => softwareSlug(software.name));
    expect(new Set(slugs).size).toBe(importedSoftware.length);
    for (const software of importedSoftware) {
      expect(softwareBySlug(softwareSlug(software.name))).toEqual(software);
    }
  });
});
