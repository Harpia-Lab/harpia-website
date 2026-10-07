import pt from '@/dictionaries/pt'
import en from '@/dictionaries/en'

const dictionaries = { pt, en }

export type Locale = 'pt' | 'en'
export type Dictionary = typeof pt

export const locales: Locale[] = ['pt', 'en']

export function hasLocale(locale: string): locale is Locale {
  return locale in dictionaries
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] ?? dictionaries.pt
}
