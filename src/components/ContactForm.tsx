'use client'

import { useState } from 'react'
import { AlertIcon, ArrowRightIcon, CheckIcon } from '@/components/icons'
import { track } from '@/lib/analytics'
import type { Dictionary } from '@/lib/getDictionary'

type FormState = 'idle' | 'loading' | 'success' | 'error'
type Field = 'name' | 'company' | 'email' | 'message'
type FieldErrors = Partial<Record<Field, string>>

// Mesmas regras e limites de /api/contato
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const maxLength: Record<Field, number> = { name: 200, company: 200, email: 254, message: 5000 }

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
    company_too_long: ['company', dict.errors.companyTooLong],
    invalid_email: ['email', dict.errors.emailInvalid],
    message_too_long: ['message', dict.errors.messageTooLong],
  }

  function showFieldErrors(form: HTMLFormElement, errors: FieldErrors) {
    setFieldErrors(errors)
    const first = (['name', 'company', 'email', 'message'] as const).find((f) => errors[f])
    if (first) (form.elements.namedItem(first) as HTMLElement).focus()
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const value = (f: Field) => (form.elements.namedItem(f) as HTMLInputElement).value.trim()
    const data = {
      name: value('name'),
      company: value('company'),
      email: value('email'),
      message: value('message'),
      website: (form.elements.namedItem('website') as HTMLInputElement).value,
    }

    const errors: FieldErrors = {}
    if (!data.name) errors.name = dict.errors.nameRequired
    if (data.company.length > maxLength.company) errors.company = dict.errors.companyTooLong
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
        track('generate_lead') // nenhum campo do formulário vai para o GA (nem se a empresa foi informada)
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
      <div role="status" className="flex flex-col items-center justify-center gap-4 px-2 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-ok/10 text-ok ring-1 ring-ok/15">
          <CheckIcon className="size-6" />
        </div>
        <p className="max-w-sm text-on-surface">{dict.success}</p>
      </div>
    )
  }

  const labelClass = 'mb-1.5 block text-[0.95rem] font-semibold text-on-surface'

  const inputClass =
    'w-full rounded-[10px] border border-outline bg-surface px-3 py-3 text-base text-on-surface placeholder:text-muted transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none aria-invalid:border-error aria-invalid:focus:ring-error/20'

  // Propriedades comuns de cada campo: limite, estado de erro e ligação com a mensagem
  const fieldProps = (f: Field) => ({
    id: f,
    name: f,
    required: f !== 'company',
    maxLength: maxLength[f],
    'aria-invalid': fieldErrors[f] ? true : undefined,
    'aria-describedby': fieldErrors[f] ? `${f}-error` : undefined,
    className: inputClass,
  })

  const fieldError = (f: Field) =>
    fieldErrors[f] && (
      <p id={`${f}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-error">
        <AlertIcon className="mt-px size-4 shrink-0" strokeWidth={2} />
        {fieldErrors[f]}
      </p>
    )

  // O foco vai só para o primeiro campo com erro; este aviso lê todos de uma vez
  const errorList = Object.values(fieldErrors).filter(Boolean)

  return (
    <form
      method="post"
      action="/api/contato"
      noValidate
      onSubmit={handleSubmit}
      onInput={handleInput}
      className="relative flex flex-col gap-4"
    >
      {/* Honeypot: fora da tela e da ordem de tabulação; só bots preenchem. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" data-bwignore />
      </div>
      <p aria-live="polite" className="sr-only">
        {errorList.length > 0 && `${dict.errorsSummary} ${errorList.join(' ')}`}
      </p>
      {/* Nome e empresa lado a lado no desktop, empilhados no celular */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {dict.name}
          </label>
          <input {...fieldProps('name')} type="text" autoComplete="name" placeholder={dict.namePlaceholder} />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            {dict.company} <span className="font-normal text-muted">{dict.optional}</span>
          </label>
          <input {...fieldProps('company')} type="text" autoComplete="organization" placeholder={dict.companyPlaceholder} />
          {fieldError('company')}
        </div>
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          {dict.email}
        </label>
        <input {...fieldProps('email')} type="email" autoComplete="email" placeholder={dict.emailPlaceholder} />
        {fieldError('email')}
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          {dict.message}
        </label>
        <textarea {...fieldProps('message')} rows={4} placeholder={dict.messagePlaceholder} className={`${inputClass} resize-y`} />
        {fieldError('message')}
      </div>

      {state === 'error' && (
        <p role="alert" className="flex items-start gap-1.5 text-sm text-error">
          <AlertIcon className="mt-px size-4 shrink-0" strokeWidth={2} />
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cta px-6 py-3.5 font-semibold text-on-cta transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start"
      >
        {state === 'loading' ? dict.sending : dict.submit}
        {state !== 'loading' && (
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
      <p className="text-sm text-muted">{dict.nextStep}</p>
    </form>
  )
}
