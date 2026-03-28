import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, message } = body as {
    name: string
    email: string
    message: string
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Campos obrigatórios faltando.' },
      { status: 400 }
    )
  }

  const { error } = await resend.emails.send({
    from: 'Harpia Lab <onboarding@resend.dev>',
    to: 'tiago.trcz@gmail.com',
    replyTo: email,
    subject: `Novo contato: ${name}`,
    html: `
      <h2>Novo contato via site</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
