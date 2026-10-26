import type { Metadata } from 'next'
import TeamList from '@/components/TeamList'
import { getDictionary } from '@/lib/getDictionary'

// Os locales vêm do generateStaticParams do layout; mesmo slug nos dois idiomas.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const { about } = getDictionary(locale)
  const title = `${about.title} | Harpia Lab`

  return {
    title,
    description: about.description,
    alternates: {
      canonical: `/${locale}/sobre`,
      languages: { 'pt-BR': '/pt/sobre', en: '/en/sobre', 'x-default': '/pt/sobre' },
    },
    openGraph: {
      type: 'website',
      siteName: 'Harpia Lab',
      title,
      description: about.description,
      url: `/${locale}/sobre`,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)

  // grow: em telas altas o rodapé encosta no fim da janela
  return (
    <main id="conteudo" className="grow pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div>
          <h1 className="hero-enter font-headline text-[2.6rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-on-surface sm:text-6xl lg:text-[3.75rem]">
            {dict.about.title}
          </h1>
          <p
            className="hero-enter mt-6 max-w-xl text-lg leading-relaxed text-on-surface"
            style={{ '--enter-delay': '80ms' } as React.CSSProperties}
          >
            {dict.team.subtitle}
          </p>
        </div>
        <TeamList role={dict.team.role} className="hero-enter [--enter-delay:160ms] lg:pt-4" />
      </div>
    </main>
  )
}
