import Logo from '@/components/Logo'
import type { Dictionary } from '@/lib/getDictionary'

interface FooterProps {
  dict: Pick<Dictionary, 'nav' | 'footer'>
}

export default function Footer({ dict }: FooterProps) {
  const links = [
    { href: '#servicos', label: dict.nav.services },
    { href: '#processo', label: dict.nav.process },
    { href: '#equipe', label: dict.nav.team },
    { href: '#contato', label: dict.nav.cta },
  ]

  return (
    <footer className="on-ink bg-ink text-on-ink-variant">
      <div aria-hidden="true" className="h-px bg-linear-to-r from-transparent via-brand/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo inverted />
            <p className="mt-4 text-sm">{dict.footer.tagline}</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {links.map(({ href, label }) => (
              <a key={href} href={href} className="transition-colors hover:text-white">
                {label}
              </a>
            ))}
            <a href="mailto:contato@harpialab.com" className="transition-colors hover:text-white">
              contato@harpialab.com
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Harpia Lab. {dict.footer.copyright}
          </p>
          <p>{dict.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  )
}
