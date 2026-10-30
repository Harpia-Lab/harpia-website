import type { Dictionary } from '@/lib/getDictionary'

// Furinhos de alfinete do número de peito
const pins = ['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'bottom-1 right-1']

// Ilustração do cartão de atividade do Fellows (ActivityCard + Bib do fellows-website), sem dados reais
export default function FellowsCard({ dict }: { dict: Dictionary['products']['fellows']['card'] }) {
  return (
    <div
      role="img"
      aria-label={dict.label}
      className="w-full max-w-[22rem] rounded-[14px] border border-fellows-line bg-fellows-card p-3 font-fellows text-fellows-ink shadow-[0_1px_2px_rgb(14_19_32/0.08),0_8px_24px_-12px_rgb(14_19_32/0.12)]"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-fellows-accent-soft text-fellows-accent">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
            <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
            <path d="M16 17h4" />
            <path d="M4 13h4" />
          </svg>
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-lg font-[650] font-stretch-[112%]">{dict.title}</span>
          <span className="text-sm text-fellows-mute tabular-nums">{dict.when}</span>
          <span className="text-sm text-fellows-mute tabular-nums">{dict.where}</span>
        </span>
        <span className="relative flex h-13 min-w-14 shrink-0 flex-col items-center justify-center gap-1 rounded-[6px] bg-fellows-lime px-2.5 leading-none font-extrabold font-stretch-[125%] tabular-nums">
          {pins.map((p) => (
            <span key={p} className={`absolute size-[3px] rounded-full bg-fellows-bg ${p}`} />
          ))}
          <span className="text-xl/none">3</span>
          <span className="text-xs/none tracking-[0.08em] uppercase">{dict.slots}</span>
        </span>
      </div>
    </div>
  )
}
