import type { Metadata } from 'next'
import { privacyPolicy } from '@/content/privacy'
import { getDictionary, hasLocale } from '@/lib/getDictionary'

// Os locales vêm do generateStaticParams do layout; mesmo slug nos dois idiomas.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const { privacy } = getDictionary(locale)
  const title = `${privacy.title} | Harpia Lab`

  return {
    title,
    description: privacy.description,
    alternates: {
      canonical: `/${locale}/privacidade`,
      languages: { 'pt-BR': '/pt/privacidade', en: '/en/privacidade', 'x-default': '/pt/privacidade' },
    },
    openGraph: {
      type: 'website',
      siteName: 'Harpia Lab',
      title,
      description: privacy.description,
      url: `/${locale}/privacidade`,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32">
      <article className="policy mx-auto max-w-3xl px-6 lg:px-8">
        {privacyPolicy[hasLocale(locale) ? locale : 'pt']}
      </article>
    </main>
  )
}
