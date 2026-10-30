import { TrackedLink } from '@/components/Analytics'
import ContactForm from '@/components/ContactForm'
import ControlMockup from '@/components/ControlMockup'
import FellowsCard from '@/components/FellowsCard'
import PdvMockup from '@/components/PdvMockup'
import { ControlMark, FellowsMark, PdvMark } from '@/components/ProductMarks'
import SectionHeader from '@/components/SectionHeader'
import Link from 'next/link'
import { ArrowUpRightIcon, ChatIcon, CheckIcon, MailIcon } from '@/components/icons'
import type { CtaId } from '@/lib/analytics'
import { getDictionary } from '@/lib/getDictionary'
import { controlAppUrl, controlUrl, fellowsUrl, pdvUrl } from '@/lib/products'

const container = 'mx-auto max-w-[1200px] px-4 sm:px-6'
const card = 'rounded-[18px] border border-outline-variant bg-surface'
// Painéis de produto na casca da Harpia (mesma fonte, cartão e botão); a cor e a fonte de cada produto ficam só no
// palco da mini tela. No celular: texto, mini tela, botões; no desktop: texto e botões | mini tela.
const panel = 'reveal grid h-full scroll-mt-24 content-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-6 p-5 sm:p-10 ' + card + ' rounded-3xl'
const panelName = 'font-headline text-2xl font-bold tracking-[-0.02em] text-primary'
const panelTagline = 'mt-5 mb-2.5 font-headline text-[1.2rem] leading-[1.3] font-semibold tracking-[-0.015em] text-balance text-on-surface sm:text-[1.35rem]'
const actions = 'flex flex-wrap items-center gap-x-5 gap-y-3 lg:col-start-1 lg:self-start'
// Botão de produto: contorno, para nunca disputar com o "Solicitar orçamento"
const productButton =
  'inline-flex items-center gap-2 rounded-xl border border-outline px-5 py-3 font-semibold text-primary transition-colors hover:border-primary hover:bg-tint'
const stage = 'flex min-w-0 items-center justify-center rounded-2xl px-3 py-6 sm:p-10 lg:col-start-2 lg:row-span-2 lg:row-start-1'

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

  // Cartão "Produtos da casa": marca de cada produto, nome na fonte da Harpia (nada de fonte de produto na dobra)
  const houseProducts = [
    { id: 'pdv', Mark: PdvMark, name: products.pdv.name, short: products.pdv.short },
    { id: 'control', Mark: ControlMark, name: products.name, short: products.short },
    { id: 'fellows', Mark: FellowsMark, name: products.fellows.name, short: products.fellows.short },
  ]

  return (
    <main id="conteudo">
      {/* Hero: pílula em cima; o título e o cartão "Produtos da casa" começam na mesma linha */}
      <section className={`${container} pt-28 pb-16 md:pt-[9.5rem] md:pb-[4.5rem]`}>
        <p className="hero-enter mb-5 inline-block rounded-full bg-tint px-3 py-1 text-[0.9rem] font-semibold text-on-tint">
          {dict.hero.eyebrow}
        </p>
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,2.6fr)_minmax(17.5rem,1fr)]">
          <div className="min-w-0">
            {/* Sem animação de entrada: o h1 é o LCP */}
            <h1 className="font-headline text-[2.6rem] leading-[1.04] font-bold tracking-[-0.035em] text-balance text-primary sm:text-[3.4rem] lg:text-[4.1rem]">
              {dict.hero.title} <span className="text-brand-2">{dict.hero.titleAccent}</span>
            </h1>
            <p
              className="hero-enter mt-6 max-w-[36rem] text-[1.2rem] leading-relaxed text-on-surface-variant"
              style={{ '--enter-delay': '160ms' } as React.CSSProperties}
            >
              {dict.hero.subtitle}
            </p>
            {/* O diferencial: o mesmo time opera software próprio em produção */}
            <p
              className="hero-enter mt-4 max-w-[36rem] text-[1.05rem] leading-relaxed font-semibold text-balance text-on-surface"
              style={{ '--enter-delay': '200ms' } as React.CSSProperties}
            >
              {dict.hero.proof}
            </p>
            {/* Celular: as marcas dos produtos logo abaixo, no lugar do cartão lateral (que só aparece no desktop) */}
            <ul aria-label={dict.hero.productsLabel} className="hero-enter mt-4 flex flex-wrap gap-2 lg:hidden">
              {houseProducts.map(({ id, Mark, name }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="flex min-h-11 items-center gap-2 rounded-full border border-outline-variant bg-surface py-1.5 pr-3.5 pl-1.5 text-[0.95rem] font-semibold text-on-surface"
                  >
                    <Mark className="size-7" />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
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
            className={`hero-enter hidden min-w-0 px-5 pt-4 pb-2 lg:block ${card}`}
            style={{ '--enter-delay': '200ms' } as React.CSSProperties}
          >
            <p className="mb-1.5 text-[0.9rem] font-semibold text-muted">{dict.hero.productsTitle}</p>
            <ul className="divide-y divide-surface-container">
              {houseProducts.map(({ id, Mark, name, short }) => (
                <li key={id}>
                  <a href={`#${id}`} className="group flex items-center gap-3 py-3 text-on-surface">
                    <Mark className="size-8" />
                    <span className="leading-snug">
                      <span className="block font-headline font-semibold group-hover:underline">{name}</span>
                      <span className="block text-[0.9rem] text-muted">{short}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Services: três colunas abertas, cada uma diz quando escolher aquele formato */}
      <section id="servicos" className="scroll-mt-16">
        <div className={`${container} pt-12 pb-[4.5rem]`}>
          <SectionHeader title={dict.services.title} subtitle={dict.services.subtitle} className="reveal" />
          <ul className="reveal mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-10 gap-y-8">
            {dict.services.items.map(({ title, when, desc }) => (
              <li key={title} className="border-t-2 border-primary pt-5">
                <h3 className="font-headline text-[1.3rem] font-semibold tracking-[-0.02em] text-primary">{title}</h3>
                <p className="mt-1.5 mb-3 font-semibold text-brand-2">{when}</p>
                <p className="text-on-surface-variant">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Products: os três painéis com a mesma estrutura e altura (marca + nome, frase, texto, botões | mini tela),
          ordem PDV, Control, Fellows. A identidade de cada produto fica só no palco da mini tela. */}
      <section id="produtos" className="scroll-mt-16">
        <div className={`${container} pt-4 pb-[4.5rem]`}>
          <SectionHeader title={products.title} subtitle={products.subtitle} className="reveal" />

          <div className="mt-10 grid gap-6 lg:auto-rows-fr">
            <article id="pdv" className={panel}>
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <PdvMark />
                  <h3 className={panelName}>{products.pdv.name}</h3>
                </div>
                <p className={panelTagline}>{products.pdv.tagline}</p>
                <p className="text-on-surface-variant">{products.pdv.desc}</p>
              </div>
              {/* Harpia PDV: lavanda (pdv-website) */}
              <div className={`${stage} bg-pdv-bg`}>
                <PdvMockup dict={products.pdv.mockup} />
              </div>
              <div className={actions}>
                <TrackedLink cta="pdv" location="products" href={pdvUrl} className={productButton}>
                  {products.pdv.cta}
                  <ArrowUpRightIcon className="size-4" />
                </TrackedLink>
              </div>
            </article>

            <article id="control" className={panel}>
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <ControlMark />
                  <h3 className={panelName}>{products.name}</h3>
                </div>
                <p className={panelTagline}>{products.tagline}</p>
                <p className="text-on-surface-variant">{products.desc}</p>
              </div>
              {/* Harpia Control: tema escuro do Control (paleta Altitude) */}
              <div className={`${stage} bg-ink`}>
                <ControlMockup locale={locale} dict={products.mockup} />
              </div>
              <div className={actions}>
                <TrackedLink cta="control" location="products" href={controlUrl} className={productButton}>
                  {products.cta}
                  <ArrowUpRightIcon className="size-4" />
                </TrackedLink>
                <TrackedLink
                  cta="control_login"
                  location="products"
                  href={controlAppUrl}
                  className="inline-flex min-h-11 items-center text-[0.95rem] font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
                >
                  {products.ctaLogin}
                </TrackedLink>
              </div>
            </article>

            <article id="fellows" className={panel}>
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <FellowsMark />
                  <h3 className={panelName}>{products.fellows.name}</h3>
                </div>
                <p className={panelTagline}>{products.fellows.tagline}</p>
                <p className="text-on-surface-variant">{products.fellows.desc}</p>
              </div>
              {/* Fellows: claro + cobalto + lima (fellows-website/DESIGN.md) */}
              <div className={`${stage} bg-fellows-bg`}>
                <FellowsCard dict={products.fellows.card} />
              </div>
              <div className={actions}>
                <TrackedLink cta="fellows" location="products" href={fellowsUrl} className={productButton}>
                  {products.fellows.cta}
                  <ArrowUpRightIcon className="size-4" />
                </TrackedLink>
                <span className="text-[0.95rem] text-muted">{products.fellows.stores}</span>
              </div>
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

      {/* Contact */}
      <section id="contato" className="scroll-mt-16">
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
            <p className="mt-5 border-t border-outline-variant pt-4 text-sm text-muted">
              {dict.form.privacy}{' '}
              <Link href={`/${locale}/privacidade`} className="font-medium text-primary underline underline-offset-4 hover:text-primary-hover">
                {dict.form.privacyLink}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
