'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/',         label: 'Início' },
  { href: '/sobre',    label: 'Sobre Nós' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/contato',  label: 'Contato' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#111316]/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,218,243,0.08)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-primary font-headline"
        >
          Harpia Lab
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-headline font-bold tracking-tight transition-colors duration-300 ${
                pathname === href
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-slate-400 hover:text-primary'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/contato"
            className="hidden md:block bg-primary text-on-primary px-6 py-2 rounded font-headline font-bold hover:shadow-[0_0_15px_rgba(0,218,243,0.4)] transition-all active:scale-95"
          >
            Fale Conosco
          </Link>
          <button
            className="md:hidden text-primary p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111316]/95 backdrop-blur-xl border-t border-outline-variant/20 px-8 py-6 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`font-headline font-bold text-lg ${
                pathname === href ? 'text-primary' : 'text-slate-400'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contato"
            onClick={() => setMenuOpen(false)}
            className="bg-primary text-on-primary px-6 py-3 rounded font-headline font-bold text-center mt-2"
          >
            Fale Conosco
          </Link>
        </div>
      )}
    </nav>
  )
}
