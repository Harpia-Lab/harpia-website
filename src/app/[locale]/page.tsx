import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import HeroTerminal from '@/components/HeroTerminal'
import SectionHeader, { Eyebrow } from '@/components/SectionHeader'
import {
  ArrowRightIcon,
  CheckIcon,
  CompassIcon,
  DevicesIcon,
  LayersIcon,
  MailIcon,
  NodesIcon,
} from '@/components/icons'
import { getDictionary } from '@/lib/getDictionary'

const team = [
  { src: '/images/ttt.jpeg', name: 'Tiago Thomen Taraczuk' },
  { src: '/images/ggr.png', name: 'Gabriel Gomes Rapozo' },
  { src: '/images/cm.png', name: 'Cezar Mauricio' },
]

// Mesma ordem de dict.services.items
const serviceIcons = [LayersIcon, CompassIcon, DevicesIcon, NodesIcon]

const container = 'mx-auto max-w-6xl px-6 lg:px-8'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <main>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
        <div className={`${container} grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14`}>
          <div>
            <Eyebrow className="hero-enter">{dict.hero.badge}</Eyebrow>
            <h1
              className="hero-enter mt-6 font-headline text-[2.6rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-on-surface sm:text-6xl lg:text-[3.75rem]"
              style={{ '--enter-delay': '80ms' } as React.CSSProperties}
            >
              {dict.hero.title}
            </h1>
            <p
              className="hero-enter mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant"
              style={{ '--enter-delay': '160ms' } as React.CSSProperties}
            >
              {dict.hero.subtitle}
            </p>
            <div
              className="hero-enter mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
              style={{ '--enter-delay': '240ms' } as React.CSSProperties}
            >
              <a
                href="#contato"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-on-primary shadow-lg shadow-primary/20 transition-colors hover:bg-primary-hover"
              >
                {dict.hero.ctaPrimary}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#processo"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <span className="underline-offset-4 group-hover:underline">{dict.hero.ctaSecondary}</span>
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <ul
              className="hero-enter mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-outline-variant pt-6 text-sm text-on-surface-variant"
              style={{ '--enter-delay': '320ms' } as React.CSSProperties}
            >
              {dict.hero.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-primary" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-enter" style={{ '--enter-delay': '200ms' } as React.CSSProperties}>
            <HeroTerminal dict={dict.hero.terminal} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicos" className="scroll-mt-16 border-t border-outline-variant py-24 md:py-32">
        <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
          <SectionHeader
            label={dict.services.label}
            title={dict.services.title}
            subtitle={dict.services.subtitle}
            className="reveal"
          />
          <div className="reveal grid gap-px overflow-hidden rounded-2xl border border-outline-variant bg-outline-variant sm:grid-cols-2">
            {dict.services.items.map(({ title, desc }, i) => {
              const Icon = serviceIcons[i]
              return (
                <article key={title} className="bg-surface p-7 transition-colors hover:bg-surface-container-lowest sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/[0.06] text-primary ring-1 ring-primary/10">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-outline">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-6 font-headline text-lg font-bold text-on-surface">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{desc}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        id="processo"
        className="scroll-mt-16 border-y border-outline-variant bg-surface-container-lowest py-24 md:py-32"
      >
        <div className={container}>
          <SectionHeader
            label={dict.process.label}
            title={dict.process.title}
            subtitle={dict.process.subtitle}
            className="reveal"
          />
          <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {dict.process.steps.map(({ title, desc }, i) => (
              <li key={title} className="reveal relative border-t border-outline-variant pt-6">
                <span aria-hidden="true" className="absolute -top-px left-0 h-px w-10 bg-primary" />
                <span className="font-mono text-xs font-medium text-primary">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-headline text-lg font-bold text-on-surface">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section id="equipe" className="scroll-mt-16 py-24 md:py-32">
        <div className={container}>
          <SectionHeader
            label={dict.team.label}
            title={dict.team.title}
            subtitle={dict.team.subtitle}
            className="reveal"
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {team.map(({ src, name }) => (
              <li key={name} className="reveal group flex items-center gap-5 sm:block">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface-container ring-1 ring-black/5 sm:aspect-[4/5] sm:size-auto sm:rounded-2xl">
                  <Image
                    src={src}
                    alt={name}
                    fill
                    className="object-cover object-top grayscale transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
                    sizes="(max-width: 640px) 80px, 33vw"
                  />
                </div>
                <div className="sm:mt-5">
                  <h3 className="font-headline font-bold text-on-surface">{name}</h3>
                  <p className="mt-1 font-mono text-xs tracking-wider text-on-surface-variant uppercase">
                    {dict.team.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="on-ink relative isolate scroll-mt-16 overflow-hidden bg-ink py-24 md:py-32">
        <div aria-hidden="true" className="bg-grid bg-grid-ink absolute inset-0 -z-10" />
        <div className={`${container} grid items-start gap-14 lg:grid-cols-2 lg:gap-20`}>
          <div className="reveal">
            <Eyebrow onInk>{dict.contact.label}</Eyebrow>
            <h2 className="mt-5 font-headline text-4xl font-extrabold tracking-tight text-balance text-white md:text-5xl">
              {dict.contact.title}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-on-ink-variant">{dict.contact.subtitle}</p>
            <a href="mailto:contato@harpialab.com" className="group mt-10 inline-flex items-center gap-4">
              <span className="flex size-11 items-center justify-center rounded-lg bg-white/5 text-accent ring-1 ring-white/10 transition-colors group-hover:bg-white/10">
                <MailIcon className="size-5" />
              </span>
              <span>
                <span className="block font-mono text-xs tracking-wider text-on-ink-variant uppercase">
                  {dict.contact.emailLabel}
                </span>
                <span className="font-medium text-white underline-offset-4 group-hover:underline">
                  contato@harpialab.com
                </span>
              </span>
            </a>
          </div>
          <div className="reveal rounded-2xl bg-surface p-6 shadow-2xl shadow-black/30 sm:p-8">
            <ContactForm dict={dict.form} />
          </div>
        </div>
      </section>
    </main>
  )
}
