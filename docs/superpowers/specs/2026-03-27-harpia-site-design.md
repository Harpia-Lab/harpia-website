# Harpia Lab — Site Institucional: Design Spec

**Data:** 2026-03-27
**Status:** Aprovado

---

## Visão Geral

Site institucional da Harpia Lab (harpialab.com), uma software factory e consultoria técnica. O objetivo é apresentar a empresa, seus projetos e serviços, e permitir que potenciais clientes enviem solicitações de orçamento por e-mail.

---

## Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 (App Router) |
| Estilo | Tailwind CSS (config customizada com design system) |
| Linguagem | TypeScript |
| Envio de email | Resend (via API Route do Next.js) |
| Fontes | Google Fonts — Manrope (headlines) + Inter (body) |
| Ícones | Material Symbols Outlined (CDN) |
| Deploy | Vercel (automático via GitHub) |

---

## Design System

Cores (tema escuro, `darkMode: "class"`, classe `dark` sempre ativa no `<html>`):

```
background / surface: #111316
primary (cyan):       #00daf3
primary-container:    #009fb2
on-primary:           #00363d
on-surface:           #e2e2e6
on-surface-variant:   #c1c6d7
surface-container-low:     #1a1c1f
surface-container-high:    #282a2d
surface-container-highest: #333538
outline-variant:      #414755
```

Fontes:
- `font-headline` → Manrope (700, 800, 900)
- `font-body` / `font-label` → Inter (400, 500, 600)

Border-radius customizado (quase flat): `DEFAULT: 2px`, `lg: 4px`, `xl: 8px`

Glass panel: `backdrop-filter: blur(20px)` + `background: rgba(26,28,31,0.6)`

---

## Estrutura de Páginas

### `/` — Home
Seções:
1. **Hero** — headline grande, subtítulo, dois CTAs ("Solicite um Orçamento" / "Ver Portfólio"), imagem com status badge
2. **Brief Intro / Bento Grid** — headline "Engenharia Digital de Classe Mundial", parágrafo, 4 cards de serviços (Cloud Native, Cybersecurity, IA Aplicada, Back-end Robusto)
3. **Projetos em Destaque** — 2 cards com imagem, título e descrição; link "Ver todos"
4. **Client Logos** — grade de logos tipográficos (grayscale, hover colorido)

### `/sobre` — Sobre Nós & Equipe
Seções:
1. **Hero / Missão & História** — badge, headline, parágrafo, missão + visão, imagem com decoração
2. **Nossos Valores** — 3 valores numerados (01 Transparência, 02 Foco no Detalhe, 03 Inovação Pragmática)
3. **Nossa Equipe** — 3 cards com foto real, nome, cargo, descrição (conteúdo real a ser fornecido pelo cliente)
4. **CTA** — seção com gradiente "Vamos construir algo lendário juntos"

### `/projetos` — Projetos & Clientes
Seções:
1. **Hero** — headline "Projetos de Alta Precisão"
2. **Projects Bento Grid** — grid 12 colunas: 1 projeto grande (Project Chronos), 2 cards secundários (Vault Protocol, Helix DNA), 2 projetos médios (Core Infrastructure, Signal Connect)
3. **Clientes** — headline + grade 6x2 de logos tipográficos com hover
4. **CTA** — "Pronto para elevar seu padrão tecnológico?"

### `/contato` — Contato & Orçamento
Seções:
1. **Hero** — headline "Vamos transformar sua visão em código"
2. **Grid principal** — formulário (7/12 colunas) + info de contato (5/12)
   - Formulário: Nome, Email, Empresa, Descrição do Projeto → POST /api/contact
   - Info: E-mail, Telefone, Endereço; imagem decorativa; trust badges
3. **Processo de Atendimento** — 3 passos (Análise Técnica, Proposta de Valor, Kick-off)

---

## Componentes Compartilhados

### `Navbar`
- Fixada no topo, `backdrop-blur-xl`, `bg-[#111316]/60`
- Logo "Harpia Lab" em cyan
- Links de navegação com active state (border-bottom cyan na página atual)
- Botão "Fale Conosco" (desktop)
- Menu hambúrguer (mobile) — toggle de menu mobile com estado em `useState`

### `Footer`
- 4 colunas: marca + tagline | Navegação | Legal | Social & Contato
- Bottom bar: copyright + status "Sistemas Online" com dot animado
- Floating status badge (fixed, bottom-right) na página de Projetos

---

## API Route — Formulário de Contato

**Arquivo:** `src/app/api/contact/route.ts`

**Método:** POST
**Body esperado:**
```json
{
  "name": "string",
  "email": "string",
  "company": "string",
  "message": "string"
}
```

**Validação:** campos `name`, `email` e `message` são obrigatórios. Retorna `400` se ausentes.

**Envio:** Resend SDK — envia email para `contato@harpialab.com` com os dados formatados em HTML simples.

**Resposta de sucesso:** `{ "success": true }`
**Resposta de erro:** `{ "error": "mensagem" }` com status 400 ou 500.

**Variável de ambiente necessária:** `RESEND_API_KEY` (cadastrar no Vercel e em `.env.local` localmente).

**UX:** O botão de envio mostra estado de loading durante o request. Após sucesso, exibe mensagem de confirmação no lugar do form. Após erro, exibe mensagem de erro inline.

---

## Imagens

Os templates de referência usam URLs do Google AI (`lh3.googleusercontent.com`) que podem expirar. A implementação vai usar essas URLs inicialmente. Quando as imagens expirarem ou o cliente fornecer fotos reais, basta substituir o `src` nos componentes correspondentes. As fotos da equipe serão fornecidas pelo cliente com nomes e cargos reais.

---

## Git & Deploy

- Repositório Git inicializado localmente no diretório do projeto
- `.gitignore` incluindo `node_modules/`, `.env.local`, `.superpowers/`
- Deploy: conectar repositório ao Vercel via UI (vercel.com/import)
- Variável de ambiente `RESEND_API_KEY` configurada no dashboard do Vercel

---

## Fora do Escopo

- CMS ou painel de administração
- Blog ou seção de artigos
- Autenticação de usuários
- Internacionalização (i18n)
- Testes automatizados
- Analytics (pode ser adicionado facilmente via Vercel Analytics depois)
