# Harpia Lab — Site Institucional

Site institucional da [Harpia Lab](https://harpialab.com), uma software factory e consultoria técnica de alta performance.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16.4 (App Router) |
| Estilo | Tailwind CSS v4 |
| Linguagem | TypeScript |
| Envio de e-mail | Resend |
| Fontes | Bricolage Grotesque + Instrument Sans + JetBrains Mono (Google Fonts via `next/font`) |
| Deploy | Vercel |

## Páginas

Página única por idioma, em `src/app/[locale]/page.tsx`, com as seções `#servicos`, `#produtos`, `#processo`, `#equipe` e `#contato`.

| Rota | Descrição |
|------|-----------|
| `/` | Redireciona para `/pt` (`next.config.ts`) |
| `/pt`, `/en` | Site em português e inglês; textos em `src/dictionaries/` |
| `/api/contato` | `POST` do formulário de contato → e-mail via Resend (`src/app/api/contato/route.ts`) |

`proxy.ts` (o antigo middleware no Next 16) adiciona o prefixo de idioma às rotas sem ele.

## Desenvolvimento local

**1. Clone e instale as dependências:**

```bash
git clone git@github.com:Harpia-Lab/harpia-website.git
cd harpia-website
npm install
```

**2. Configure as variáveis de ambiente:**

```bash
cp .env.local.example .env.local
```

Edite `.env.local` com sua chave do [Resend](https://resend.com/api-keys) e o e-mail que recebe os contatos:

```
RESEND_API_KEY=re_sua_chave_aqui
CONTACT_TO_EMAIL=voce@exemplo.com
```

**3. Rode o servidor de desenvolvimento:**

```bash
npm run dev
```

Acesse [http://localhost:3000/pt](http://localhost:3000/pt).

## Deploy no Vercel

### 1. Importe o projeto

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Conecte sua conta do GitHub e selecione o repositório `Harpia-Lab/harpia-website`
3. Clique em **Deploy** — as configurações são detectadas automaticamente

### 2. Configure as variáveis de ambiente

Em **Settings → Environment Variables**, adicione:

| Variável | Valor |
|----------|-------|
| `RESEND_API_KEY` | Sua chave do Resend |
| `CONTACT_TO_EMAIL` | E-mail que recebe os contatos do formulário |

### 3. Configure o domínio

Em **Settings → Domains**, adicione `harpialab.com` e configure os registros DNS na GoDaddy:

| Tipo | Nome | Valor |
|------|------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

O certificado SSL é emitido automaticamente.

## Variáveis de ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `RESEND_API_KEY` | Chave de API do Resend para envio de e-mails | Sim |
| `CONTACT_TO_EMAIL` | Destinatário dos contatos do formulário | Sim |

Sem qualquer uma das duas, `/api/contato` responde 500 com erro genérico.

> **Nota sobre o `from` do e-mail:** O plano gratuito do Resend envia de `onboarding@resend.dev`. Para enviar de `noreply@harpialab.com`, verifique o domínio em [resend.com/domains](https://resend.com/domains) e atualize o campo `from` em `src/app/api/contato/route.ts`.

> **Proteções do formulário:** honeypot e rate limit em memória por IP (5 envios a cada 10 min, por instância).
