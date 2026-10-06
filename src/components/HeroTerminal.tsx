import type { Dictionary } from '@/lib/getDictionary'

const steps = [
  { name: 'lint + typecheck', result: '4.1s' },
  { name: 'tests', result: '212 passed' },
  { name: 'build', result: '38.6s' },
  { name: 'deploy → production', result: '12.0s' },
]

interface HeroTerminalProps {
  dict: Dictionary['hero']['terminal']
}

// Ilustração decorativa: ecoa o ">_" da logo com um pipeline de entrega
export default function HeroTerminal({ dict }: HeroTerminalProps) {
  return (
    <div aria-hidden="true" className="relative">
      <div className="absolute -inset-x-6 -inset-y-10 -z-10 rounded-full bg-primary/15 blur-3xl" />
      <div className="overflow-hidden rounded-2xl bg-ink shadow-2xl shadow-primary/25 ring-1 ring-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-xs text-on-ink-variant/70">harpia — deploy</span>
        </div>
        <div className="space-y-1.5 px-5 py-6 font-mono text-[12.5px] leading-6 text-on-ink sm:px-6 sm:text-[13px]">
          <p>
            <span className="text-accent">$</span> git push origin main
          </p>
          <p className="text-on-ink-variant">→ pipeline #128</p>
          <div className="py-2">
            {steps.map(({ name, result }) => (
              <p key={name} className="flex items-baseline gap-3">
                <span className="text-emerald-400">✓</span>
                <span>{name}</span>
                <span className="mb-1 flex-1 border-b border-dotted border-white/15" />
                <span className="text-on-ink-variant">{result}</span>
              </p>
            ))}
          </div>
          <p className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgb(52_211_153/0.18)]" />
            <span className="text-emerald-300">{dict.live}</span>
            <span className="text-on-ink-variant">{dict.url}</span>
          </p>
          <p>
            <span className="text-accent">$</span>{' '}
            <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-on-ink/80" />
          </p>
        </div>
      </div>
    </div>
  )
}
