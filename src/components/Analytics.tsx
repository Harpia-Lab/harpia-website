'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pageview, sectionIds, subscribeConsent, track, type CtaId, type CtaLocation, type SectionId } from '@/lib/analytics'

/** page_view a cada rota e section_viewed (uma vez por seção por page_view). */
export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    pageview(pathname, 'consent')

    const seen = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId
          // 50% da seção visível, ou metade da tela tomada por ela (seção mais alta que 2 telas nunca chega a 50%)
          const half = entry.intersectionRatio >= 0.5 || entry.intersectionRect.height >= (entry.rootBounds?.height ?? Infinity) / 2
          // só marca como vista se foi enviada (antes do aceite não conta)
          if (half && !seen.has(id) && track('section_viewed', { section_id: id })) seen.add(id)
        }
      },
      // ponytail: degraus de 10% para a regra da metade da tela; seção com mais de 10 telas não dispara
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) },
    )
    const observeAll = () => {
      observer.disconnect()
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      }
    }
    observeAll()
    // aceitou agora: observar de novo faz as seções já visíveis contarem
    const unsubscribe = subscribeConsent(observeAll)
    return () => {
      unsubscribe()
      observer.disconnect()
    }
  }, [pathname])

  return null
}

type TrackedLinkProps = React.ComponentProps<'a'> & { cta: CtaId; location: CtaLocation }

/** Link de CTA para páginas server-side: dispara cta_clicked no clique. */
export function TrackedLink({ cta, location, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track('cta_clicked', { cta_id: cta, location })
        onClick?.(e)
      }}
    />
  )
}
