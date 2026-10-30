import { CheckIcon } from '@/components/icons'
import type { Dictionary } from '@/lib/getDictionary'

// Valores fictícios: 4 parcelas iguais, 2 pagas
const installment = 4600
const total = installment * 4
const received = installment * 2

const toneClass: Record<string, string> = {
  ok: 'bg-ok-ink/10 text-ok-ink',
  info: 'bg-info-ink/10 text-info-ink',
  muted: 'bg-on-ink/5 text-on-ink-variant',
}

interface ControlMockupProps {
  locale: string
  dict: Dictionary['products']['mockup']
}

// Ilustração em HTML/CSS da tela de orçamento do Control (tema escuro), sem dados reais
export default function ControlMockup({ locale, dict }: ControlMockupProps) {
  const brl = new Intl.NumberFormat(locale === 'pt' ? 'pt-BR' : 'en-US', { style: 'currency', currency: 'BRL' })

  return (
    <div role="img" aria-label={dict.label} className="w-full">
      <div className="overflow-hidden rounded-[14px] border border-ink-line bg-ink-raised">
        <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-on-ink/15" />
          <span className="size-2.5 rounded-full bg-on-ink/15" />
          <span className="size-2.5 rounded-full bg-on-ink/15" />
          <span className="ml-3 truncate font-mono text-xs text-on-ink-variant">control.harpialab.com</span>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="font-control text-lg font-bold text-on-ink">{dict.quote}</span>
              <span className="rounded-md bg-accent/10 px-1.5 py-0.5 font-mono text-xs text-accent">{dict.version}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-ink/10 px-2.5 py-1 text-xs font-medium text-ok-ink">
              <CheckIcon className="size-3.5" />
              {dict.accepted}
            </span>
          </div>
          <p className="mt-1 text-sm text-on-ink-variant">{dict.client}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-line pt-5">
            <div>
              <dt className="text-xs text-on-ink-variant">{dict.total}</dt>
              <dd className="mt-1 font-mono text-lg text-on-ink tabular-nums">{brl.format(total)}</dd>
            </div>
            <div>
              <dt className="text-xs text-on-ink-variant">{dict.received}</dt>
              <dd className="mt-1 font-mono text-lg text-ok-ink tabular-nums">{brl.format(received)}</dd>
            </div>
          </dl>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-on-ink/10">
            <div
              className="meter-fill h-full rounded-full bg-accent"
              style={{ '--meter': `${(received / total) * 100}%` } as React.CSSProperties}
            />
          </div>

          <p className="mt-6 text-xs text-on-ink-variant">{dict.installments}</p>
          <ul className="mt-2 divide-y divide-ink-line">
            {dict.rows.map(({ due, status, tone }, i) => (
              <li key={due} className="flex items-center justify-between gap-3 py-3">
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-on-ink-variant tabular-nums">
                    {i + 1}/{dict.rows.length}
                  </span>
                  <span>
                    <span className="block font-mono text-sm text-on-ink tabular-nums">{brl.format(installment)}</span>
                    <span className="block text-xs text-on-ink-variant">{due}</span>
                  </span>
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${toneClass[tone]}`}>
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
