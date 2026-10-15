'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { bannerVisible, subscribeConsent, writeConsent } from '@/lib/analytics'
import type { Dictionary, Locale } from '@/lib/getDictionary'

interface ConsentBannerProps {
  locale: Locale
  dict: Dictionary['consent']
}

const buttonClass =
  'cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover'

/** Opt-in do GA4: nada carrega antes do "Aceitar". Sem NEXT_PUBLIC_GA_MEASUREMENT_ID não aparece. */
export default function ConsentBanner({ locale, dict }: ConsentBannerProps) {
  const visible = useSyncExternalStore(subscribeConsent, bannerVisible, () => false)
  if (!visible) return null

  return (
    <div
      role="region"
      aria-label={dict.label}
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
        <button type="button" onClick={() => writeConsent('denied')} className={buttonClass}>
          {dict.decline}
        </button>
        <button type="button" onClick={() => writeConsent('granted')} className={buttonClass}>
          {dict.accept}
        </button>
      </div>
    </div>
  )
}
