'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo'
import { reopenConsentBanner } from '@/components/ConsentBanner'
import { analyticsEnabled, track } from '@/lib/analytics'
import type { Dictionary, Locale } from '@/lib/getDictionary'

interface FooterProps {
  locale: Locale
  dict: Pick<Dictionary, 'nav' | 'footer'>
}

export default function Footer({ locale, dict }: FooterProps) {
  // Fora da home (ex.: /pt/privacidade) as âncoras apontam para /<locale>#secao
  const home = usePathname() === `/${locale}` ? '' : `/${locale}`
  const links = [
    { href: `${home}#servicos`, label: dict.nav.services },
    { href: `${home}#produtos`, label: dict.nav.products },
    { href: `${home}#processo`, label: dict.nav.process },
    { href: `${home}#equipe`, label: dict.nav.team },
  ]
  const linkClass = 'transition-colors hover:text-on-ink'

  return (
    <footer className="on-ink bg-ink text-on-ink-variant">
      <div aria-hidden="true" className="h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo inverted />
            <p className="mt-4 text-sm">{dict.footer.tagline}</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {links.map(({ href, label }) => (
              <a key={href} href={href} className={linkClass}>
                {label}
              </a>
            ))}
            <a
              href={`${home}#contato`}
              onClick={() => track('cta_clicked', { cta_id: 'contact', location: 'footer' })}
              className={linkClass}
            >
              {dict.nav.cta}
            </a>
            <a
              href="mailto:contato@harpialab.com"
              onClick={() => track('cta_clicked', { cta_id: 'email', location: 'footer' })}
              className={linkClass}
            >
              contato@harpialab.com
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-ink-line py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
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
