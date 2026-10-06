import type { Dictionary } from '@/lib/getDictionary'

const command = 'git push origin main'

const steps = [
  { name: 'lint + typecheck', result: '4.1s' },
  { name: 'tests', result: '212 passed' },
  { name: 'build', result: '38.6s' },
  { name: 'deploy → production', result: '12.0s' },
]

// Linha do tempo da animação, em segundos (ver .term-* em globals.css)
const typeStart = 0.6
const typeDuration = 0.9
const pipelineAt = 1.8
const firstStepAt = 2.2
const stepGap = 0.75
const stepRun = 0.6
const liveAt = firstStepAt + stepGap * (steps.length - 1) + stepRun + 0.35
const promptAt = liveAt + 0.35

const at = (seconds: number, extra: Record<string, string> = {}) =>
  ({ '--at': `${seconds}s`, ...extra }) as React.CSSProperties

interface HeroTerminalProps {
  dict: Dictionary['hero']['terminal']
}

// Ilustração decorativa: ecoa o ">_" da logo com um pipeline de entrega
export default function HeroTerminal({ dict }: HeroTerminalProps) {
  return (
    <div aria-hidden="true" className="relative">
      <div className="absolute -inset-x-8 -inset-y-12 -z-10 rounded-full bg-linear-to-tr from-brand/20 via-brand/5 to-brand-2/20 blur-3xl" />
      <div className="glow-border shadow-2xl shadow-brand/20">
        <div className="overflow-hidden bg-ink">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="ml-3 font-mono text-xs text-on-ink-variant/70">harpia — deploy</span>
          </div>
          <div className="space-y-1.5 px-5 py-6 font-mono text-[12.5px] leading-6 text-on-ink sm:px-6 sm:text-[13px]">
            <p>
              <span className="text-brand-2">$</span>{' '}
              <span
                className="term-typed"
                style={at(typeStart, {
                  '--dur': `${typeDuration}s`,
                  '--steps': String(command.length),
                  '--chars': `${command.length}ch`,
                })}
              >
                {command}
              </span>
              <span
                className="term-typing-cursor"
                style={{ '--dur': `${pipelineAt}s` } as React.CSSProperties}
              >
                <span className="cursor-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-on-ink/80" />
              </span>
            </p>
            <p className="term-line text-on-ink-variant" style={at(pipelineAt)}>
              → pipeline #128
            </p>
            <div className="py-2">
              {steps.map(({ name, result }, i) => {
                const start = firstStepAt + stepGap * i
                const done = start + stepRun
                return (
                  <p key={name} className="term-line flex items-baseline gap-3" style={at(start)}>
                    <span className="grid w-3 place-items-center self-center">
                      <span
                        className="term-spinner col-start-1 row-start-1 size-2.5 rounded-full border border-brand-2/30 border-t-brand-2"
                        style={at(start, { '--dur': `${stepRun}s` })}
                      />
                      <span className="term-line col-start-1 row-start-1 text-emerald-400" style={at(done)}>
                        ✓
                      </span>
                    </span>
                    <span>{name}</span>
                    <span className="mb-1 flex-1 border-b border-dotted border-white/15" />
                    <span className="term-line text-on-ink-variant" style={at(done)}>
                      {result}
                    </span>
                  </p>
                )
              })}
            </div>
            <p className="term-line flex items-center gap-2.5" style={at(liveAt)}>
              <span className="live-dot size-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-300">{dict.live}</span>
              <span className="text-on-ink-variant">{dict.url}</span>
            </p>
            <p className="term-line" style={at(promptAt)}>
              <span className="text-brand-2">$</span>{' '}
              <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-on-ink/80" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
