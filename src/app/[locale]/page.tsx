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
// Botão de produto: contorno, para nunca disputar com o "Pedir orçamento"
const productButton =
  'inline-flex items-center gap-2 rounded-full border-[1.5px] border-outline px-5 py-3 font-semibold text-primary transition-colors hover:border-primary hover:bg-tint'
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

  // Faixa "Produtos da casa" logo abaixo do topo: marca, nome e uma linha de cada produto (ordem PDV, Control, Fellows)
  const houseProducts = [
    { id: 'pdv', Mark: PdvMark, name: products.pdv.name, short: products.pdv.short },
    { id: 'control', Mark: ControlMark, name: products.name, short: products.short },
    { id: 'fellows', Mark: FellowsMark, name: products.fellows.name, short: products.fellows.short },
  ]

  return (
    <main id="conteudo">
      {/* Hero: bloco azul Harpia de ponta a ponta (a barra do topo é a mesma cor); o Curioso no arco branco,
          tamanho médio, apoiado na borda de baixo */}
      <section className="on-navy bg-primary text-on-navy">
        <div className={`${container} grid items-end gap-x-12 pt-[7rem] md:pt-[8.5rem] lg:grid-cols-[minmax(0,1fr)_auto]`}>
          <div className="min-w-0 pb-12 md:pb-20">
            {/* Sem animação de entrada: o h1 é o LCP */}
            <h1 className="font-headline text-[2.5rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance sm:text-[3.2rem] lg:text-[3.7rem]">
              {dict.hero.title} <span className="text-sky">{dict.hero.titleAccent}</span>
            </h1>
            <p
              className="hero-enter mt-6 max-w-[34rem] text-[1.2rem] leading-relaxed text-on-navy-muted"
              style={{ '--enter-delay': '160ms' } as React.CSSProperties}
            >
              {dict.hero.subtitle}
            </p>
            {/* O diferencial: o mesmo time opera software próprio em produção */}
            <p
              className="hero-enter mt-4 max-w-[34rem] text-[1.05rem] leading-relaxed font-semibold text-balance"
              style={{ '--enter-delay': '200ms' } as React.CSSProperties}
            >
              {dict.hero.proof}
            </p>
            <div
              className="hero-enter mt-8 flex flex-wrap items-center gap-4"
              style={{ '--enter-delay': '240ms' } as React.CSSProperties}
            >
              <TrackedLink
                cta="contact"
                location="hero"
                href="#contato"
                className="rounded-full bg-white px-6 py-3.5 font-semibold text-primary transition-colors hover:bg-tint"
              >
                {dict.hero.ctaPrimary}
              </TrackedLink>
              <TrackedLink
                cta="how_we_work"
                location="hero"
                href="#processo"
                className="rounded-full border-[1.5px] border-navy-line px-6 py-3.5 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                {dict.hero.ctaSecondary}
              </TrackedLink>
            </div>
            <ul
              className="hero-enter mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-on-navy-muted"
              style={{ '--enter-delay': '320ms' } as React.CSSProperties}
            >
              {dict.hero.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-sky" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Arco branco com o mascote: tamanho médio, nunca o protagonista */}
          <div aria-hidden="true" className="flex justify-center lg:justify-end">
            <div className="flex aspect-[1/0.86] w-52 items-end justify-center overflow-hidden rounded-t-full bg-white sm:w-60 lg:w-[17rem]">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG pequeno, next/image não otimiza SVG */}
              <img src="/brand/curioso.svg" alt="" width={190} height={190} className="-mb-[3%] w-[70%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Faixa "Produtos da casa": leva aos painéis */}
      <nav aria-label={dict.hero.productsLabel} className={container}>
        <div className="flex flex-col gap-3 border-b border-outline-variant py-5 lg:flex-row lg:items-center lg:gap-10">
          <p className="shrink-0 text-[0.8rem] font-semibold tracking-[0.12em] text-muted uppercase">{dict.hero.productsTitle}</p>
          <ul className="grid flex-1 gap-1 sm:grid-cols-3 sm:gap-6">
            {houseProducts.map(({ id, Mark, name, short }) => (
              <li key={id} className="min-w-0">
                <a href={`#${id}`} className="group flex min-h-11 items-center gap-3 py-1.5">
                  <Mark className="size-9" />
                  <span className="min-w-0 leading-snug">
                    <span className="block font-headline font-semibold text-primary group-hover:underline">{name}</span>
                    <span className="block text-[0.9rem] text-muted">{short}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Services: cartões claros, cada um diz quando escolher aquele formato */}
      <section id="servicos" className="scroll-mt-20">
        <div className={`${container} py-[4.5rem]`}>
          <SectionHeader title={dict.services.title} subtitle={dict.services.subtitle} className="reveal" />
          <ul className="reveal mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-6">
            {dict.services.items.map(({ title, when, desc }) => (
              <li key={title} className="rounded-[18px] border border-outline-variant bg-band p-7">
                <span aria-hidden="true" className="block h-1.5 w-10 rounded-full bg-brand-2" />
                <h3 className="mt-4 font-headline text-[1.3rem] font-semibold tracking-[-0.02em] text-primary">{title}</h3>
                <p className="mt-1.5 mb-3 font-semibold text-brand-2">{when}</p>
                <p className="text-on-surface-variant">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Products: os três painéis com a mesma estrutura e altura (marca + nome, frase, texto, botões | mini tela),
          ordem PDV, Control, Fellows. A identidade de cada produto fica só no palco da mini tela. */}
      <section id="produtos" className="scroll-mt-20 border-y border-outline-variant bg-band">
        <div className={`${container} py-[4.5rem]`}>
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

      {/* Process: régua azul de 3px em cima de cada etapa, número pequeno em azul médio */}
      <section id="processo" className="scroll-mt-20">
        <div className={`${container} py-[4.5rem]`}>
          <SectionHeader title={dict.process.title} subtitle={dict.process.subtitle} className="reveal" />
          <ol className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-8">
            {dict.process.steps.map(({ title, desc }, i) => (
              <li key={title} className="reveal border-t-[3px] border-primary pt-5">
                <span aria-hidden="true" className="font-headline font-extrabold text-brand-2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1.5 mb-1.5 font-headline text-[1.15rem] font-semibold tracking-[-0.02em] text-primary">{title}</h3>
                <p className="text-[0.97rem] text-on-surface-variant">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact: bloco azul arredondado com o Curioso no círculo branco; o formulário num cartão branco */}
      <section id="contato" className="scroll-mt-20">
        <div className={`${container} pb-[4.5rem]`}>
          <div className="on-navy reveal grid items-start gap-10 rounded-[28px] bg-primary p-5 text-on-navy sm:p-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:p-12">
            <div className="min-w-0">
              <span aria-hidden="true" className="grid size-24 place-items-center rounded-full bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG pequeno, next/image não otimiza SVG */}
                <img src="/brand/curioso.svg" alt="" width={76} height={76} className="size-[4.75rem]" loading="lazy" />
              </span>
              <h2 className="mt-6 font-headline text-[2rem] leading-[1.15] font-bold tracking-[-0.02em] text-balance md:text-[2.2rem]">
                {dict.contact.title}
              </h2>
              <p className="mt-3 max-w-md text-on-navy-muted">{dict.contact.subtitle}</p>
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
                      <span className="grid size-10 place-items-center rounded-full bg-white/10 text-white">
                        <Icon className="size-5" strokeWidth={2} />
                      </span>
                      <span>
                        <span className="block text-sm text-on-navy-muted">{label}</span>
                        <span className="font-semibold text-white underline-offset-4 group-hover:underline">{value}</span>
                      </span>
                    </TrackedLink>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[0.95rem] text-on-navy-muted">{dict.contact.location}</p>
            </div>
            <div className={`on-light min-w-0 p-5 text-on-surface sm:p-8 ${card}`}>
              <ContactForm dict={dict.form} />
              <p className="mt-5 border-t border-outline-variant pt-4 text-sm text-muted">
                {dict.form.privacy}{' '}
                <Link href={`/${locale}/privacidade`} className="font-medium text-primary underline underline-offset-4 hover:text-primary-hover">
                  {dict.form.privacyLink}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
