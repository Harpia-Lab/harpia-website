'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error ?? 'Erro ao enviar mensagem.')
      }
      setState('success')
    } catch (err: unknown) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erro desconhecido.')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <span className="material-symbols-outlined text-primary text-6xl">
          check_circle
        </span>
        <h3 className="text-2xl font-headline font-bold text-on-surface">
          Mensagem enviada!
        </h3>
        <p className="text-on-surface-variant max-w-sm">
          Recebemos sua solicitação. Nossa equipe entrará em contato em até 24h.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-headline font-bold text-slate-500 uppercase tracking-wider block">
            Nome Completo
          </label>
          <input
            name="name"
            required
            type="text"
            placeholder="Ex: João Silva"
            className="w-full bg-surface-container-highest text-on-surface p-4 rounded-md outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-headline font-bold text-slate-500 uppercase tracking-wider block">
            E-mail Profissional
          </label>
          <input
            name="email"
            required
            type="email"
            placeholder="nome@empresa.com.br"
            className="w-full bg-surface-container-highest text-on-surface p-4 rounded-md outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-headline font-bold text-slate-500 uppercase tracking-wider block">
          Empresa / Organização
        </label>
        <input
          name="company"
          type="text"
          placeholder="Nome da sua empresa"
          className="w-full bg-surface-container-highest text-on-surface p-4 rounded-md outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-headline font-bold text-slate-500 uppercase tracking-wider block">
          Descrição do Projeto
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Conte-nos sobre seus objetivos, desafios e prazos esperados..."
          className="w-full bg-surface-container-highest text-on-surface p-4 rounded-md outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
        />
      </div>

      {state === 'error' && (
        <p className="text-error text-sm">{errorMsg}</p>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary font-headline font-extrabold rounded-md shadow-[0_10px_30px_rgba(0,218,243,0.15)] hover:shadow-[0_10px_40px_rgba(0,218,243,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {state === 'loading' ? (
            <>
              <span className="material-symbols-outlined animate-spin text-lg">
                progress_activity
              </span>
              Enviando...
            </>
          ) : (
            <>
              Enviar Solicitação
              <span className="material-symbols-outlined text-lg">
                rocket_launch
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
