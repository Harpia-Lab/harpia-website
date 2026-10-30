import type { Metadata } from 'next'
import { Archivo, Bricolage_Grotesque, Figtree, Sora, Unbounded } from 'next/font/google'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ConsentBanner from '@/components/ConsentBanner'
import { PageTracker } from '@/components/Analytics'
import { getDictionary, hasLocale, locales } from '@/lib/getDictionary'
import '../globals.css'

// Tipografia da Harpia Lab (direção B · Azul Harpia): Sora nos títulos e no logo, Figtree no texto
const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-figtree',
  display: 'swap',
})

// Fontes dos produtos, só dentro das mini telas (abaixo da dobra, sem preload)
// Harpia PDV: Unbounded (pdv-website)
const unbounded = Unbounded({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-unbounded',
  display: 'swap',
  preload: false,
})

// Harpia Control: Bricolage Grotesque (SPEC §7)
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-bricolage',
  display: 'swap',
  preload: false,
})

// Fellows: Archivo (fellows-website/DESIGN.md)
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
      className={`${sora.variable} ${figtree.variable} ${unbounded.variable} ${bricolage.variable} ${archivo.variable}`}
    >
      <body className="flex min-h-svh flex-col bg-background font-body text-[1.0625rem]/[1.6] text-on-surface antialiased">
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
