# Redesign Single-Page Harpia Lab — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Converter o site multi-página em uma landing page única, limpa e objetiva com tema light, usando os componentes existentes simplificados e integração Resend para o formulário de contato.

**Architecture:** Página única (`src/app/page.tsx`) com todas as seções inline. Componentes Navbar e Footer refatorados para tema light e âncoras. Nova Route Handler em `/api/contato` integra com Resend SDK já instalado. Páginas antigas (`/sobre`, `/projetos`, `/contato`) são removidas.

**Tech Stack:** Next.js 16.2.1, React 19, Tailwind CSS v4, Resend v6.9.4, TypeScript

---

## File Map

| Ação | Arquivo | Responsabilidade |
|---|---|---|
| Modify | `src/app/globals.css` | Substituir palette dark por light, manter fontes/radius |
| Modify | `src/app/layout.tsx` | Remover classe `dark` do `<html>`, atualizar metadata |
| Create | `src/app/api/contato/route.ts` | Route Handler POST → Resend → tiago.trcz@gmail.com |
| Modify | `src/components/Navbar.tsx` | Logo image, links âncora, estilo light |
| Modify | `src/components/Footer.tsx` | Logo image + copyright only |
| Modify | `src/components/ContactForm.tsx` | Endpoint `/api/contato`, campos Nome/Email/Mensagem, estilo light |
| Modify | `src/app/page.tsx` | Rewrite: Hero + Serviços + Equipe + Contato como página única |
| Delete | `src/app/sobre/page.tsx` | Removida — conteúdo absorvido na page.tsx |
| Delete | `src/app/projetos/page.tsx` | Removida — sem portfólio ainda |
| Delete | `src/app/contato/page.tsx` | Removida — seção de contato em page.tsx |

---

## Task 1: Atualizar tema de cores (globals.css)

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Substituir o bloco `@theme` por paleta light**

Abrir `src/app/globals.css` e substituir o conteúdo inteiro por:

```css
@import "tailwindcss";

@theme {
  /* ── Cores — tema light ── */
  --color-primary:                  #1e3a5f;
  --color-primary-hover:            #162d4a;
  --color-on-primary:               #ffffff;

  --color-surface:                  #ffffff;
  --color-surface-container-lowest: #f8fafc;
  --color-surface-container-low:    #f1f5f9;
  --color-surface-container:        #e8eef4;
  --color-surface-container-high:   #e2e8f0;
  --color-surface-container-highest:#cbd5e1;

  --color-background:               #ffffff;
  --color-on-background:            #0f172a;

  --color-on-surface:               #0f172a;
  --color-on-surface-variant:       #475569;

  --color-outline:                  #94a3b8;
  --color-outline-variant:          #e2e8f0;

  --color-error:                    #dc2626;

  /* ── Fontes ── */
  --font-headline: var(--font-manrope), "Manrope", sans-serif;
  --font-body:     var(--font-inter),   "Inter",   sans-serif;
  --font-label:    var(--font-inter),   "Inter",   sans-serif;

  /* ── Border Radius ── */
  --radius:     0.375rem;
  --radius-sm:  0.25rem;
  --radius-md:  0.5rem;
  --radius-lg:  0.75rem;
  --radius-xl:  1rem;
  --radius-2xl: 1.25rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "style: replace dark color palette with light theme"
```

---

## Task 2: Atualizar layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Remover `dark` da classe do `<html>` e atualizar metadata**

Substituir o conteúdo de `src/app/layout.tsx` por:

```tsx
import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Harpia Lab | Consultoria & Fábrica de Software',
  description:
    'Desenvolvemos produtos digitais e oferecemos consultoria técnica para empresas que precisam de resultado — do MVP ao sistema em produção.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-body bg-background text-on-surface">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "style: remove dark class from html, update metadata"
```

---

## Task 3: Criar Route Handler de contato com Resend

**Files:**
- Create: `src/app/api/contato/route.ts`

- [ ] **Step 1: Criar arquivo `.env.local` com a chave Resend**

Criar o arquivo `.env.local` na raiz do projeto:

```
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXX
```

> Substituir pelo valor real em https://resend.com/api-keys. O domínio `harpialab.com` precisa estar verificado no Resend para usar `contato@harpialab.com` como remetente. Enquanto não estiver verificado, usar `onboarding@resend.dev` como `from`.

Verificar que `.env.local` está no `.gitignore` (já deve estar pelo Next.js).

- [ ] **Step 2: Criar a Route Handler**

Criar `src/app/api/contato/route.ts`:

```ts
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
```

- [ ] **Step 3: Testar a rota localmente**

Com o servidor rodando (`npm run dev`), executar:

```bash
curl -X POST http://localhost:3000/api/contato \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@email.com","message":"Mensagem de teste"}'
```

Resultado esperado:
```json
{"ok":true}
```

Se retornar `{"error":"..."}`, verificar a chave `RESEND_API_KEY` no `.env.local`.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/contato/route.ts
git commit -m "feat: add /api/contato route handler with Resend"
```

---

## Task 4: Refatorar Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Substituir Navbar por versão com logo e âncoras**

Substituir o conteúdo de `src/components/Navbar.tsx` por:

```tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-outline-variant">
      <div className="flex justify-between items-center px-6 md:px-12 max-w-screen-xl mx-auto h-16">
        <a href="#" aria-label="Harpia Lab">
          <Image
            src="/images/logo-harpialab.png"
            alt="Harpia Lab"
            width={120}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicos" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
            Serviços
          </a>
          <a href="#equipe" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
            Equipe
          </a>
          <a
            href="#contato"
            className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            Fale Conosco
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-on-surface"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-outline-variant px-6 py-5 flex flex-col gap-4">
          <a href="#servicos" onClick={() => setMenuOpen(false)} className="text-base font-medium text-on-surface-variant">
            Serviços
          </a>
          <a href="#equipe" onClick={() => setMenuOpen(false)} className="text-base font-medium text-on-surface-variant">
            Equipe
          </a>
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="bg-primary text-on-primary px-5 py-3 rounded-lg text-sm font-semibold text-center"
          >
            Fale Conosco
          </a>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "refactor: navbar with logo image and anchor links"
```

---

## Task 5: Simplificar Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Substituir Footer por versão simplificada**

Substituir o conteúdo de `src/components/Footer.tsx` por:

```tsx
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Image
          src="/images/logo-harpialab.png"
          alt="Harpia Lab"
          width={100}
          height={36}
          className="h-9 w-auto opacity-70"
        />
        <p className="text-sm text-on-surface-variant">
          © {new Date().getFullYear()} Harpia Lab. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "refactor: simplify footer to logo and copyright"
```

---

## Task 6: Atualizar ContactForm

**Files:**
- Modify: `src/components/ContactForm.tsx`

- [ ] **Step 1: Substituir ContactForm com endpoint e estilo atualizados**

O formulário agora tem apenas 3 campos (remover `company`), posta para `/api/contato`, e usa estilo light:

```tsx
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
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Erro ao enviar mensagem.')
      setState('success')
    } catch (err: unknown) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erro desconhecido.')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
          ✓
        </div>
        <h3 className="text-xl font-bold text-on-surface">Mensagem enviada!</h3>
        <p className="text-on-surface-variant max-w-sm text-sm">
          Recebemos sua mensagem. Retornaremos em até 24h.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
          Nome
        </label>
        <input name="name" required type="text" placeholder="Seu nome" className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
          E-mail
        </label>
        <input name="email" required type="email" placeholder="seu@email.com" className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
          Mensagem
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Descreva seu projeto ou dúvida..."
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
        {state === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "refactor: update contact form endpoint, fields, and light theme styles"
```

---

## Task 7: Reescrever page.tsx como página única

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Substituir page.tsx pela landing page única**

Substituir o conteúdo inteiro de `src/app/page.tsx` por:

```tsx
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'

const services = [
  {
    icon: '🏭',
    title: 'Fábrica de Software',
    desc: 'Desenvolvimento de produtos digitais sob demanda — web, mobile e sistemas internos.',
  },
  {
    icon: '🎯',
    title: 'Consultoria Técnica',
    desc: 'Arquitetura de sistemas, revisão de código e escolha de stack para o seu contexto.',
  },
  {
    icon: '💻',
    title: 'Desenvolvimento Web & Mobile',
    desc: 'Aplicações rápidas, acessíveis e bem construídas do front ao back-end.',
  },
  {
    icon: '🔗',
    title: 'Integrações & APIs',
    desc: 'Conectamos sistemas legados a novas plataformas com integrações robustas.',
  },
]

const team = [
  { src: '/images/ttt.jpeg', name: 'Tiago Thomen Taraczuk', role: 'Co-founder' },
  { src: '/images/ggr.png',  name: 'Gabriel Gomes Rapozo',  role: 'Co-founder' },
  { src: '/images/cm.png',   name: 'Cezar Mauricio',        role: 'Co-founder' },
]

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-blue-50 px-3 py-1 rounded-full mb-8">
          Consultoria &amp; Fábrica de Software
        </span>
        <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight text-on-surface leading-tight mb-6 max-w-2xl">
          Transformamos ideias em software de verdade.
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl mb-10">
          Desenvolvemos produtos digitais e oferecemos consultoria técnica para
          empresas que precisam de resultado — do MVP ao sistema em produção.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#contato"
            className="bg-primary text-on-primary px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors"
          >
            Solicitar Orçamento
          </a>
          <a
            href="#equipe"
            className="text-primary font-semibold text-sm flex items-center gap-1.5 hover:underline"
          >
            Conheça o time →
          </a>
        </div>
      </section>

      <div className="border-t border-outline-variant max-w-screen-xl mx-auto" />

      {/* ── Serviços ── */}
      <section id="servicos" className="py-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-4">
          O que fazemos
        </span>
        <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-4">
          Serviços
        </h2>
        <p className="text-on-surface-variant mb-12 max-w-lg">
          Da ideia ao deploy, com código limpo e foco em entrega.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-7 hover:border-primary/40 transition-colors"
            >
              <span className="text-3xl block mb-4">{icon}</span>
              <h3 className="font-headline font-bold text-on-surface mb-2">{title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-outline-variant max-w-screen-xl mx-auto" />

      {/* ── Equipe ── */}
      <section id="equipe" className="py-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-screen-xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-4">
            Quem somos
          </span>
          <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-4">
            Nossa equipe
          </h2>
          <p className="text-on-surface-variant mb-12 max-w-lg">
            Três co-fundadores com experiência em engenharia de software, design
            e arquitetura de sistemas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map(({ src, name, role }) => (
              <div
                key={name}
                className="bg-white border border-outline-variant rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={src}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-on-surface text-sm">{name}</h3>
                  <p className="text-xs text-primary font-semibold mt-1">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contato ── */}
      <section id="contato" className="py-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-4">
              Contato
            </span>
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-4">
              Vamos conversar?
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              Conte o seu desafio e a gente retorna com uma proposta.
              Respondemos em até 24h.
            </p>
            <a
              href="mailto:contato@harpialab.com"
              className="text-sm font-semibold text-primary flex items-center gap-2 hover:underline"
            >
              <span>✉</span>
              contato@harpialab.com
            </a>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Verificar no navegador**

Iniciar o servidor de desenvolvimento e verificar cada seção:

```bash
npm run dev
```

Checar em `http://localhost:3000`:
- [ ] Navbar com logo e links âncora funcionando
- [ ] Hero com texto correto e CTAs
- [ ] Grid de serviços com 4 cards
- [ ] Fotos da equipe carregando corretamente
- [ ] Formulário de contato visível e interativo
- [ ] Footer com logo e copyright

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rewrite homepage as single-page landing"
```

---

## Task 8: Remover páginas antigas

**Files:**
- Delete: `src/app/sobre/page.tsx`
- Delete: `src/app/projetos/page.tsx`
- Delete: `src/app/contato/page.tsx`

- [ ] **Step 1: Deletar os arquivos**

```bash
rm src/app/sobre/page.tsx
rm src/app/projetos/page.tsx
rm src/app/contato/page.tsx
```

Verificar se os diretórios ficaram vazios e removê-los também:

```bash
rmdir src/app/sobre src/app/projetos src/app/contato
```

- [ ] **Step 2: Build de verificação**

```bash
npm run build
```

Resultado esperado: build completo sem erros. Se houver erros de "route not found" ou imports pendentes, investigar qual arquivo ainda referencia as rotas removidas.

- [ ] **Step 3: Commit final**

```bash
git add -A
git commit -m "chore: remove sobre, projetos and contato pages"
```

---

## Self-Review

**Spec coverage:**
- ✅ Página única com âncoras
- ✅ Tema light
- ✅ Logo na navbar e footer
- ✅ Hero com tagline e CTAs
- ✅ 4 serviços em grid 2×2
- ✅ Equipe com 3 co-fundadores e fotos reais
- ✅ Formulário de contato (Nome, E-mail, Mensagem)
- ✅ Resend → tiago.trcz@gmail.com
- ✅ Sem endereço físico, telefone, clientes fictícios, badges falsos
- ✅ Páginas antigas removidas

**Notas de implementação:**
- `--color-primary-hover` é um token custom adicionado ao `@theme` — usado como `hover:bg-primary-hover` no Tailwind v4
- O campo `from` do Resend usa `onboarding@resend.dev` até o domínio `harpialab.com` ser verificado no painel Resend
- `next/image` com `fill` na seção equipe requer `position: relative` no container pai (garantido por `relative` na div wrapper)
