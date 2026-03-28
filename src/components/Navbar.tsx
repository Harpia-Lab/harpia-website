'use client'

import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { getDictionary } from '@/lib/getDictionary'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const locale = pathname?.startsWith('/en') ? 'en' : 'pt'
  const { nav: dict } = getDictionary(locale)
  const otherLocale = locale === 'pt' ? 'en' : 'pt'
  const otherLocaleLabel = locale === 'pt' ? 'EN' : 'PT'

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-outline-variant">
      <div className="flex justify-between items-center px-6 md:px-12 max-w-screen-xl mx-auto h-16">
        <a href="#" aria-label="Harpia Lab">
          <Image
            src="/images/logo-harpialab.png"
            alt="Harpia Lab"
            width={1280}
            height={1280}
            className="h-10 w-auto"
            priority
          />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicos" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
            {dict.services}
          </a>
          <a href="#equipe" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
            {dict.team}
          </a>
          <a
            href="#contato"
            className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            {dict.cta}
          </a>
          <a
            href={`/${otherLocale}`}
            className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            {otherLocaleLabel}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-3 text-primary relative z-50 cursor-pointer touch-manipulation"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5 pointer-events-none transition-transform duration-300" />
          <span className="block w-6 h-0.5 bg-current mb-1.5 pointer-events-none transition-opacity duration-300" />
          <span className="block w-6 h-0.5 bg-current pointer-events-none transition-transform duration-300" />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${menuOpen ? 'flex' : 'hidden'} absolute top-full left-0 w-full flex-col bg-white border-b border-outline-variant px-6 py-5 gap-4 shadow-lg md:hidden`}>
        <a href="#servicos" onClick={() => setMenuOpen(false)} className="text-base font-medium text-on-surface-variant hover:text-primary transition-colors">
          {dict.services}
        </a>
        <a href="#equipe" onClick={() => setMenuOpen(false)} className="text-base font-medium text-on-surface-variant hover:text-primary transition-colors">
          {dict.team}
        </a>
        <a
          href="#contato"
          onClick={() => setMenuOpen(false)}
          className="bg-primary text-on-primary px-5 py-3 rounded-lg text-sm font-semibold text-center"
        >
          {dict.cta}
        </a>
        <a
          href={`/${otherLocale}`}
          onClick={() => setMenuOpen(false)}
          className="text-base font-medium text-on-surface-variant hover:text-primary transition-colors"
        >
          {otherLocaleLabel}
        </a>
      </div>
    </nav>
  )
}
