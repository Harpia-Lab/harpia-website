import Image from 'next/image'
import { TrackedLink } from '@/components/Analytics'
import ContactForm from '@/components/ContactForm'
import ControlMockup from '@/components/ControlMockup'
import HeroTerminal from '@/components/HeroTerminal'
import SectionHeader, { Eyebrow } from '@/components/SectionHeader'
import Spotlight from '@/components/Spotlight'
import {
  ArrowRightIcon,
  ChatIcon,
  CheckIcon,
  CompassIcon,
  DevicesIcon,
  LayersIcon,
  MailIcon,
  NodesIcon,
} from '@/components/icons'
import type { CtaId } from '@/lib/analytics'
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

const controlUrl = 'https://control.harpialab.com'

// Só dígitos, com DDI (ex.: 5541999999999). Vazio = sem WhatsApp no contato.
const whatsapp = process.env.WHATSAPP_NUMBER?.replace(/\D/g, '')

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)

  const channels: { cta: CtaId; href: string; label: string; value: string; Icon: typeof MailIcon }[] = [
    { cta: 'email', href: 'mailto:contato@harpialab.com', label: dict.contact.emailLabel, value: 'contato@harpialab.com', Icon: MailIcon },
  ]
  if (whatsapp) {
    const text = encodeURIComponent(dict.contact.whatsappText)
    channels.push({ cta: 'whatsapp', href: `https://wa.me/${whatsapp}?text=${text}`, label: 'WhatsApp', value: dict.contact.whatsappAction, Icon: ChatIcon })
  }

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
              {dict.hero.title} <span className="text-primary">{dict.hero.titleAccent}</span>
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
              <TrackedLink
                cta="contact"
                location="hero"
                href="#contato"
                className="btn-shine group inline-flex items-center gap-2 rounded-lg bg-cta px-6 py-3.5 text-sm font-semibold text-on-cta shadow-lg shadow-cta/20 transition hover:shadow-xl hover:shadow-cta/30"
              >
                {dict.hero.ctaPrimary}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </TrackedLink>
              <TrackedLink
                cta="how_we_work"
                location="hero"
                href="#processo"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <span className="underline-offset-4 group-hover:underline">{dict.hero.ctaSecondary}</span>
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </TrackedLink>
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
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/[0.06] text-primary ring-1 ring-primary/10 transition duration-300 group-hover/card:-translate-y-0.5 group-hover/card:bg-brand group-hover/card:text-on-primary group-hover/card:shadow-lg group-hover/card:ring-brand group-hover/card:shadow-brand/30">
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

      {/* Products */}
      <section id="produtos" className="on-ink relative isolate scroll-mt-16 overflow-hidden bg-ink py-24 md:py-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="aurora aurora-a -right-40 -bottom-40 size-[28rem] bg-accent/10" />
          <div className="bg-grid bg-grid-ink absolute inset-0" />
        </div>
        <div className={`${container} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
          <div className="reveal">
            <Eyebrow onInk>{dict.products.label}</Eyebrow>
            <h2 className="mt-5 font-headline text-3xl font-extrabold tracking-tight text-balance text-on-ink md:text-[2.5rem] md:leading-[1.1]">
              {dict.products.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-on-ink-variant">{dict.products.subtitle}</p>

            <div className="mt-10 border-t border-ink-line pt-8">
              <h3 className="font-headline text-2xl font-bold text-on-ink">{dict.products.name}</h3>
              <p className="mt-2 font-medium text-accent">{dict.products.tagline}</p>
              <p className="mt-3 max-w-xl leading-relaxed text-on-ink-variant">{dict.products.desc}</p>
              <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {dict.products.benefits.map(({ title, desc }) => (
                  <li key={title} className="flex gap-3">
                    <CheckIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                    <span>
                      <span className="block font-semibold text-on-ink">{title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-on-ink-variant">{desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <TrackedLink
                cta="control"
                location="products"
                href={controlUrl}
                className="btn-shine group mt-10 inline-flex items-center gap-2 rounded-lg bg-cta-ink px-6 py-3.5 text-sm font-semibold text-on-cta shadow-lg shadow-cta-ink/20 transition hover:shadow-xl hover:shadow-cta-ink/30"
              >
                {dict.products.cta}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </TrackedLink>
            </div>
          </div>
          <div className="reveal">
            <ControlMockup locale={locale} dict={dict.products.mockup} />
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
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface-container ring-1 ring-on-surface/5 transition duration-500 group-hover:ring-brand/40 sm:aspect-[4/5] sm:size-auto sm:rounded-2xl sm:group-hover:-translate-y-1 sm:group-hover:shadow-2xl sm:group-hover:shadow-brand/20">
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
          <div className="aurora aurora-b -top-40 -left-32 size-[30rem] bg-accent/15" />
          <div className="bg-grid bg-grid-ink absolute inset-0" />
        </div>
        <div className={`${container} grid items-start gap-14 lg:grid-cols-2 lg:gap-20`}>
          <div className="reveal">
            <Eyebrow onInk>{dict.contact.label}</Eyebrow>
            <h2 className="mt-5 font-headline text-4xl font-extrabold tracking-tight text-balance text-on-ink md:text-5xl">
              {dict.contact.title}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-on-ink-variant">{dict.contact.subtitle}</p>
            <ul className="mt-10 flex flex-col gap-5">
              {channels.map(({ cta, href, label, value, Icon }) => (
                <li key={cta}>
                  <TrackedLink
                    cta={cta}
                    location="contact"
                    href={href}
                    {...(cta === 'whatsapp' && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group inline-flex items-center gap-4"
                  >
                    <span className="flex size-11 items-center justify-center rounded-lg bg-on-ink/5 text-accent ring-1 ring-on-ink/10 transition-colors group-hover:bg-on-ink/10 group-hover:ring-accent/40">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-mono text-xs tracking-wider text-on-ink-variant uppercase">{label}</span>
                      <span className="font-medium text-on-ink underline-offset-4 group-hover:underline">{value}</span>
                    </span>
                  </TrackedLink>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-on-ink-variant">{dict.contact.location}</p>
          </div>
          <div className="reveal relative">
            <div
              aria-hidden="true"
              className="aurora aurora-a -inset-6 -z-10 bg-linear-to-br from-brand-2/40 to-cta-ink/25"
            />
            <div className="glow-border shadow-2xl shadow-ink/40">
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
