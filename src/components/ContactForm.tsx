'use client'

import { useState } from 'react'
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
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
          ✓
        </div>
        <p className="text-on-surface-variant max-w-sm text-sm">
          {dict.success}
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
          {dict.name}
        </label>
        <input id="name" name="name" required type="text" placeholder={dict.namePlaceholder} className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
          {dict.email}
        </label>
        <input id="email" name="email" required type="email" placeholder={dict.emailPlaceholder} className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
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
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-primary text-on-primary py-3 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? dict.sending : dict.submit}
      </button>
    </form>
  )
}
