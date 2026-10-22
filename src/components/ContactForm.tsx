'use client'

import { useState } from 'react'
import { ArrowRightIcon, CheckIcon } from '@/components/icons'
import { track } from '@/lib/analytics'
import type { Dictionary } from '@/lib/getDictionary'

type FormState = 'idle' | 'loading' | 'success' | 'error'
type Field = 'name' | 'email' | 'message'
type FieldErrors = Partial<Record<Field, string>>

// Mesmas regras e limites de /api/contato
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const maxLength: Record<Field, number> = { name: 200, email: 254, message: 5000 }

interface ContactFormProps {
  dict: Dictionary['form']
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  // Códigos de /api/contato que apontam para um campo
  const serverFieldErrors: Record<string, [Field, string]> = {
    name_too_long: ['name', dict.errors.nameTooLong],
    invalid_email: ['email', dict.errors.emailInvalid],
    message_too_long: ['message', dict.errors.messageTooLong],
  }

  function showFieldErrors(form: HTMLFormElement, errors: FieldErrors) {
    setFieldErrors(errors)
    const first = (['name', 'email', 'message'] as const).find((f) => errors[f])
    if (first) (form.elements.namedItem(first) as HTMLElement).focus()
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const value = (f: Field) => (form.elements.namedItem(f) as HTMLInputElement).value.trim()
    const data = {
      name: value('name'),
      email: value('email'),
      message: value('message'),
      website: (form.elements.namedItem('website') as HTMLInputElement).value,
    }

    const errors: FieldErrors = {}
    if (!data.name) errors.name = dict.errors.nameRequired
    if (!data.email) errors.email = dict.errors.emailRequired
    else if (!emailRegex.test(data.email)) errors.email = dict.errors.emailInvalid
    if (!data.message) errors.message = dict.errors.messageRequired
    if (Object.keys(errors).length) return showFieldErrors(form, errors)

    setState('loading')
    setErrorMsg('')
    setFieldErrors({})

    // 5xx, HTML da plataforma e falha de rede caem em dict.error
    let msg = dict.error
    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        track('generate_lead') // nenhum campo do formulário vai para o GA
        return setState('success')
      }
      if (res.status === 429) {
        msg = dict.rateLimited
      } else if (res.status < 500) {
        const json = await res.json().catch(() => null)
        const fieldError = serverFieldErrors[json?.error]
        if (fieldError) {
          setState('idle')
          return showFieldErrors(form, { [fieldError[0]]: fieldError[1] })
        }
      }
    } catch {}
    setState('error')
    setErrorMsg(msg)
  }

  // Corrigiu o campo: o erro dele sai
  function handleInput(e: React.FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name as Field
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  if (state === 'success') {
    return (
      <div role="status" className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-ok/10 text-ok ring-1 ring-ok/15">
          <CheckIcon className="size-6" />
        </div>
        <p className="max-w-sm text-on-surface">{dict.success}</p>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-lg border border-outline bg-surface-container-lowest px-4 py-3 text-base text-on-surface placeholder:text-outline transition-colors focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/20 focus:outline-none aria-invalid:border-error aria-invalid:focus:ring-error/20 sm:text-sm'

  // Propriedades comuns de cada campo: limite, estado de erro e ligação com a mensagem
  const fieldProps = (f: Field) => ({
    id: f,
    name: f,
    required: true,
    maxLength: maxLength[f],
    'aria-invalid': fieldErrors[f] ? true : undefined,
    'aria-describedby': fieldErrors[f] ? `${f}-error` : undefined,
    className: inputClass,
  })

  const fieldError = (f: Field) =>
    fieldErrors[f] && (
      <p id={`${f}-error`} className="mt-2 text-sm text-error">
        {fieldErrors[f]}
      </p>
    )

  return (
    <form
      method="post"
      action="/api/contato"
      noValidate
      onSubmit={handleSubmit}
      onInput={handleInput}
      className="relative flex flex-col gap-5"
    >
      {/* Honeypot: fora da tela e da ordem de tabulação; só bots preenchem. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" data-bwignore />
      </div>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-on-surface">
          {dict.name}
        </label>
        <input {...fieldProps('name')} type="text" autoComplete="name" placeholder={dict.namePlaceholder} />
        {fieldError('name')}
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-on-surface">
          {dict.email}
        </label>
        <input {...fieldProps('email')} type="email" autoComplete="email" placeholder={dict.emailPlaceholder} />
        {fieldError('email')}
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-on-surface">
          {dict.message}
        </label>
        <textarea {...fieldProps('message')} rows={5} placeholder={dict.messagePlaceholder} className={`${inputClass} resize-none`} />
        {fieldError('message')}
      </div>

      {state === 'error' && (
        <p role="alert" className="text-sm text-error">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="btn-shine group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-cta py-3.5 text-sm font-semibold text-on-cta transition hover:shadow-lg hover:shadow-cta/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === 'loading' ? dict.sending : dict.submit}
        {state !== 'loading' && (
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
      <p className="-mt-1 text-center text-sm text-on-surface-variant">{dict.nextStep}</p>
    </form>
  )
}
