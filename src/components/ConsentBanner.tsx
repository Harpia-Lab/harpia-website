'use client'

import Link from 'next/link'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import { bannerVisible, clearConsent, subscribeConsent, writeConsent, type Consent } from '@/lib/analytics'
import type { Dictionary, Locale } from '@/lib/getDictionary'

interface ConsentBannerProps {
  locale: Locale
  dict: Dictionary['consent']
}

const buttonClass =
  'cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover'

// Reaberto por "Preferências de cookies": o banner recebe o foco e, depois da escolha, ele volta para quem abriu.
let returnFocus: HTMLElement | null = null
let focusOnShow = false

/** Rodapé: apaga a escolha e reabre o banner. */
export function reopenConsentBanner(opener: HTMLElement) {
  returnFocus = opener
  focusOnShow = true
  clearConsent()
}

function choose(v: Consent) {
  writeConsent(v)
  returnFocus?.focus()
  returnFocus = null
}

/** Opt-in do GA4: nada carrega antes do "Aceitar". Sem NEXT_PUBLIC_GA_MEASUREMENT_ID não aparece. */
export default function ConsentBanner({ locale, dict }: ConsentBannerProps) {
  const visible = useSyncExternalStore(subscribeConsent, bannerVisible, () => false)
  const region = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible && focusOnShow) {
      focusOnShow = false
      region.current?.focus()
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      ref={region}
      role="region"
      aria-label={dict.label}
      tabIndex={-1}
      className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-outline-variant bg-surface p-5 shadow-2xl shadow-on-surface/10 sm:right-auto sm:max-w-md"
    >
      <p className="text-sm leading-relaxed text-on-surface-variant">
        {dict.text}{' '}
        <Link href={`/${locale}/privacidade`} className="font-medium text-primary underline underline-offset-4">
          {dict.policy}
        </Link>
      </p>
      {/* Mesmo peso para as duas escolhas */}
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose('denied')} className={buttonClass}>
          {dict.decline}
        </button>
        <button type="button" onClick={() => choose('granted')} className={buttonClass}>
          {dict.accept}
        </button>
      </div>
    </div>
  )
}
