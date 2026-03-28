import pt from '@/dictionaries/pt'
import en from '@/dictionaries/en'

const dictionaries = { pt, en }

export type Locale = 'pt' | 'en'
export type Dictionary = typeof pt

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] ?? dictionaries.pt
}
