'use client'

import Image from 'next/image'
import { useState } from 'react'

interface NavbarProps {
  locale: string
  dict: { services: string; team: string; cta: string }
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
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
          className="md:hidden p-3 text-on-surface"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${menuOpen ? 'flex' : 'hidden'} flex-col bg-white border-t border-outline-variant px-6 py-5 gap-4`}>
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
