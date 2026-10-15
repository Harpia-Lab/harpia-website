'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo'
import { CloseIcon, MenuIcon } from '@/components/icons'
import { sectionIds, track } from '@/lib/analytics'
import { locales, type Dictionary, type Locale } from '@/lib/getDictionary'

interface NavbarProps {
  locale: Locale
  dict: Dictionary['nav']
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()
  // Fora da home (ex.: /pt/privacidade) as âncoras apontam para /<locale>#secao
  const home = pathname === `/${locale}` ? '' : `/${locale}`
  const trackContact = () => track('cta_clicked', { cta_id: 'contact', location: 'navbar' })

  // Destaca no menu a seção que está cruzando o meio da tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { id } = entry.target
          if (entry.isIntersecting) setActiveSection(id)
          else setActiveSection((current) => (current === id ? '' : current))
        }
      },
      { rootMargin: '-45% 0px -55% 0px' },
    )
    for (const id of sectionIds) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  const links = [
    { id: 'servicos', label: dict.services },
    { id: 'produtos', label: dict.products },
    { id: 'processo', label: dict.process },
    { id: 'equipe', label: dict.team },
  ]

  const languageSwitch = (
    <div
      role="group"
      aria-label={dict.language}
      className="flex items-center rounded-md border border-outline-variant p-0.5 font-mono text-xs"
    >
      {locales.map((l) =>
        l === locale ? (
          <span key={l} aria-current="true" className="rounded bg-surface-container-low px-2 py-1 font-medium text-on-surface">
            {l.toUpperCase()}
          </span>
        ) : (
          <a
            key={l}
            href={`/${l}${pathname.slice(locale.length + 1)}`}
            hrefLang={l}
            onClick={() => track('language_switched', { to: l })}
            className="rounded px-2 py-1 text-on-surface-variant transition-colors hover:text-primary"
          >
            {l.toUpperCase()}
          </a>
        ),
      )}
    </div>
  )

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/70 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href={home || '#'} aria-label="Harpia Lab">
          <Logo />
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map(({ id, label }) => {
            const active = activeSection === id
            return (
              <a
                key={id}
                href={`${home}#${id}`}
                aria-current={active ? 'true' : undefined}
                className={`group relative py-1 text-sm font-medium transition-colors hover:text-primary ${active ? 'text-primary' : 'text-on-surface-variant'}`}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-linear-to-r from-brand to-brand-2 transition-transform duration-300 group-hover:scale-x-100 ${active ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </a>
            )
          })}
          {languageSwitch}
          <a
            href={`${home}#contato`}
            onClick={trackContact}
            className="btn-shine rounded-lg bg-cta px-4 py-2 text-sm font-semibold text-on-cta transition hover:shadow-lg hover:shadow-cta/30"
          >
            {dict.cta}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="-mr-2 cursor-pointer touch-manipulation p-2 text-primary md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? dict.closeMenu : dict.openMenu}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {/* Progresso de leitura */}
      <div
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-linear-to-r from-brand to-brand-2"
      />

      {/* Mobile menu */}
      <div
        className={`${menuOpen ? 'flex' : 'hidden'} absolute top-full left-0 w-full flex-col gap-1 border-b border-outline-variant bg-background px-6 pt-3 pb-6 shadow-lg md:hidden`}
      >
        {links.map(({ id, label }) => (
          <a
            key={id}
            href={`${home}#${id}`}
            onClick={() => setMenuOpen(false)}
            className="border-b border-outline-variant py-3.5 text-base font-medium text-on-surface transition-colors hover:text-primary"
          >
            {label}
          </a>
        ))}
        <div className="mt-4 flex items-center justify-between gap-4">
          {languageSwitch}
          <a
            href={`${home}#contato`}
            onClick={() => {
              trackContact()
              setMenuOpen(false)
            }}
            className="rounded-lg bg-cta px-5 py-3 text-center text-sm font-semibold text-on-cta"
          >
            {dict.cta}
          </a>
        </div>
      </div>
    </nav>
  )
}
