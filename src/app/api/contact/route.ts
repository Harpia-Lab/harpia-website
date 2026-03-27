import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  let body: { name?: string; email?: string; company?: string; message?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corpo da requisição inválido.' }, { status: 400 })
  }

  const { name, email, message, company } = body

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Campos obrigatórios ausentes: name, email, message.' },
      { status: 400 }
    )
  }

  try {
    await resend.emails.send({
      from: 'Harpia Lab <onboarding@resend.dev>',
      to:   'contato@harpialab.com',
      subject: `[Site] Nova solicitação de orçamento — ${name}`,
      html: `
        <h2>Nova solicitação de orçamento</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company ?? '—'}</p>
        <hr/>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('[contact/route] Resend error:', err)
    return NextResponse.json(
      { error: 'Falha ao enviar email. Tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}
