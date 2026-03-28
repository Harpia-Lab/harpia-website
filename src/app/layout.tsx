import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getDictionary } from '@/lib/getDictionary'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Harpia Lab | Consultoria & Fábrica de Software',
  description:
    'Desenvolvemos produtos digitais e oferecemos consultoria técnica para empresas que precisam de resultado — do MVP ao sistema em produção.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const locale = headersList.get('x-locale') ?? 'pt'
  const lang = locale === 'en' ? 'en' : 'pt-BR'
  const dict = getDictionary(locale)

  return (
    <html lang={lang} className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-body bg-background text-on-surface">
        <Navbar locale={locale} dict={dict.nav} />
        {children}
        <Footer dict={dict.footer} />
      </body>
    </html>
  )
}
