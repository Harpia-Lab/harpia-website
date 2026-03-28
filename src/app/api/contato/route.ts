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

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || !toEmail) {
    return Response.json({ error: 'Serviço de e-mail não configurado.' }, { status: 500 })
  }
  const resend = new Resend(apiKey)

  let body: { name?: unknown; email?: unknown; message?: unknown }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Corpo da requisição inválido.' }, { status: 400 })
  }

  const { name, email, message } = body

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
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true })
}
