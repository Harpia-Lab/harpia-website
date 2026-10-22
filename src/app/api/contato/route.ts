import { Resend } from 'resend'

const toEmail = process.env.CONTACT_TO_EMAIL

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// O front traduz o código pelo dicionário do idioma da página
type ErrorCode = 'invalid_body' | 'missing_fields' | 'name_too_long' | 'invalid_email' | 'message_too_long' | 'rate_limited' | 'server'
const fail = (error: ErrorCode, status = 400) => Response.json({ error }, { status })

// ponytail: rate limit em memória, por instância serverless (cada instância/região tem o
// seu Map e ele zera no cold start). Segura rajadas de um mesmo IP, não abuso distribuído;
// se isso importar, Vercel Firewall (rate limit rule) ou BotID na rota.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const MAX_KEYS = 1000
const hits = new Map<string, { count: number; resetAt: number }>()

function rateLimited(ip: string) {
  const now = Date.now()
  const entry = hits.get(ip)
  if (entry && entry.resetAt > now) {
    entry.count++
    return entry.count > MAX_PER_WINDOW
  }
  if (hits.size >= MAX_KEYS) {
    for (const [key, e] of hits) if (e.resetAt <= now) hits.delete(key)
    // Map mantém ordem de inserção: descarta a chave mais antiga em vez de zerar todo mundo.
    if (hits.size >= MAX_KEYS) hits.delete(hits.keys().next().value!)
  }
  hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
  return false
}

export async function POST(req: Request) {
  // Na Vercel x-real-ip e x-forwarded-for são sobrescritos pela plataforma com o IP do cliente
  // (um único IP). Fora da Vercel podem ser forjados.
  const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'

  let body: { name?: unknown; email?: unknown; message?: unknown; website?: unknown }
  try {
    // ponytail: form-urlencoded é o envio nativo do <form method="post"> (sem JS); a resposta continua JSON
    body = req.headers.get('content-type')?.includes('application/x-www-form-urlencoded')
      ? Object.fromEntries(await req.formData())
      : await req.json()
  } catch {
    return fail('invalid_body')
  }

  const { name, email, message, website } = body

  // Honeypot: campo invisível para humanos; bot que preenche recebe sucesso falso.
  if (website) {
    console.warn('contato: honeypot preenchido, descartado')
    return Response.json({ ok: true })
  }

  const nameStr = String(name ?? '').trim()
  const emailStr = String(email ?? '').trim()
  const messageStr = String(message ?? '').trim()

  if (!nameStr || !emailStr || !messageStr) return fail('missing_fields')
  if (nameStr.length > 200) return fail('name_too_long')
  if (!emailRegex.test(emailStr) || emailStr.length > 254) return fail('invalid_email')
  if (messageStr.length > 5000) return fail('message_too_long')

  // Depois da validação: corrigir um campo não gasta tentativa; só envio válido conta
  if (rateLimited(ip)) return fail('rate_limited', 429)

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || !toEmail) {
    console.error('contato: RESEND_API_KEY ou CONTACT_TO_EMAIL não configurado')
    return fail('server', 500)
  }
  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    // Remetente de teste do Resend até o domínio ser verificado (CONTACT_FROM_EMAIL)
    from: process.env.CONTACT_FROM_EMAIL || 'Harpia Lab <onboarding@resend.dev>',
    to: toEmail,
    replyTo: emailStr,
    subject: `Novo contato: ${escapeHtml(nameStr)}`,
    html: `
      <h2>Novo contato via site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nameStr)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(emailStr)}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${escapeHtml(messageStr).replace(/\n/g, '<br>')}</p>
    `,
  })

  if (error) {
    console.error('contato: falha no Resend', error)
    return fail('server', 500)
  }

  return Response.json({ ok: true })
}
