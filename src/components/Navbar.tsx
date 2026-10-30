'use client'

import { useEffect, useRef, useState } from 'react'
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
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
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
    return () => {
      observer.disconnect()
      setActiveSection('')
    }
  }, [pathname])

  // Menu mobile: fecha com Esc (foco volta ao botão) ou com toque fora da barra
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [menuOpen])

  const links = [
    { id: 'produtos', label: dict.products },
    { id: 'servicos', label: dict.services },
    { id: 'processo', label: dict.process },
  ]

  const languageSwitch = (
    <div
      role="group"
      aria-label={dict.language}
      className="inline-flex items-center rounded-md border border-outline-variant p-0.5 font-mono text-xs"
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
    <nav ref={navRef} aria-label={dict.label} className="fixed top-0 z-50 w-full border-b border-outline-variant bg-background/95 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <a href={home || '#'} aria-label="Harpia Lab">
          <Logo />
        </a>

        <div className="flex items-center gap-3 md:gap-8">
          {/* Desktop */}
          <div className="hidden items-center gap-7 md:flex">
            {links.map(({ id, label }) => {
              const active = activeSection === id
              return (
                <a
                  key={id}
                  href={`${home}#${id}`}
                  aria-current={active ? 'true' : undefined}
                  className={`group relative py-1 text-[0.95rem] transition-colors hover:text-primary ${active ? 'text-primary' : 'text-on-surface-variant'}`}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100 ${active ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </a>
              )
            })}
            {languageSwitch}
          </div>
          {/* CTA sempre visível, inclusive no mobile */}
          <a
            href={`${home}#contato`}
            onClick={() => {
              trackContact()
              setMenuOpen(false)
            }}
            className="rounded-[10px] bg-cta px-3.5 py-2 text-[0.95rem] font-semibold whitespace-nowrap text-on-cta transition-colors hover:bg-primary-hover md:px-[1.15rem] md:py-2.5"
          >
            {dict.cta}
          </a>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 cursor-pointer touch-manipulation p-2 text-primary md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? dict.closeMenu : dict.openMenu}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="menu-mobile"
        className={`${menuOpen ? 'flex' : 'hidden'} absolute top-full left-0 w-full flex-col gap-1 border-b border-outline-variant bg-background px-4 pt-3 sm:px-6 pb-6 shadow-lg md:hidden`}
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
        <div className="mt-4">{languageSwitch}</div>
      </div>
    </nav>
  )
}
