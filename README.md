# Harpia Lab — Site Institucional

Site institucional da [Harpia Lab](https://harpialab.com), uma software factory e consultoria técnica de alta performance.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| Estilo | Tailwind CSS v4 |
| Linguagem | TypeScript |
| Envio de e-mail | Resend |
| Fontes | Manrope + Inter (Google Fonts via `next/font`) |
| Deploy | Vercel |

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Home — hero, serviços, projetos em destaque, logos de clientes |
| `/sobre` | Sobre Nós — missão, valores, equipe, CTA |
| `/projetos` | Portfólio — bento grid de projetos e grid de clientes |
| `/contato` | Contato — formulário de orçamento e informações de contato |

## Desenvolvimento local

**1. Clone e instale as dependências:**

```bash
git clone git@github.com:Harpia-Lab/harpia-website.git
cd harpia-website
npm install
```

**2. Configure as variáveis de ambiente:**

```bash
cp env.example .env.local
```

Edite `.env.local` e adicione sua chave do [Resend](https://resend.com/api-keys):

```
RESEND_API_KEY=re_sua_chave_aqui
```

**3. Rode o servidor de desenvolvimento:**

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy no Vercel

### 1. Importe o projeto

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Conecte sua conta do GitHub e selecione o repositório `Harpia-Lab/harpia-website`
3. Clique em **Deploy** — as configurações são detectadas automaticamente

### 2. Configure a variável de ambiente

Em **Settings → Environment Variables**, adicione:

| Variável | Valor |
|----------|-------|
| `RESEND_API_KEY` | Sua chave do Resend |

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
| `RESEND_API_KEY` | Chave de API do Resend para envio de e-mails | Sim (em produção) |

> **Nota sobre o `from` do e-mail:** O plano gratuito do Resend envia de `onboarding@resend.dev`. Para enviar de `noreply@harpialab.com`, verifique o domínio em [resend.com/domains](https://resend.com/domains) e atualize o campo `from` em `src/app/api/contact/route.ts`.
