// Envio para o GA4 com consentimento LGPD. Regras: harpia-control-web/docs/ANALYTICS.md
// Só roda no cliente: nada aqui toca `document`/`window` fora das funções.
import type { Locale } from '@/lib/getDictionary'

const ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined
const DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === '1'
export const analyticsEnabled = !!ID

export type Consent = 'granted' | 'denied'
export type Surface = 'consent' | 'app' | 'none' // no site é sempre "consent"

export function readConsent(): Consent | null {
  const m = document.cookie.match(/(?:^|; )hl_consent=(granted|denied)/)
  return (m?.[1] as Consent | undefined) ?? null
}

// .harpialab.com: a escolha feita no site vale no app (e vice-versa). Fora dele (localhost, *.vercel.app), só o host.
function cookieDomain() {
  return location.hostname === 'harpialab.com' || location.hostname.endsWith('.harpialab.com') ? '; Domain=harpialab.com' : ''
}

export function writeConsent(v: Consent) {
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `hl_consent=${v}; Max-Age=31536000; Path=/; SameSite=Lax${cookieDomain()}${secure}`
  const was = active
  apply()
  // aceitou agora: a página atual também conta
  if (!was && active && page.page_location) {
    gtag!('set', page)
    gtag!('event', 'page_view', page)
  }
  emit()
}

/** "Preferências de cookies": apaga a escolha (para de enviar) e o banner volta. */
export function clearConsent() {
  document.cookie = `hl_consent=; Max-Age=0; Path=/${cookieDomain()}`
  document.cookie = 'hl_consent=; Max-Age=0; Path=/'
  apply()
  emit()
}

type Gtag = (...args: unknown[]) => void
let gtag: Gtag | null = null
let surface: Surface = 'consent'
let active = false
let page: Record<string, string> = {}

function load() {
  if (gtag || !ID) return
  const w = window as unknown as { dataLayer: unknown[] }
  w.dataLayer = w.dataLayer || []
  // o gtag.js só entende o objeto `arguments`, não um array
  gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments)
  }
  gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  gtag('js', new Date())
  gtag('config', ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: 34128000,
    ...(DEBUG ? { debug_mode: true } : {}),
  })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`
  document.head.appendChild(s)
}

function apply() {
  const c = readConsent()
  const allowed = !!ID && (surface === 'app' ? c !== 'denied' : surface === 'consent' && c === 'granted')
  // com o gtag.js já carregado, só `consent update denied` não basta: ele segue mandando pings sem cookie
  if (ID) (window as unknown as Record<string, boolean>)[`ga-disable-${ID}`] = !allowed
  if (allowed && !active) {
    load()
    gtag!('consent', 'update', { analytics_storage: 'granted' })
  }
  if (!allowed && active) {
    gtag?.('consent', 'update', { analytics_storage: 'denied' })
    for (const name of document.cookie.split('; ').map((c) => c.split('=')[0]).filter((n) => n.startsWith('_ga'))) {
      // o GA grava no domínio mais alto possível: .harpialab.com, .<host> (*.vercel.app) ou sem domínio (localhost)
      document.cookie = `${name}=; Max-Age=0; Path=/${cookieDomain()}`
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${location.hostname}`
      document.cookie = `${name}=; Max-Age=0; Path=/`
    }
  }
  active = allowed
}

const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
export function utmQuery(search: string) {
  const from = new URLSearchParams(search)
  const out = new URLSearchParams()
  for (const k of UTM) {
    const v = from.get(k)
    if (v) out.set(k, v.slice(0, 100))
  }
  const q = out.toString()
  return q ? `?${q}` : ''
}

// sempre só uma origem: sem page_referrer o gtag.js manda o document.referrer inteiro (com query, também o interno).
// Primeira página: origem do referrer; depois: o próprio site (o `set` acumularia o externo em toda navegação).
let firstPage = true
/** Chamar a cada navegação. No site o template é o próprio pathname (não há ids na URL). */
export function pageview(template: string, nextSurface: Surface) {
  surface = nextSurface
  apply()
  page = { page_location: location.origin + template + utmQuery(location.search), page_title: template }
  const ref = firstPage ? (document.referrer ? new URL(document.referrer).origin : '') : location.origin
  if (ref) page.page_referrer = ref
  firstPage = false
  if (!active) return
  gtag!('set', page) // vale também para o que o gtag.js mandar sozinho
  gtag!('event', 'page_view', page)
}

/** Devolve se o evento foi enviado (false sem consentimento ou sem ID). */
export function track<E extends keyof Events>(name: E, ...params: Events[E] extends undefined ? [] : [Events[E]]) {
  if (active) gtag!('event', name, { ...page, ...params[0] })
  return active
}

// assinatura para React (banner): useSyncExternalStore(subscribeConsent, bannerVisible)
const listeners = new Set<() => void>()
function emit() {
  listeners.forEach((l) => l())
}
export function subscribeConsent(l: () => void) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
export const bannerVisible = () => !!ID && surface === 'consent' && readConsent() === null

// Âncoras da home (Navbar, Footer e section_viewed)
export const sectionIds = ['produtos', 'servicos', 'processo', 'equipe', 'contato'] as const
export type SectionId = (typeof sectionIds)[number]

export type CtaId = 'contact' | 'how_we_work' | 'control' | 'fellows' | 'email' | 'whatsapp'
export type CtaLocation = 'navbar' | 'hero' | 'products' | 'contact' | 'footer'

export type Events = {
  // Qual chamada (e de qual lugar da página) leva ao contato, ao Control, ao Fellows, ao e-mail ou ao WhatsApp?
  cta_clicked: { cta_id: CtaId; location: CtaLocation }
  // Até onde as pessoas descem na home: quais seções chegam a ser vistas?
  section_viewed: { section_id: SectionId }
  // Quantas visitas viram contato pelo formulário (envio com resposta ok)?
  generate_lead: undefined
  // Quantas pessoas trocam de idioma, e para qual?
  language_switched: { to: Locale }
}
