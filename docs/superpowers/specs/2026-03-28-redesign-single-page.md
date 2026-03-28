# Spec: Redesign — Página Única Harpia Lab

**Data:** 2026-03-28
**Status:** Aprovado

---

## Objetivo

Simplificar o site da Harpia Lab de múltiplas páginas para uma landing page única, limpa e objetiva. A empresa é nova, sem clientes ou projetos finalizados, então o site deve comunicar o que a empresa faz, quem é a equipe, e facilitar o contato.

---

## Decisões de Design

- **Tema:** Light (fundo branco, texto escuro)
- **Estrutura:** Single page com âncoras
- **Cor de acento:** Azul marinho `#1e3a5f` — alinhado com a logo
- **Tipografia:** Mantém Inter + Manrope existentes no projeto
- **Logo:** `public/images/logo-harpialab.png` na navbar e no footer

---

## Estrutura da Página (`src/app/page.tsx`)

Página única com as seguintes seções em ordem:

### 1. Navbar (componente existente — refatorado)
- Logo (`/images/logo-harpialab.png`) à esquerda
- Links de âncora: `#servicos`, `#equipe`
- CTA "Fale Conosco" → `#contato`
- Fundo branco com blur ao rolar
- **Remover:** links de rotas separadas (`/sobre`, `/projetos`, `/contato`)

### 2. Hero
- Badge: "Consultoria & Fábrica de Software"
- Título: "Transformamos ideias em software de verdade."
- Subtítulo: descrição objetiva do que a empresa faz
- CTAs: "Solicitar Orçamento" → `#contato` | "Conheça o time →" → `#equipe`
- **Sem imagem decorativa** — texto puro com espaçamento generoso

### 3. Serviços (`id="servicos"`)
- Label + título "Serviços"
- Grid 2×2 com 4 cards:
  1. **Fábrica de Software** — desenvolvimento sob demanda
  2. **Consultoria Técnica** — arquitetura, revisão, escolha de stack
  3. **Desenvolvimento Web & Mobile** — front ao back-end
  4. **Integrações & APIs** — conexão entre sistemas
- Cada card: ícone simples, título, descrição curta

### 4. Equipe (`id="equipe"`)
- Fundo levemente diferenciado (`#f1f5f9`)
- Grid 3 colunas com 3 cards
- Cada card: foto quadrada (`object-cover`, `object-position: top`), nome, cargo "Co-founder"
- Fotos: `ttt.jpeg`, `ggr.png`, `cm.png`

### 5. Contato (`id="contato"`)
- Layout 2 colunas: texto à esquerda, formulário à direita
- Texto: "Vamos conversar?" + descrição + e-mail `contato@harpialab.com`
- Formulário: Nome, E-mail, Mensagem, botão "Enviar mensagem"
- **Backend:** Resend API, envia para `tiago.trcz@gmail.com`
- **Sem:** endereço físico, telefone, certificações falsas, logos de clientes

### 6. Footer (componente existente — simplificado)
- Logo à esquerda
- Copyright à direita
- **Sem:** links de navegação extras, redes sociais placeholder

---

## Remoção de Conteúdo

Remover completamente:
- Página `/projetos` (`src/app/projetos/page.tsx`)
- Página `/sobre` (`src/app/sobre/page.tsx`)
- Página `/contato` (`src/app/contato/page.tsx`)
- Seção de logos de clientes fictícios
- Seção de projetos em destaque
- Floating badge "Systems Operational"
- Badges AWS PARTNER / ISO 27001 / SOC2
- Telefone e endereço físicos

---

## Integração Resend

- Instalar `resend` via npm
- Criar Route Handler: `src/app/api/contato/route.ts`
- Variável de ambiente: `RESEND_API_KEY`
- Destino: `tiago.trcz@gmail.com`
- Remetente: `no-reply@harpialab.com` (ou domínio verificado no Resend)
- Campos enviados: nome, e-mail do remetente, mensagem
- Resposta de sucesso/erro no formulário (sem redirect)

---

## Componentes

| Componente | Ação |
|---|---|
| `Navbar.tsx` | Refatorar: logo como `<Image>`, links âncora, remover rotas |
| `Footer.tsx` | Simplificar: logo + copyright |
| `ContactForm.tsx` | Atualizar: POST para `/api/contato`, feedback de sucesso/erro |

---

## Arquivos CSS / Config

- Manter `globals.css` existente
- Atualizar tema: trocar variável de cor primária (`--primary`) para azul marinho
- Remover tokens de tema escuro do `:root` (não são mais necessários na variante dark)
- Remover `dark` da classe do `<html>` em `layout.tsx`

---

## O que NÃO muda

- Stack: Next.js 14, TypeScript, Tailwind CSS
- Fontes: Inter + Manrope
- Deploy: Vercel
