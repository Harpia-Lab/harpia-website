import type { Metadata } from 'next'
import { Archivo, Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ConsentBanner from '@/components/ConsentBanner'
import { PageTracker } from '@/components/Analytics'
import { getDictionary, hasLocale, locales } from '@/lib/getDictionary'
import '../globals.css'

// Tipografia do Harpia Control (SPEC §7)
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-bricolage',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// Tipografia do Fellows (fellows-website/DESIGN.md), só no painel dele: abaixo da dobra, sem preload
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
  preload: false,
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harpialab.com'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { meta } = getDictionary(locale)

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { 'pt-BR': '/pt', en: '/en', 'x-default': '/pt' },
    },
    openGraph: {
      type: 'website',
      siteName: 'Harpia Lab',
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const dict = getDictionary(locale)

  return (
    <html
      lang={locale === 'pt' ? 'pt-BR' : 'en'}
      className={`${instrumentSans.variable} ${bricolage.variable} ${jetbrainsMono.variable} ${archivo.variable}`}
    >
      <body className="bg-background font-body text-on-surface antialiased">
        <a
          href="#conteudo"
          className="sr-only rounded-lg bg-surface px-4 py-2 text-sm font-semibold text-primary shadow-lg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
        >
          {dict.nav.skip}
        </a>
        <Navbar locale={locale} dict={dict.nav} />
        {children}
        <Footer locale={locale} dict={{ nav: dict.nav, footer: dict.footer }} />
        <ConsentBanner locale={locale} dict={dict.consent} />
        <PageTracker />
      </body>
    </html>
  )
}
