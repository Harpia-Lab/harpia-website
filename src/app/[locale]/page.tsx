import Link from 'next/link'
import { TrackedLink } from '@/components/Analytics'
import ContactForm from '@/components/ContactForm'
import ControlMockup from '@/components/ControlMockup'
import FellowsCard from '@/components/FellowsCard'
import PdvMockup from '@/components/PdvMockup'
import { ControlMark, FellowsMark, PdvMark } from '@/components/ProductMarks'
import SectionHeader from '@/components/SectionHeader'
import TeamList from '@/components/TeamList'
import {
  ArrowRightIcon,
  ChatIcon,
  CheckIcon,
  CompassIcon,
  LayersIcon,
  MailIcon,
  PeopleIcon,
} from '@/components/icons'
import type { CtaId } from '@/lib/analytics'
import { getDictionary } from '@/lib/getDictionary'
import { controlUrl, fellowsUrl, pdvUrl } from '@/lib/products'

// Mesma ordem de dict.services.items
const serviceIcons = [LayersIcon, PeopleIcon, CompassIcon]

const container = 'mx-auto max-w-[1200px] px-4 sm:px-6'
const card = 'rounded-[18px] border border-outline-variant bg-surface'

// Só dígitos, com DDI (ex.: 5541999999999). Vazio = sem WhatsApp no contato.
const whatsapp = process.env.WHATSAPP_NUMBER?.replace(/\D/g, '')

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const { products } = dict

  const channels: { cta: CtaId; href: string; label: string; value: string; Icon: typeof MailIcon }[] = [
    { cta: 'email', href: 'mailto:contato@harpialab.com', label: dict.contact.emailLabel, value: 'contato@harpialab.com', Icon: MailIcon },
  ]
  if (whatsapp) {
    const text = encodeURIComponent(dict.contact.whatsappText)
    channels.push({ cta: 'whatsapp', href: `https://wa.me/${whatsapp}?text=${text}`, label: 'WhatsApp', value: dict.contact.whatsappAction, Icon: ChatIcon })
  }

  // Cartão "Produtos da casa": cada produto na fonte dele, ordem PDV, Control, Fellows
  const houseProducts = [
    { id: 'pdv', Mark: PdvMark, name: products.pdv.name, short: products.pdv.short, nameClass: 'font-pdv text-[0.95rem] font-bold uppercase' },
    { id: 'control', Mark: ControlMark, name: products.name, short: products.short, nameClass: 'font-control font-bold' },
    { id: 'fellows', Mark: FellowsMark, name: products.fellows.name, short: products.fellows.short, nameClass: 'font-fellows font-semibold' },
  ]

  return (
    <main id="conteudo">
      {/* Hero */}
      <section className={`${container} grid items-end gap-14 pt-28 pb-16 md:pt-[9.5rem] md:pb-[4.5rem] lg:grid-cols-[minmax(0,2.6fr)_minmax(17.5rem,1fr)]`}>
        <div className="min-w-0">
          <p className="hero-enter mb-5 inline-block rounded-full bg-tint px-3 py-1 text-[0.9rem] font-semibold text-on-tint">
            {dict.hero.eyebrow}
          </p>
          <h1
            className="hero-enter font-headline text-[2.6rem] leading-[1.04] font-bold tracking-[-0.035em] text-balance text-primary sm:text-[3.4rem] lg:text-[4.1rem]"
            style={{ '--enter-delay': '80ms' } as React.CSSProperties}
          >
            {dict.hero.title} <span className="text-brand-2">{dict.hero.titleAccent}</span>
          </h1>
          <p
            className="hero-enter mt-6 max-w-[36rem] text-[1.2rem] leading-relaxed text-on-surface-variant"
            style={{ '--enter-delay': '160ms' } as React.CSSProperties}
          >
            {dict.hero.subtitle}
          </p>
          <div
            className="hero-enter mt-9 flex flex-wrap items-center gap-6"
            style={{ '--enter-delay': '240ms' } as React.CSSProperties}
          >
            <TrackedLink
              cta="contact"
              location="hero"
              href="#contato"
              className="rounded-xl bg-cta px-6 py-4 font-semibold text-on-cta transition-colors hover:bg-primary-hover"
            >
              {dict.hero.ctaPrimary}
            </TrackedLink>
            <TrackedLink
              cta="how_we_work"
              location="hero"
              href="#processo"
              className="font-semibold text-primary underline underline-offset-[0.25em] hover:text-primary-hover"
            >
              {dict.hero.ctaSecondary}
            </TrackedLink>
          </div>
          <ul
            className="hero-enter mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-outline-variant pt-6 text-[0.95rem] text-on-surface-variant"
            style={{ '--enter-delay': '320ms' } as React.CSSProperties}
          >
            {dict.hero.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2">
                <CheckIcon className="size-4 text-brand-2" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <aside
          aria-label={dict.hero.productsLabel}
          className={`hero-enter min-w-0 px-5 pt-4 pb-2 ${card}`}
          style={{ '--enter-delay': '200ms' } as React.CSSProperties}
        >
          <p className="mb-1.5 text-[0.9rem] font-semibold text-muted">{dict.hero.productsTitle}</p>
          <ul className="divide-y divide-surface-container">
            {houseProducts.map(({ id, Mark, name, short, nameClass }) => (
              <li key={id}>
                <a href={`#${id}`} className="group flex items-center gap-3 py-3 text-on-surface">
                  <Mark className="size-8" />
                  <span className="leading-snug">
                    <span className={`block group-hover:underline ${nameClass}`}>{name}</span>
                    <span className="block text-[0.9rem] text-muted">{short}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* Services */}
      <section id="servicos" className="scroll-mt-16">
        <div className={`${container} pt-12 pb-[4.5rem]`}>
          <SectionHeader title={dict.services.title} subtitle={dict.services.subtitle} className="reveal" />
          <ul className="reveal mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
            {dict.services.items.map(({ title, desc }, i) => {
              const Icon = serviceIcons[i]
              return (
                <li key={title} className={`${card} p-7`}>
                  <span className="grid size-10 place-items-center rounded-xl bg-tint text-primary">
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 mb-2 font-headline text-[1.3rem] font-semibold tracking-[-0.02em]">{title}</h3>
                  <p className="text-on-surface-variant">{desc}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Products: cada painel na identidade do próprio produto, ordem PDV, Control, Fellows */}
      <section id="produtos" className="scroll-mt-16">
        <div className={`${container} pt-4 pb-[4.5rem]`}>
          <SectionHeader title={products.title} subtitle={products.subtitle} className="reveal" />

          <div className="mt-10 flex flex-col gap-6">
            {/* Harpia PDV: lavanda + roxo + verde-água, Unbounded + DM Sans (pdv-website) */}
            <article
              id="pdv"
              className="pdv reveal grid scroll-mt-24 items-center gap-10 rounded-3xl bg-pdv-bg p-6 font-pdv-body text-pdv-ink sm:p-10 lg:grid-cols-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-3 rounded-full bg-pdv-teal" />
                  <span className="font-pdv text-xl font-extrabold uppercase">{products.pdv.name}</span>
                </div>
                <h3 className="mt-5 mb-2.5 font-pdv text-[1.35rem] leading-[1.2] font-bold tracking-[-0.01em] text-balance sm:text-[1.6rem]">
                  {products.pdv.tagline}
                </h3>
                <p className="text-pdv-mute">{products.pdv.desc}</p>
                <TrackedLink
                  cta="pdv"
                  location="products"
                  href={pdvUrl}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-pdv-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-pdv-accent-hover"
                >
                  {products.pdv.cta}
                  <ArrowRightIcon className="size-4" />
                </TrackedLink>
              </div>
              <div className="flex min-w-0 justify-center">
                <PdvMockup dict={products.pdv.mockup} />
              </div>
            </article>

            {/* Harpia Control: tema escuro do Control (paleta Altitude), Bricolage + Instrument Sans */}
            <article
              id="control"
              className="on-ink reveal grid scroll-mt-24 items-center gap-10 rounded-3xl bg-ink p-6 font-body text-on-ink sm:p-10 lg:grid-cols-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <ControlMark />
                  <span className="font-control text-2xl font-extrabold tracking-[-0.02em]">{products.name}</span>
                </div>
                <h3 className="mt-5 mb-2.5 font-control text-[1.5rem] leading-[1.15] font-bold tracking-[-0.02em] text-balance sm:text-[1.9rem]">
                  {products.tagline}
                </h3>
                <p className="text-on-ink-variant">{products.desc}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <TrackedLink
                    cta="contact"
                    location="products"
                    href="#contato"
                    className="rounded-[10px] bg-cta-ink px-5 py-3 font-semibold text-on-cta-ink transition hover:brightness-105"
                  >
                    {products.ctaContact}
                  </TrackedLink>
                  <TrackedLink
                    cta="control"
                    location="products"
                    href={controlUrl}
                    className="font-semibold text-accent underline underline-offset-4"
                  >
                    {products.ctaLogin}
                  </TrackedLink>
                </div>
              </div>
              <ControlMockup locale={locale} dict={products.mockup} />
              <ul className="grid gap-x-8 gap-y-5 border-t border-ink-line pt-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                {products.benefits.map(({ title, desc }) => (
                  <li key={title} className="flex gap-3">
                    <CheckIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                    <span>
                      <span className="block font-semibold">{title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-on-ink-variant">{desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Fellows: claro + cobalto + lima, Archivo (fellows-website/DESIGN.md) */}
            <article
              id="fellows"
              className="fellows reveal grid scroll-mt-24 items-center gap-10 rounded-3xl border border-fellows-line bg-fellows-bg p-6 font-fellows text-fellows-ink sm:p-10 lg:grid-cols-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <FellowsMark />
                  <span className="text-2xl font-extrabold tracking-[-0.02em]">{products.fellows.name}</span>
                </div>
                <h3 className="mt-5 mb-2.5 text-[1.5rem] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance sm:text-[1.9rem]">
                  {products.fellows.tagline}
                </h3>
                <p className="text-fellows-mute">{products.fellows.desc}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <TrackedLink
                    cta="fellows"
                    location="products"
                    href={fellowsUrl}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-fellows-accent px-5 py-3 font-semibold text-white transition hover:bg-fellows-accent-hover active:scale-[0.97]"
                  >
                    {products.fellows.cta}
                    <ArrowRightIcon className="size-4" />
                  </TrackedLink>
                  <span className="text-[0.9rem] text-fellows-mute">{products.fellows.stores}</span>
                </div>
              </div>
              <div className="flex min-w-0 justify-center">
                <FellowsCard dict={products.fellows.card} />
              </div>
              <ul className="grid gap-x-8 gap-y-5 border-t border-fellows-line pt-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                {products.fellows.benefits.map(({ title, desc }) => (
                  <li key={title} className="flex gap-3">
                    <CheckIcon className="mt-0.5 size-5 shrink-0 text-fellows-accent" />
                    <span>
                      <span className="block font-semibold">{title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-fellows-mute">{desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="processo" className="scroll-mt-16 bg-band">
        <div className={`${container} py-[4.5rem]`}>
          <SectionHeader title={dict.process.title} subtitle={dict.process.subtitle} className="reveal" />
          <ol className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-8">
            {dict.process.steps.map(({ title, desc }, i) => (
              <li key={title} className="reveal">
                <span
                  aria-hidden="true"
                  className="grid size-10 place-items-center rounded-full bg-primary font-headline font-bold text-on-primary"
                >
                  {i + 1}
                </span>
                <h3 className="mt-3.5 mb-1.5 font-headline text-[1.15rem] font-semibold tracking-[-0.02em]">{title}</h3>
                <p className="text-[0.97rem] text-on-surface-variant">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section id="equipe" className="scroll-mt-16">
        {/* No celular o link vem depois dos nomes; no desktop, embaixo do título */}
        <div className={`${container} grid gap-10 py-[4.5rem] lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-6`}>
          <SectionHeader title={dict.team.title} subtitle={dict.team.subtitle} className="reveal" />
          <TeamList role={dict.team.role} className="reveal lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-2" />
          <Link
            href={`/${locale}/sobre`}
            className="reveal group inline-flex items-center gap-2 self-start justify-self-start font-semibold text-primary"
          >
            <span className="underline underline-offset-4">{dict.team.more}</span>
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="scroll-mt-16 border-t border-outline-variant">
        <div className={`${container} grid items-start gap-12 py-[4.5rem] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]`}>
          <div className="reveal min-w-0">
            <h2 className="font-headline text-[2rem] leading-[1.15] font-bold tracking-[-0.03em] text-balance text-primary md:text-[2.4rem]">
              {dict.contact.title}
            </h2>
            <p className="mt-4 max-w-md text-on-surface-variant">{dict.contact.subtitle}</p>
            <ul className="mt-7 flex flex-col gap-4">
              {channels.map(({ cta, href, label, value, Icon }) => (
                <li key={cta}>
                  <TrackedLink
                    cta={cta}
                    location="contact"
                    href={href}
                    {...(cta === 'whatsapp' && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group inline-flex items-center gap-3"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-tint text-primary">
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="block text-sm text-muted">{label}</span>
                      <span className="font-semibold text-primary underline-offset-4 group-hover:underline">{value}</span>
                    </span>
                  </TrackedLink>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-3 text-[0.95rem] text-muted">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG pequeno, next/image não otimiza SVG */}
              <img src="/brand/curioso.svg" alt="" width={56} height={56} className="size-14" loading="lazy" />
              <span>{dict.contact.location}</span>
            </div>
          </div>
          <div className={`reveal min-w-0 p-5 sm:p-8 ${card}`}>
            <ContactForm dict={dict.form} />
          </div>
        </div>
      </section>
    </main>
  )
}
