import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getDictionary } from '@/lib/getDictionary'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <>
      <Navbar />
      {children}
      <Footer dict={dict.footer} />
    </>
  )
}
