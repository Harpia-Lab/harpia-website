import { CheckIcon } from '@/components/icons'
import type { Dictionary } from '@/lib/getDictionary'

// Valores fictícios: parcelas iguais
const installment = 4600

const toneClass: Record<string, string> = {
  ok: 'bg-ok-ink/10 text-ok-ink',
  info: 'bg-info-ink/10 text-info-ink',
  muted: 'bg-on-ink/5 text-on-ink-variant',
}

interface ControlMockupProps {
  locale: string
  dict: Dictionary['products']['mockup']
}

// Ilustração compacta da tela de orçamento do Control (tema escuro), sem dados reais.
// Mesmo porte do cartão do PDV: cabeçalho + 3 parcelas.
export default function ControlMockup({ locale, dict }: ControlMockupProps) {
  const brl = new Intl.NumberFormat(locale === 'pt' ? 'pt-BR' : 'en-US', { style: 'currency', currency: 'BRL' })

  return (
    <div
      role="img"
      aria-label={dict.label}
      className="w-80 max-w-full rounded-[14px] border border-ink-line bg-ink-raised p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-control text-base font-bold text-on-ink">
          {dict.quote} <span className="font-body text-sm font-normal text-on-ink-variant">· {dict.version}</span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-ok-ink/10 px-2 py-0.5 text-xs font-medium text-ok-ink">
          <CheckIcon className="size-3.5" />
          {dict.accepted}
        </span>
      </div>
      <p className="mt-0.5 mb-3 text-sm text-on-ink-variant">{dict.client}</p>
      <ul className="divide-y divide-ink-line border-t border-ink-line">
        {dict.rows.map(({ due, status, tone }) => (
          <li key={due} className="flex items-center justify-between gap-3 py-2.5">
            <span className="flex items-baseline gap-2.5">
              <span className="font-mono text-sm text-on-ink tabular-nums">{brl.format(installment)}</span>
              <span className="text-xs whitespace-nowrap text-on-ink-variant">{due}</span>
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${toneClass[tone]}`}>
              {status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
