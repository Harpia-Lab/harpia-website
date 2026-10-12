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

const GENERIC_ERROR = 'Não foi possível enviar. Tente novamente mais tarde.'

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
  if (rateLimited(ip)) {
    return Response.json({ error: 'Muitas tentativas. Tente novamente mais tarde.' }, { status: 429 })
  }

  let body: { name?: unknown; email?: unknown; message?: unknown; website?: unknown }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Corpo da requisição inválido.' }, { status: 400 })
  }

  const { name, email, message, website } = body

  // Honeypot: campo invisível para humanos; bot que preenche recebe sucesso falso.
  if (website) {
    console.warn('contato: honeypot preenchido, descartado')
    return Response.json({ ok: true })
  }

  if (!name || !email || !message) {
    return Response.json({ error: 'Campos obrigatórios faltando.' }, { status: 400 })
  }

  const nameStr = String(name)
  const emailStr = String(email)
  const messageStr = String(message)

  if (nameStr.length > 200) {
    return Response.json({ error: 'Nome muito longo (máx. 200 caracteres).' }, { status: 400 })
  }

  if (!emailRegex.test(emailStr) || emailStr.length > 254) {
    return Response.json({ error: 'E-mail inválido.' }, { status: 400 })
  }

  if (messageStr.length > 5000) {
    return Response.json({ error: 'Mensagem muito longa (máx. 5000 caracteres).' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || !toEmail) {
    console.error('contato: RESEND_API_KEY ou CONTACT_TO_EMAIL não configurado')
    return Response.json({ error: GENERIC_ERROR }, { status: 500 })
  }
  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: 'Harpia Lab <onboarding@resend.dev>',
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
    return Response.json({ error: GENERIC_ERROR }, { status: 500 })
  }

  return Response.json({ ok: true })
}
