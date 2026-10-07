'use client'

import { useState } from 'react'
import { ArrowRightIcon, CheckIcon } from '@/components/icons'
import type { Dictionary } from '@/lib/getDictionary'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface ContactFormProps {
  dict: Dictionary['form']
}

export default function ContactForm({ dict }: ContactFormProps) {
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
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? dict.error)
      setState('success')
    } catch (err: unknown) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : dict.error)
    }
  }

  if (state === 'success') {
    return (
      <div role="status" className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/15">
          <CheckIcon className="size-6" />
        </div>
        <p className="max-w-sm text-sm text-on-surface-variant">
          {dict.success}
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline transition-colors focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 focus:outline-none'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-on-surface">
          {dict.name}
        </label>
        <input id="name" name="name" required type="text" placeholder={dict.namePlaceholder} className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-on-surface">
          {dict.email}
        </label>
        <input id="email" name="email" required type="email" placeholder={dict.emailPlaceholder} className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-on-surface">
          {dict.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={dict.messagePlaceholder}
          className={`${inputClass} resize-none`}
        />
      </div>

      {state === 'error' && (
        <p role="alert" className="text-sm text-error">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="btn-shine group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-on-primary transition hover:shadow-lg hover:shadow-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === 'loading' ? dict.sending : dict.submit}
        {state !== 'loading' && (
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
    </form>
  )
}
