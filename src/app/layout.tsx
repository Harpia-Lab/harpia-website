import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`scroll-smooth ${inter.variable} ${manrope.variable}`}>
      <body className="font-body bg-background text-on-surface">
        {children}
      </body>
    </html>
  )
}
