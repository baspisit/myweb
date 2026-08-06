import type { Locale, LocalizedText, TranslationTree } from '@/types/localization';
export function localize(text: LocalizedText, locale: Locale) { return text[locale] || text.en; }
export function translate(tree: TranslationTree, key: string): string { const value = key.split('.').reduce<string | TranslationTree | undefined>((node, part) => typeof node === 'object' ? node[part] : undefined, tree); return typeof value === 'string' ? value : key; }
