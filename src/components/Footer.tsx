'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo'
import { reopenConsentBanner } from '@/components/ConsentBanner'
import { analyticsEnabled, track, type CtaId } from '@/lib/analytics'
import type { Dictionary, Locale } from '@/lib/getDictionary'
import { controlUrl, fellowsUrl, pdvUrl } from '@/lib/products'

interface FooterProps {
  locale: Locale
  dict: Pick<Dictionary, 'nav' | 'footer'>
}

// Ordem dos produtos: Harpia PDV, Harpia Control, Fellows (manual, M10)
const products: { cta: CtaId; href: string; label: string }[] = [
  { cta: 'pdv', href: pdvUrl, label: 'Harpia PDV' },
  { cta: 'control', href: controlUrl, label: 'Harpia Control' },
  { cta: 'fellows', href: fellowsUrl, label: 'Fellows' },
]

export default function Footer({ locale, dict }: FooterProps) {
  // Fora da home (ex.: /pt/privacidade) as âncoras apontam para /<locale>#secao
  const home = usePathname() === `/${locale}` ? '' : `/${locale}`
  const links = [
    { href: `${home}#produtos`, label: dict.nav.products },
    { href: `${home}#servicos`, label: dict.nav.services },
    { href: `${home}#processo`, label: dict.nav.process },
    { href: `${home}#equipe`, label: dict.nav.team },
  ]
  const linkClass = 'underline-offset-4 transition-colors hover:text-white hover:underline'
  // Alvo de toque com altura confortável sem mudar o espaçamento visível
  const navLinkClass = `inline-block py-2 ${linkClass}`

  return (
    <footer className="on-footer bg-footer text-[0.95rem] text-on-footer">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo inverted />
            <p className="mt-2 text-sm">{dict.footer.tagline}</p>
          </div>
          <div className="flex flex-col gap-2">
            <nav aria-label={dict.footer.nav} className="-my-2 flex flex-wrap gap-x-6">
              {links.map(({ href, label }) => (
                <a key={href} href={href} className={navLinkClass}>
                  {label}
                </a>
              ))}
              <Link href={`/${locale}/sobre`} className={navLinkClass}>
                {dict.nav.about}
              </Link>
              <a
                href={`${home}#contato`}
                onClick={() => track('cta_clicked', { cta_id: 'contact', location: 'footer' })}
                className={navLinkClass}
              >
                {dict.nav.cta}
              </a>
              <a
                href="mailto:contato@harpialab.com"
                onClick={() => track('cta_clicked', { cta_id: 'email', location: 'footer' })}
                className={navLinkClass}
              >
                contato@harpialab.com
              </a>
            </nav>
            <ul aria-label={dict.nav.products} className="-my-2 flex flex-wrap gap-x-6">
              {products.map(({ cta, href, label }) => (
                <li key={cta}>
                  <a
                    href={href}
                    onClick={() => track('cta_clicked', { cta_id: cta, location: 'footer' })}
                    className={`${navLinkClass} text-white`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Ano do build no HTML estático; o cliente pode estar em outro ano */}
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Harpia Lab. {dict.footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href={`/${locale}/privacidade`} className={linkClass}>
              {dict.footer.privacy}
            </Link>
            {analyticsEnabled && (
              <button type="button" onClick={(e) => reopenConsentBanner(e.currentTarget)} className={`cursor-pointer ${linkClass}`}>
                {dict.footer.cookiePreferences}
              </button>
            )}
            <p>{dict.footer.madeWith}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
