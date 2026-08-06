export type Locale = 'en' | 'th';
export type LocalizedText = Record<Locale, string>;
export type TranslationTree = { [key: string]: string | TranslationTree };
