# Harpia Lab Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Harpia Lab institutional website with 4 pages, shared layout components, and a working contact form that sends emails via Resend.

**Architecture:** Next.js 14 App Router with TypeScript and Tailwind CSS. Shared `Navbar` and `Footer` components live in `src/components/`. Each page is a Server Component in `src/app/`. The contact form is extracted as a `ContactForm` Client Component (needs `useState`). Email delivery uses a Next.js API Route at `/api/contact` with the Resend SDK.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Resend SDK, Google Fonts (next/font), Material Symbols (CDN link in layout)

---

## File Map

| File | Responsibility |
|------|---------------|
| `tailwind.config.ts` | Full Harpia design system (colors, fonts, radius) |
| `src/app/globals.css` | Base Tailwind directives + `.material-symbols-outlined` variation settings + `.glass-panel` |
| `src/app/layout.tsx` | Root layout: dark class, fonts, metadata, Navbar, Footer |
| `src/app/page.tsx` | Home page — Hero, Bento Grid, Featured Projects, Client Logos |
| `src/app/sobre/page.tsx` | About page — Mission, Values, Team, CTA |
| `src/app/projetos/page.tsx` | Projects page — Hero, Bento Grid, Clients, CTA, floating badge |
| `src/app/contato/page.tsx` | Contact page — Hero, Form grid, Process steps |
| `src/app/api/contact/route.ts` | POST handler: validates body, sends email via Resend |
| `src/components/Navbar.tsx` | Fixed nav with active state via `usePathname`, mobile toggle |
| `src/components/Footer.tsx` | 4-column footer, animated status dot |
| `src/components/ContactForm.tsx` | Client component: form state, loading, success/error UX |
| `.env.local` | `RESEND_API_KEY=...` (gitignored) |
| `.env.example` | Template with empty `RESEND_API_KEY=` |

---

## Task 1: Scaffold Project + Git

**Files:**
- Create: entire project via `create-next-app`
- Modify: `.gitignore`

- [ ] **Step 1: Create project**

Run from `/Users/tiagothomen/Documents/work/harpia/site`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```
When prompted, accept defaults (Yes to all). This creates the Next.js scaffold, initializes git, and installs dependencies.

- [ ] **Step 2: Verify scaffold**

```bash
ls src/app
```
Expected output includes: `favicon.ico  globals.css  layout.tsx  page.tsx`

- [ ] **Step 3: Add entries to .gitignore**

Open `.gitignore` and append these lines at the end:
```
.superpowers/
.env.local
```
(`.env.local` may already be present — check before adding)

- [ ] **Step 4: Remove boilerplate home page content**

Delete `src/app/page.tsx` — we will replace it entirely in Task 7.
Also delete `public/next.svg` and `public/vercel.svg`.

- [ ] **Step 5: Initial commit**

```bash
git add .
git commit -m "chore: scaffold Next.js 14 project with TypeScript and Tailwind"
```

---

## Task 2: Tailwind Design System

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace tailwind.config.ts with the Harpia design system**

Completely replace the contents of `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary':                  '#00daf3',
        'primary-container':        '#009fb2',
        'on-primary':               '#00363d',
        'on-primary-container':     '#002f35',
        'secondary':                '#bdc2ff',
        'secondary-container':      '#343d96',
        'on-secondary':             '#1b247f',
        'on-secondary-container':   '#a8afff',
        'tertiary':                 '#ffb595',
        'tertiary-container':       '#ef6719',
        'surface':                  '#111316',
        'surface-dim':              '#111316',
        'surface-bright':           '#37393d',
        'surface-container-lowest': '#0c0e11',
        'surface-container-low':    '#1a1c1f',
        'surface-container':        '#1e2023',
        'surface-container-high':   '#282a2d',
        'surface-container-highest':'#333538',
        'surface-variant':          '#333538',
        'on-surface':               '#e2e2e6',
        'on-surface-variant':       '#c1c6d7',
        'background':               '#111316',
        'on-background':            '#e2e2e6',
        'outline':                  '#8b90a0',
        'outline-variant':          '#414755',
        'inverse-surface':          '#e2e2e6',
        'inverse-on-surface':       '#2f3034',
        'inverse-primary':          '#006875',
        'error':                    '#ffb4ab',
        'on-error':                 '#690005',
        'error-container':          '#93000a',
        'on-error-container':       '#ffdad6',
        'surface-tint':             '#00daf3',
      },
      fontFamily: {
        headline: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
        body:     ['var(--font-inter)',   'Inter',   'sans-serif'],
        label:    ['var(--font-inter)',   'Inter',   'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        sm:      '0.125rem',
        md:      '0.125rem',
        lg:      '0.25rem',
        xl:      '0.5rem',
        '2xl':   '0.75rem',
        full:    '9999px',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: configure Harpia design system in Tailwind"
```

---

## Task 3: Global Styles + Next Config

**Files:**
- Modify: `src/app/globals.css`
- Modify: `next.config.ts`

- [ ] **Step 1: Replace globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.glass-panel {
  background: rgba(26, 28, 31, 0.6);
  backdrop-filter: blur(20px);
}
```

- [ ] **Step 2: Update next.config.ts**

Replace contents of `next.config.ts`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css next.config.ts
git commit -m "feat: global styles and image host config"
```

---

## Task 4: Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

```typescript
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
  title: 'Harpia Lab | High-Precision Engineering',
  description:
    'Transformamos ideias complexas em software de alta performance através de engenharia de precisão e design centrado no usuário.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} font-body bg-background text-on-surface selection:bg-primary/30 selection:text-primary`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Create components directory**

```bash
mkdir -p src/components
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: root layout with fonts, metadata, and shared components"
```

---

## Task 5: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`

`Navbar` must be a Client Component because it uses `usePathname` (requires browser routing context) and `useState` (mobile menu toggle).

- [ ] **Step 1: Create src/components/Navbar.tsx**

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/',         label: 'Início' },
  { href: '/sobre',    label: 'Sobre Nós' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/contato',  label: 'Contato' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#111316]/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,218,243,0.08)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-primary font-headline"
        >
          Harpia Lab
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-headline font-bold tracking-tight transition-colors duration-300 ${
                pathname === href
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-slate-400 hover:text-primary'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/contato"
            className="hidden md:block bg-primary text-on-primary px-6 py-2 rounded font-headline font-bold hover:shadow-[0_0_15px_rgba(0,218,243,0.4)] transition-all active:scale-95"
          >
            Fale Conosco
          </Link>
          <button
            className="md:hidden text-primary p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111316]/95 backdrop-blur-xl border-t border-outline-variant/20 px-8 py-6 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`font-headline font-bold text-lg ${
                pathname === href ? 'text-primary' : 'text-slate-400'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contato"
            onClick={() => setMenuOpen(false)}
            className="bg-primary text-on-primary px-6 py-3 rounded font-headline font-bold text-center mt-2"
          >
            Fale Conosco
          </Link>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Start dev server and verify navbar renders**

```bash
npm run dev
```
Open http://localhost:3000. Expected: dark navbar with "Harpia Lab" in cyan, nav links, "Fale Conosco" button. Resize to mobile — hamburger icon should appear and toggle a dropdown.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: Navbar component with active state and mobile menu"
```

---

## Task 6: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`

`Footer` is a Server Component (no client hooks needed).

- [ ] **Step 1: Create src/components/Footer.tsx**

```typescript
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background w-full border-t border-outline-variant/15">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-12 py-16 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <div className="md:col-span-1">
          <span className="text-xl font-bold text-primary mb-4 block font-headline">
            Harpia Lab
          </span>
          <p className="font-body text-sm text-slate-400 leading-relaxed">
            A arquitetura do amanhã, codificada hoje. Especialistas em software
            de alta criticidade e performance extrema.
          </p>
        </div>

        {/* Navegação */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-on-surface font-headline font-bold text-sm uppercase tracking-widest">
            Navegação
          </h4>
          <Link href="/" className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors">Início</Link>
          <Link href="/sobre" className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors">Sobre Nós</Link>
          <Link href="/projetos" className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors">Projetos</Link>
          <Link href="/contato" className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors">Contato</Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-on-surface font-headline font-bold text-sm uppercase tracking-widest">
            Legal
          </h4>
          <span className="font-body text-sm text-slate-500">Privacidade</span>
          <span className="font-body text-sm text-slate-500">Termos de Uso</span>
          <span className="font-body text-sm text-slate-500">Cookies</span>
        </div>

        {/* Social & Contato */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-on-surface font-headline font-bold text-sm uppercase tracking-widest">
            Social & Contato
          </h4>
          <a
            href="https://linkedin.com/company/harpialab"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/harpialab"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:contato@harpialab.com"
            className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors"
          >
            contato@harpialab.com
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-screen-2xl mx-auto px-12 py-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-body text-sm text-slate-400">
          © {new Date().getFullYear()} Harpia Lab. High-Precision Engineering.
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-label">Status:</span>
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-on-surface-variant font-label uppercase">
              Sistemas Online
            </span>
          </span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify footer in browser**

With `npm run dev` still running, check http://localhost:3000 bottom. Expected: 4-column footer with Harpia Lab brand, navigation links, and animated cyan dot in the status bar.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: Footer component with 4-column layout and status indicator"
```

---

## Task 7: Home Page

**Files:**
- Create: `src/app/page.tsx`

- [ ] **Step 1: Create src/app/page.tsx**

```typescript
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="pt-20">
      {/* ── Hero ── */}
      <section className="relative min-h-[921px] flex items-center overflow-hidden px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary-container/10" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/15 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-label font-medium tracking-widest uppercase text-on-surface-variant">
                Software Factory &amp; Tech Consultancy
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter mb-8 leading-[0.9] text-on-surface">
              Inovação em Cada Linha de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
                Código
              </span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              Transformamos ideias complexas em software de alta performance
              através de engenharia de precisão e design centrado no usuário.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contato"
                className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-lg font-headline font-bold text-lg hover:shadow-[0_0_20px_rgba(0,218,243,0.3)] transition-all active:scale-95"
              >
                Solicite um Orçamento
              </Link>
              <Link
                href="/projetos"
                className="border border-outline-variant/30 text-on-surface px-8 py-4 rounded-lg font-headline font-bold text-lg hover:bg-surface-container-low transition-all active:scale-95"
              >
                Ver Portfólio
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="aspect-square rounded-xl bg-surface-container-low border border-outline-variant/15 p-4 overflow-hidden relative group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfXc_qX1ncuwlD9JZwVzNieTkXS2vjcnCk-uvB5weU78IH9MvGiR0f4nSxTyx_UUINIkbqVQIwuTRQNRjlZiYug_ggr4pDkI4eiLF8ZlPmgZGZoCj-PfO4nInM56aYR9pBhqlhfOGtPEK84JSVhjkBtEV22xyv2GQob8YtdanWLWcxI_hA3mYnnDPa5WymfMcQ5AU-lW644tvlcuxD-49P45Y2iGLvSfOeECdbnkuZ5aT8ADMf7uTp2xfoKhp9NSmswxG7c-3-VlU"
                alt="Futuristic Tech Laboratory"
                className="w-full h-full object-cover rounded-lg opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 glass-panel rounded-lg border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-label text-primary uppercase tracking-widest mb-1">
                      Status do Sistema
                    </p>
                    <h3 className="text-lg font-headline font-bold">
                      Operação 100% Nominal
                    </h3>
                  </div>
                  <span className="material-symbols-outlined text-primary text-4xl">
                    analytics
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento Grid (Serviços) ── */}
      <section className="py-32 px-8 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-on-surface">
                Engenharia Digital de <br />
                <span className="text-primary">Classe Mundial.</span>
              </h2>
              <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                A Harpia Lab não é apenas uma fábrica de software; somos parceiros
                estratégicos na sua jornada digital. Utilizamos as tecnologias mais
                avançadas para construir ecossistemas digitais escaláveis, seguros e
                impactantes.
              </p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 flex flex-col justify-between">
              <span className="material-symbols-outlined text-primary text-5xl mb-4">
                rocket_launch
              </span>
              <div>
                <h4 className="text-2xl font-headline font-bold mb-2">
                  Consultoria Ágil
                </h4>
                <p className="text-on-surface-variant text-sm">
                  Aceleramos o ciclo de vida do seu produto com metodologias focadas
                  em entrega contínua.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            {[
              { icon: 'cloud_done',      title: 'Cloud Native',    desc: 'Sistemas desenhados para a nuvem, garantindo escalabilidade infinita.' },
              { icon: 'security',        title: 'Cybersecurity',   desc: 'Segurança blindada integrada ao core de cada aplicação construída.' },
              { icon: 'developer_board', title: 'IA Aplicada',     desc: 'Integração de modelos inteligentes para automação de processos críticos.' },
              { icon: 'terminal',        title: 'Back-end Robusto',desc: 'Arquiteturas de microsserviços prontas para alta densidade de dados.' },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10"
              >
                <span className="material-symbols-outlined text-primary mb-4 block">
                  {icon}
                </span>
                <h4 className="font-headline font-bold mb-2">{title}</h4>
                <p className="text-on-surface-variant text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projetos em Destaque ── */}
      <section className="py-32 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-primary font-label font-bold tracking-[0.2em] uppercase text-xs">
                Portfólio Selecionado
              </span>
              <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tight mt-2">
                Projetos em Destaque
              </h2>
            </div>
            <Link
              href="/projetos"
              className="text-primary font-headline font-bold flex items-center group"
            >
              Ver todos os projetos
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9Y4Kf1UoedhanxtJX-n_0WN_9SCIq0bojot-sSr2WhY2u6sV_IvM9lRKHcpIZEg9abDTHhYanbb35pfeehHf7EPPbqGUkQG334KQVN1oKdCIrPXcFkizPzptLZU-r4V0xhmww5N4EuEUHRbN9VMxVtAvuteQsFK7DHjFaCkbQcEbgy5dJPcUQHNfV8p_DJvo2DEvRJDrTWldS11M9CK1lBe4CzYTabElwlP2l6nbIxPI9PNEW5vAEoNg2ImLoWnHv0Vnv3HhbuoU',
                alt: 'Data Analytics Dashboard',
                title: 'Sistema Quantitativo "Zenith"',
                desc: 'Plataforma de análise preditiva para o mercado financeiro com processamento em tempo real.',
              },
              {
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5tvjX-2jVQDCmaZ6Dp-lQeIcZkYRh9d7nG9wHanGWcZ_nsq142HHXDgQbJVqemFfJWxjNAYfoMs8ET86RJlkQRlCg5WTDKN3kX-NljQwF265y1vuXEcsbJpBnzxwiZlqffwnGPUAw2vht23Kog-5o0pvyYV02hj61N7lrN2uzjHJzusvg0ZiY9ufuGmqb4VRzvh67DfYgDdEBrq9T1IfpbtTf0U7gR20F3Z7kUrKfUsLl7lF44N2R8j4KLQQZjUB6Jdk11NZhk_E',
                alt: 'Mobile App Interface',
                title: 'LogiTech Mobile Ecosystem',
                desc: 'Ecossistema mobile completo para gestão de logística internacional de última milha.',
              },
            ].map(({ src, alt, title, desc }) => (
              <div key={title} className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Logos ── */}
      <section className="py-24 px-8 border-t border-outline-variant/15">
        <div className="max-w-screen-2xl mx-auto text-center">
          <p className="text-xs font-label uppercase tracking-[0.3em] text-slate-500 mb-12">
            Empresas que confiam na nossa engenharia
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center grayscale opacity-40 hover:opacity-100 transition-opacity">
            {['NEXUS', 'QUANTUM', 'STREAM', 'ORBIT', 'PHOENIX', 'CORE'].map((name) => (
              <div
                key={name}
                className="flex justify-center font-headline font-extrabold text-2xl tracking-tighter"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Verify home page in browser**

Check http://localhost:3000. Expected: hero with large headline, cyan gradient text on "Código", two CTA buttons, tech image with glass badge. Below: service bento grid, 2 project cards, client logos that become visible on hover.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: Home page — hero, bento grid, featured projects, client logos"
```

---

## Task 8: Sobre Page

**Files:**
- Create: `src/app/sobre/page.tsx`

- [ ] **Step 1: Create src/app/sobre/page.tsx**

```typescript
import Link from 'next/link'

export default function SobrePage() {
  return (
    <main className="pt-24">
      {/* ── Hero / Missão & História ── */}
      <section className="relative px-8 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Nossa História
            </div>
            <h1 className="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-on-surface mb-8 leading-tight">
              Engenharia de{' '}
              <span className="text-primary">Alta Precisão</span> para o Futuro.
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-8 max-w-xl">
              Fundada na convergência entre dados e design, a Harpia Lab nasceu
              para decodificar problemas complexos em soluções digitais elegantes.
              Nossa missão é elevar o padrão de desenvolvimento de software através
              de uma mentalidade de laboratório: experimentação rigorosa e execução
              impecável.
            </p>
            <div className="grid grid-cols-2 gap-8 py-8 border-t border-outline-variant/15">
              <div>
                <h3 className="text-primary font-headline font-extrabold text-xl mb-2 italic">
                  Missão
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Transformar a arquitetura digital de empresas globais através de
                  código limpo e inovação contínua.
                </p>
              </div>
              <div>
                <h3 className="text-primary font-headline font-extrabold text-xl mb-2 italic">
                  Visão
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Ser a referência técnica em desenvolvimento de sistemas de alta
                  performance na América Latina.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/15 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2Vlw3795KYYtzj4u4RfS2-lEFlXZ7JP6OtqzOWEFvy8RE4qHPXREAIw0PQYfzM5nRJY6NlvhWOfcsJ6Uy_97-D9xCYWrB72XJCBAFvtodr3G4Mk6FmJqwJupH212JGPv8WfhMYmi-JorlVYMgcVhhABWikBOgpla8bGvd3Pvo-j7qkslgyuswzoTzI3NY3onkCS2XISmvANFJeJfg1NxE0_tawH-mdXmIeWPccwhyxyKmwAfFCq8hZW4CyOGnn8PEHEUs-UwPs7E"
                alt="Digital Engineering"
                className="w-full h-full object-cover grayscale contrast-125 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-primary/10" />
              <div className="absolute bottom-8 right-8 p-6 bg-surface-container-highest/80 backdrop-blur-md rounded-xl border border-primary/30 shadow-2xl max-w-xs">
                <span className="material-symbols-outlined text-primary mb-2 text-3xl block">
                  verified
                </span>
                <h4 className="text-white font-headline font-bold">
                  Excelência Técnica
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Auditamos cada linha de código para garantir estabilidade e
                  escalabilidade absoluta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nossos Valores ── */}
      <section className="bg-surface-container-low py-24 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-3xl font-headline font-extrabold tracking-tighter mb-16 border-l-4 border-primary pl-6">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                num: '01',
                title: 'Transparência Radical',
                desc: 'Acreditamos que a confiança é construída através de processos abertos e comunicação direta em todas as etapas do desenvolvimento.',
              },
              {
                num: '02',
                title: 'Foco no Detalhe',
                desc: 'Não entregamos apenas funcionalidade; entregamos polimento. Cada pixel e milissegundo de performance importa para nós.',
              },
              {
                num: '03',
                title: 'Inovação Pragmática',
                desc: 'Utilizamos as tecnologias mais recentes não pelo hype, mas por sua capacidade de resolver problemas reais de forma eficiente.',
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="space-y-4 group">
                <div className="text-primary-container font-headline text-6xl font-black opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                  {num}
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface">
                  {title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nossa Equipe ── */}
      <section className="py-32 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tighter mb-4">
              Nossa Equipe
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Mentes brilhantes dedicadas a construir o amanhã. Conheça os
              especialistas por trás da Harpia Lab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1-l5u4IlSO7TRsjQ3p2FDDILk3ZLfGc32uLQBKoL-yWvV2EmmBqf_ja2exxNdy3dUBmLHj3PkHF9j9jGKCMStbU56eMRu04SRS8Hir5mIRIR6UN83B5r9A153p_HGVuEbqqdz3I9XNgH2TkKoU1nMzTtOId5VqEmjJEDSJW4IRnx5FsffSCN5gNFnw7bui9qNgdg6bTysyauWhFNGFTuDsw7SbZJvIf9dVL__616bcM2s72wDQeS6yOqWkC18CbcwgOVLOLMic30',
                name: 'Arthur Mendes',
                role: 'Tech Lead',
                desc: 'Especialista em arquitetura de sistemas distribuídos e liderança técnica de projetos críticos.',
                icon: 'terminal',
              },
              {
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVW08rVOfcmiMnq7Gw8M_HkIUbCECPcfUguzFFuEEuO0OSh78cks8ohIBQ7kl9byi0Mcz0Y9ZLFHGt4ANveu2rbllBtdkR9VitFP3YkfDmF7ggSl1iMhPvNDpTgTfyd39oN5wjAjuNvhkKV9GSO2KIlBoa8KE1A8KUeGag6RNVZNNMOiX5McdLP7hYVghXu_2a6Jb7geBvUTWen9YDXIOWAyfPfgN2X-epg-2ltTQuBiwQlzBiU93nwtUtwEpQG7tP7ZQMPAWxwk0',
                name: 'Beatriz Rocha',
                role: 'Front-end Developer',
                desc: 'Apaixonada por interfaces intuitivas e performance Web. Mestra em React e design systems.',
                icon: 'palette',
              },
              {
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJKoAAcMWMPNVy8JuaP_LP7i1reWU85rU42UFyG6D1DYvnqqpNSXDc5YPrOa2zhhtqDWF195txMfNZG3cKFgFLyNCdpB59Auc4KKay28_dE37TXbS6pWgi0yZHxJNx5HoRmfNPRsSAUcGK6wqh4tkQRoBGe4XLKk0AaLuyru6QiH0wXrpV0nwaWXomtYFe9AfV2ZEEuCJY0cM70omZEXEHEpaGfdpi38DMVnhHvLjLDBbjBbtHNkIFkHMHmgID_aElD0LPzk6VNHc',
                name: 'Ricardo Silva',
                role: 'Back-end Developer',
                desc: 'Focado em segurança, bancos de dados e integração de APIs robustas para alto tráfego.',
                icon: 'database',
              },
            ].map(({ src, name, role, desc, icon }) => (
              <div
                key={name}
                className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="relative mb-8 aspect-square overflow-hidden rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img
                    src={src}
                    alt={name}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-headline font-bold text-on-surface">
                    {name}
                  </h3>
                  <div className="text-primary font-label text-xs font-bold tracking-widest uppercase mb-4">
                    {role}
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {desc}
                  </p>
                  <div className="flex gap-4 pt-4">
                    <span className="material-symbols-outlined text-slate-500 hover:text-primary cursor-pointer transition-colors text-xl">
                      share
                    </span>
                    <span className="material-symbols-outlined text-slate-500 hover:text-primary cursor-pointer transition-colors text-xl">
                      {icon}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-8">
        <div className="max-w-screen-2xl mx-auto rounded-3xl bg-gradient-to-br from-primary-container to-primary p-12 lg:p-20 text-on-primary-container overflow-hidden relative">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl lg:text-6xl font-headline font-black tracking-tighter mb-8 leading-tight">
              Vamos construir algo lendário juntos.
            </h2>
            <p className="text-xl opacity-90 mb-12">
              Nossa equipe está pronta para o seu próximo desafio técnico. Fale
              com um de nossos especialistas hoje.
            </p>
            <Link
              href="/contato"
              className="inline-block bg-background text-primary px-10 py-4 rounded-lg font-headline font-extrabold text-lg active:scale-95 transition-transform"
            >
              Inicie seu Projeto
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-30" />
          </div>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to http://localhost:3000/sobre. Expected: hero with mission/vision, values section with number hover effect, 3 team cards (grayscale → color on hover), and cyan gradient CTA at the bottom.

- [ ] **Step 3: Commit**

```bash
git add src/app/sobre/page.tsx
git commit -m "feat: Sobre page — mission, values, team, CTA"
```

---

## Task 9: Projetos Page

**Files:**
- Create: `src/app/projetos/page.tsx`

- [ ] **Step 1: Create src/app/projetos/page.tsx**

```typescript
import Link from 'next/link'

export default function ProjetosPage() {
  return (
    <main className="pt-32 pb-24">
      {/* ── Hero ── */}
      <header className="max-w-screen-2xl mx-auto px-8 mb-24">
        <div className="flex flex-col md:flex-row gap-12 items-end">
          <div className="md:w-2/3">
            <span className="inline-block py-1 px-3 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
              Portfólio de Engenharia
            </span>
            <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter leading-none text-on-surface mb-8">
              Projetos de <span className="text-primary">Alta Precisão</span>.
            </h1>
          </div>
          <div className="md:w-1/3 pb-2 border-l border-outline-variant/20 pl-8">
            <p className="text-lg text-on-surface-variant leading-relaxed font-body">
              Transformamos problemas complexos em soluções digitais elegantes
              através de engenharia rigorosa e design centrado em resultados.
            </p>
          </div>
        </div>
      </header>

      {/* ── Bento Grid ── */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main project */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-low transition-all duration-500 hover:bg-surface-container-high">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpCDosP5C117PqIGPtoroHRorXdNB7VS5xWOLzalrNtq-tmT-vbluiJcRY2Egnc3rqptPgZIuKwFeMpeofDM8tKJ_fEKMc_Qwra7ObOM2A1-U0L1l5phA1FDifVE6ULBv3MFxQRpDCoO3AzayDVkwKBZB44P1_IB0gKVA7dVPyWaUvt0jxjcSadaAbb4bOawmHjwBPZRepByEa5Lb72U9HtrI4bmApqZ3iR7ypqOjMmdpdZHKfF-wE79fZhpQXsMoTOxE2dk9FYK4"
                alt="Dashboard de Analytics"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-2 bg-primary/10 text-primary border border-primary/20 rounded">
                  AI &amp; Machine Learning
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-2 bg-primary/10 text-primary border border-primary/20 rounded">
                  Cloud Systems
                </span>
              </div>
              <h3 className="text-3xl font-headline font-bold text-on-surface mb-3">
                Project Chronos: Predição de Mercado
              </h3>
              <p className="text-on-surface-variant mb-6 max-w-2xl">
                Desenvolvemos um motor de processamento em tempo real capaz de
                analisar 1.5M de transações por segundo com latência
                sub-milissegundo para o setor financeiro.
              </p>
              <div className="flex items-center gap-2 text-primary font-bold group/link cursor-pointer">
                <span>Ver Estudo de Caso</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          {/* Secondary cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {[
              {
                icon: 'security',
                title: 'Vault Protocol',
                desc: 'Arquitetura de segurança Zero-Trust para infraestrutura crítica governamental.',
                tags: ['Rust', 'Kubernetes'],
              },
              {
                icon: 'biotech',
                title: 'Helix DNA',
                desc: 'Sequenciamento genético distribuído utilizando computação paralela massiva.',
                tags: ['Python', 'AWS Lambda'],
              },
            ].map(({ icon, title, desc, tags }) => (
              <div
                key={title}
                className="flex-1 group rounded-xl bg-surface-container-low p-8 transition-all hover:bg-surface-container-high flex flex-col justify-between"
              >
                <div>
                  <span className="material-symbols-outlined text-primary mb-4 block"
                    style={{ fontVariationSettings: "'FILL' 1" }}>
                    {icon}
                  </span>
                  <h4 className="text-xl font-headline font-bold text-on-surface mb-2">
                    {title}
                  </h4>
                  <p className="text-sm text-on-surface-variant">{desc}</p>
                </div>
                <div className="mt-8 flex gap-3">
                  {tags.map((t) => (
                    <span key={t} className="text-xs font-mono text-outline">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Third row */}
          {[
            {
              src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-IFwSJczyPZLEjnz_s8MG3598RTx3O0kBzI8GnL5c26PL-MlYeISnMLk8-NyiUcNnyuIrM4ujt0cKPI0YLwm7cO-0jWiXwz3k2_yZAG5EbAQvJBW0j5IPCSZGSG35ZNQafSPIS5Z4YLA9dkY0-sxi7eMrk-hIAQbZTKWmK2K_YM3S9t0UQP07ZmlOkLX3Uvi5C4rvlyPJNXDidwwo1LomIctCtTmSHDeig6NcT9jyeffJms1o5J4D0Z8u4v1fbsm-pEhTj3gr6H0',
              alt: 'Datacenter',
              title: 'Core Infrastructure v2',
              desc: 'Migração total para nuvem híbrida com disponibilidade de 99.999% para gigante do e-commerce.',
            },
            {
              src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwAtphdzKxt0AGB_KL2IiBEg2_bu-Qz9Qt0TsPx3njlFw0Kimt5v_i1L09QQzYdjT-CecwgaoJUe4Kys5ZRDj_4eUdWpTdg7MjohIjFxmUxC_lJwDjlIDvZCdHcx8yptDCciuJwIdStDfGMUU6MUbhhkE_mY721C1pvPC0KB-Hn6K6SjpZWxSJx8btniCo8kjekbO7CoTzqZs1Jd8ygqaJujVl58u3iwV1C3wMYzXP43M7NokxwkgQK6XccSrlfpFi2yM9WFLrTtc',
              alt: 'Rede de Satélites',
              title: 'Signal Connect',
              desc: 'Sistema de comunicação via satélite de baixa órbita para monitoramento de frotas em áreas remotas.',
            },
          ].map(({ src, alt, title, desc }) => (
            <div
              key={title}
              className="md:col-span-6 group rounded-xl bg-surface-container-low overflow-hidden transition-all hover:bg-surface-container-high"
            >
              <div className="aspect-video w-full">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-headline font-bold mb-2">{title}</h4>
                <p className="text-on-surface-variant text-sm mb-4">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Clientes ── */}
      <section className="bg-surface-container-low py-32">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-4 text-on-surface">
                Nossos Clientes
              </h2>
              <p className="text-on-surface-variant text-lg">
                Parcerias estratégicas com empresas que lideram a fronteira
                tecnológica global.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-400">
                Projetos entregues em 12 países
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0.5 bg-outline-variant/10 rounded-xl overflow-hidden border border-outline-variant/5">
            {[
              'QUANTUM','SYNERGY','APEX.IO','VELOCITY','HORIZON','SPHERE',
              'NEXUS','STRATOS','ORBITAL','PRISM','ECLIPSE','CORE.CO',
            ].map((name) => (
              <div
                key={name}
                className="bg-surface p-12 flex items-center justify-center group transition-colors hover:bg-surface-container-lowest"
              >
                <div className="text-xl font-black text-slate-500 group-hover:text-primary transition-colors opacity-40 group-hover:opacity-100">
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-screen-2xl mx-auto px-8 py-32 text-center">
        <div className="bg-gradient-to-br from-primary-container/20 to-transparent p-20 rounded-2xl border border-primary/10 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-5xl font-headline font-extrabold mb-6">
              Pronto para elevar seu{' '}
              <span className="text-primary">padrão tecnológico</span>?
            </h2>
            <p className="text-xl text-on-surface-variant mb-10 max-w-2xl mx-auto">
              Nossa equipe de engenheiros está pronta para transformar seu próximo
              grande desafio em realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                className="bg-primary text-on-primary px-10 py-4 font-headline font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,218,243,0.3)] transition-all active:scale-95"
              >
                Iniciar Projeto
              </Link>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* ── Floating Status Badge ── */}
      <div className="fixed bottom-8 right-8 bg-surface-container-high/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 flex items-center gap-3 shadow-xl z-50">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">
          Systems Operational
        </span>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to http://localhost:3000/projetos. Expected: hero with large "Projetos de Alta Precisão" headline, bento grid with 5 projects, client logos grid, CTA section, and fixed floating badge at bottom-right.

- [ ] **Step 3: Commit**

```bash
git add src/app/projetos/page.tsx
git commit -m "feat: Projetos page — bento grid, clients, CTA, floating badge"
```

---

## Task 10: ContactForm Client Component

**Files:**
- Create: `src/components/ContactForm.tsx`

This component is `'use client'` because it manages form state, loading state, and success/error feedback.

- [ ] **Step 1: Create src/components/ContactForm.tsx**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "feat: ContactForm client component with loading and success/error states"
```

---

## Task 11: Contato Page

**Files:**
- Create: `src/app/contato/page.tsx`

- [ ] **Step 1: Create src/app/contato/page.tsx**

```typescript
import ContactForm from '@/components/ContactForm'

export default function ContatoPage() {
  return (
    <main className="pt-32 pb-24">
      {/* ── Hero ── */}
      <section className="mb-20 max-w-screen-2xl mx-auto px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00daf3]" />
          <span className="text-primary font-headline font-bold tracking-widest text-xs uppercase">
            Conecte-se à Precisão
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-on-background tracking-tighter mb-6 leading-tight">
          Vamos transformar sua{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container">
            visão em código.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl font-body leading-relaxed">
          Engenharia de alta performance para projetos que demandam escalabilidade,
          segurança e design de ponta. Inicie seu orçamento agora.
        </p>
      </section>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-screen-2xl mx-auto px-8">
        {/* Form card */}
        <div className="lg:col-span-7 bg-surface-container-low p-8 md:p-12 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
          <h2 className="text-2xl font-headline font-bold mb-8 text-on-surface">
            Solicitar Orçamento
          </h2>
          <ContactForm />
        </div>

        {/* Contact info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
            <h3 className="text-xl font-headline font-bold mb-6">
              Canais Diretos
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: 'mail',
                  label: 'E-mail Comercial',
                  value: 'contato@harpialab.com',
                  href: 'mailto:contato@harpialab.com',
                },
                {
                  icon: 'call',
                  label: 'Telefone',
                  value: '+55 (11) 4003-0000',
                  href: 'tel:+551140030000',
                },
                {
                  icon: 'location_on',
                  label: 'Sede Tecnológica',
                  value: 'Av. Paulista, 1000 — São Paulo, SP',
                  href: undefined,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 flex-shrink-0">
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-headline font-bold text-slate-500 uppercase">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-on-surface font-medium hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-on-surface font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative image */}
          <div className="relative rounded-xl overflow-hidden aspect-video group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXppTyZLdwZEceIECRLsSK7yzmA_uGSxK6iSybHuCBlyxdT-DZICO6AsyhkrcaUzC5PvIdjIu2P2unIA68OtSehFWzOyjTCWky0HWAhmTl494Sr04-ypelXYOi0oirKfUKZXWBVq13VqgsALTvxKBwoCCOkx6mfka9bHRLZXCeblz2kRJy4ToqddPkHKzm6EK7ctj758bxNxNRebx5vECWehFIDPs98W8QXV8JkcuYZQsJmNZbRbYX8YEj9a2fOqVKNlQUr-q4DnE"
              alt="Harpia Lab Tech Environment"
              className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-700"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <p className="text-primary font-headline font-bold text-sm">
                Disponibilidade 24/7
              </p>
              <p className="text-slate-400 text-xs">
                Sistemas monitorados em tempo real
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-between opacity-50 px-2">
            <span className="text-xs font-headline font-bold">AWS PARTNER</span>
            <span className="text-xs font-headline font-bold">ISO 27001</span>
            <span className="text-xs font-headline font-bold">SOC2 COMPLIANT</span>
          </div>
        </div>
      </div>

      {/* ── Processo de Atendimento ── */}
      <section className="mt-32 max-w-screen-2xl mx-auto px-8">
        <h2 className="text-3xl font-headline font-bold mb-12 text-center">
          Processo de Atendimento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: '01',
              title: 'Análise Técnica',
              desc: 'Nossa equipe de arquitetos avalia a viabilidade e os requisitos técnicos da sua demanda em até 24h.',
            },
            {
              num: '02',
              title: 'Proposta de Valor',
              desc: 'Apresentamos um escopo detalhado com cronograma, tecnologias sugeridas e investimento necessário.',
            },
            {
              num: '03',
              title: 'Kick-off',
              desc: 'Início imediato do desenvolvimento com reuniões semanais de acompanhamento e entregas contínuas.',
            },
          ].map(({ num, title, desc }) => (
            <div
              key={num}
              className="p-8 border-l border-primary/20 hover:border-primary transition-colors duration-500"
            >
              <span className="text-4xl font-headline font-black text-primary/20 mb-4 block">
                {num}
              </span>
              <h4 className="text-lg font-headline font-bold mb-2">{title}</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to http://localhost:3000/contato. Expected: hero with gradient headline, form card on left + contact info on right, process steps at bottom. Submit form with empty fields — browser validation should prevent submission.

- [ ] **Step 3: Commit**

```bash
git add src/app/contato/page.tsx
git commit -m "feat: Contato page — hero, form grid, contact info, process steps"
```

---

## Task 12: API Route + Resend

**Files:**
- Create: `src/app/api/contact/route.ts`
- Create: `.env.local`
- Create: `.env.example`

- [ ] **Step 1: Install Resend SDK**

```bash
npm install resend
```

Expected output: `added 1 package` (or similar — resend has minimal dependencies).

- [ ] **Step 2: Create .env.local**

Create the file `.env.local` at the project root:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Replace `re_xxx...` with your actual key from https://resend.com/api-keys (free account, create key with "Sending access").

- [ ] **Step 3: Create .env.example**

```
RESEND_API_KEY=
```

- [ ] **Step 4: Create src/app/api/contact/route.ts**

```typescript
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
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
```

> **Note on `from` address:** Resend's free tier requires sending from `onboarding@resend.dev` until you verify a custom domain. Once you add and verify `harpialab.com` in your Resend dashboard, change `from` to `'Harpia Lab Site <noreply@harpialab.com>'`.

- [ ] **Step 5: Test the form end-to-end**

With `npm run dev` running:
1. Go to http://localhost:3000/contato
2. Fill all fields with valid data
3. Click "Enviar Solicitação"
4. Expected: button shows spinner, then form is replaced with "Mensagem enviada!" confirmation

If you see a 500 error, verify `RESEND_API_KEY` in `.env.local` is correct and restart the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/app/api/contact/route.ts .env.example package.json package-lock.json
git commit -m "feat: API route for contact form using Resend"
```

---

## Task 13: Final Polish + Deploy Prep

**Files:**
- Modify: `src/app/layout.tsx` (add favicon meta)
- No other changes

- [ ] **Step 1: Verify all 4 pages render without errors**

With `npm run dev` running, visit each page and confirm no console errors:
- http://localhost:3000 — Home
- http://localhost:3000/sobre — Sobre
- http://localhost:3000/projetos — Projetos
- http://localhost:3000/contato — Contato

Also verify on mobile viewport (browser devtools responsive mode): navbar hamburger opens/closes correctly.

- [ ] **Step 2: Build for production**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no errors. If there are TypeScript errors, fix them before proceeding.

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "chore: production build verified, project ready for Vercel deploy"
```

- [ ] **Step 4: Deploy to Vercel (manual step)**

1. Push to GitHub: create a new repo at github.com, then:
```bash
git remote add origin https://github.com/<your-username>/harpia-site.git
git branch -M main
git push -u origin main
```
2. Go to https://vercel.com/new → Import the repository
3. In "Environment Variables", add: `RESEND_API_KEY` = your Resend API key
4. Click Deploy

---

## Summary

| Task | Deliverable |
|------|-------------|
| 1 | Scaffold + git |
| 2 | Tailwind design system |
| 3 | globals.css + next.config.ts |
| 4 | Root layout with fonts |
| 5 | Navbar (active state, mobile menu) |
| 6 | Footer (4 cols, status dot) |
| 7 | Home page (4 sections) |
| 8 | Sobre page (4 sections) |
| 9 | Projetos page (4 sections + floating badge) |
| 10 | ContactForm client component |
| 11 | Contato page (hero + form + process) |
| 12 | API Route + Resend integration |
| 13 | Build verification + Vercel deploy |
