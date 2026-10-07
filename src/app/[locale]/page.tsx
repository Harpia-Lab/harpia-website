import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import HeroTerminal from '@/components/HeroTerminal'
import SectionHeader, { Eyebrow } from '@/components/SectionHeader'
import Spotlight from '@/components/Spotlight'
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

// Cantos externos da grade de serviços (1 coluna no mobile, 2×2 a partir de sm)
const serviceCorners = [
  'rounded-t-[19px] sm:rounded-tr-none',
  'sm:rounded-tr-[19px]',
  'sm:rounded-bl-[19px]',
  'rounded-b-[19px] sm:rounded-bl-none',
]

const container = 'mx-auto max-w-6xl px-6 lg:px-8'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <main>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="aurora aurora-a -top-24 -right-24 size-[18rem] bg-brand/10 lg:-top-32 lg:size-[34rem] lg:bg-brand/14" />
          <div className="aurora aurora-b top-1/3 right-1/4 hidden size-[24rem] bg-brand-2/14 lg:block" />
          <div className="bg-grid absolute inset-0" />
        </div>
        <div className={`${container} grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14`}>
          <div>
            <Eyebrow className="hero-enter">{dict.hero.badge}</Eyebrow>
            <h1
              className="hero-enter mt-6 font-headline text-[2.6rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-on-surface sm:text-6xl lg:text-[3.75rem]"
              style={{ '--enter-delay': '80ms' } as React.CSSProperties}
            >
              {dict.hero.title} <span className="text-gradient">{dict.hero.titleAccent}</span>
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
                className="btn-shine group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-on-primary shadow-lg shadow-primary/20 transition hover:shadow-xl hover:shadow-brand/30"
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
                  <CheckIcon className="size-4 text-brand" />
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
          <Spotlight className="reveal grid gap-px overflow-hidden rounded-2xl bg-outline-variant p-px sm:grid-cols-2">
            {dict.services.items.map(({ title, desc }, i) => {
              const Icon = serviceIcons[i]
              return (
                <article key={title} className={`group/card relative bg-surface p-7 sm:p-8 ${serviceCorners[i]}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/[0.06] text-primary ring-1 ring-primary/10 transition duration-300 group-hover/card:-translate-y-0.5 group-hover/card:bg-brand group-hover/card:text-white group-hover/card:shadow-lg group-hover/card:ring-brand group-hover/card:shadow-brand/30">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-outline transition-colors duration-300 group-hover/card:text-brand">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 font-headline text-lg font-bold text-on-surface">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{desc}</p>
                </article>
              )
            })}
          </Spotlight>
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
                {/* Cada trecho se preenche um pouco depois do anterior */}
                <span
                  aria-hidden="true"
                  className="step-fill absolute -top-px left-0 h-0.5 bg-linear-to-r from-brand to-brand-2"
                  style={{ animationRange: `cover ${16 + i * 7}% cover ${28 + i * 7}%` }}
                />
                <span className="font-mono text-xs font-medium text-brand">{String(i + 1).padStart(2, '0')}</span>
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
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface-container ring-1 ring-black/5 transition duration-500 group-hover:ring-brand/40 sm:aspect-[4/5] sm:size-auto sm:rounded-2xl sm:group-hover:-translate-y-1 sm:group-hover:shadow-2xl sm:group-hover:shadow-brand/20">
                  <Image
                    src={src}
                    alt={name}
                    fill
                    className="object-cover object-top grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
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
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="aurora aurora-b -top-40 -left-32 size-[30rem] bg-brand/25" />
          <div className="bg-grid bg-grid-ink absolute inset-0" />
        </div>
        <div className={`${container} grid items-start gap-14 lg:grid-cols-2 lg:gap-20`}>
          <div className="reveal">
            <Eyebrow onInk>{dict.contact.label}</Eyebrow>
            <h2 className="mt-5 font-headline text-4xl font-extrabold tracking-tight text-balance text-white md:text-5xl">
              {dict.contact.title}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-on-ink-variant">{dict.contact.subtitle}</p>
            <a href="mailto:contato@harpialab.com" className="group mt-10 inline-flex items-center gap-4">
              <span className="flex size-11 items-center justify-center rounded-lg bg-white/5 text-accent ring-1 ring-white/10 transition-colors group-hover:bg-white/10 group-hover:ring-accent/40">
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
          <div className="reveal relative">
            <div
              aria-hidden="true"
              className="aurora aurora-a -inset-6 -z-10 bg-linear-to-br from-brand/45 to-brand-2/30"
            />
            <div className="glow-border shadow-2xl shadow-black/40">
              <div className="bg-surface p-6 sm:p-8">
                <ContactForm dict={dict.form} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
