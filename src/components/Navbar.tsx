'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

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
            Serviços
          </a>
          <a href="#equipe" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
            Equipe
          </a>
          <a
            href="#contato"
            className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            Fale Conosco
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-on-surface"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-outline-variant px-6 py-5 flex flex-col gap-4">
          <a href="#servicos" onClick={() => setMenuOpen(false)} className="text-base font-medium text-on-surface-variant hover:text-primary transition-colors">
            Serviços
          </a>
          <a href="#equipe" onClick={() => setMenuOpen(false)} className="text-base font-medium text-on-surface-variant hover:text-primary transition-colors">
            Equipe
          </a>
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="bg-primary text-on-primary px-5 py-3 rounded-lg text-sm font-semibold text-center"
          >
            Fale Conosco
          </a>
        </div>
      )}
    </nav>
  )
}
