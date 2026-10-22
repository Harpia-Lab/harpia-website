---
target: homepage harpialab.com
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/tiagothomen/Documents/work/harpia/harpia-website/src/app/[locale]/page.tsx"
target_fingerprint: "sha256:077e200cb11d34412f3e5fb0b59f1c5425a1f1d28b7c9b692b682b126ed67b3a"
target_path: /Users/tiagothomen/Documents/work/harpia/harpia-website/src/app/[locale]/page.tsx
timestamp: 2026-10-22T16-54-23Z
slug: src-app-locale-page-tsx
---
Method: dual-agent (A: design review · B: detector + overlay)
Target: harpialab.com, página única (`src/app/[locale]/page.tsx`), /pt e /en, 1440 e 390px. Mode: Persuade.

## Design Health Score

| # | Heurística | Nota | Problema-chave |
|---|---|---|---|
| 1 | Visibilidade do status | 3 | Nav ativa, barra de progresso e "Enviando…" ok; erro do form é uma linha solta, sem ligação com o campo |
| 2 | Linguagem do mundo real | 2 | Hero fala com dev ("lint + typecheck", "212 passed", "Da ideia ao deploy"); quem compra é muitas vezes dono de negócio |
| 3 | Controle e liberdade | 2 | Menu mobile não fecha com Esc nem com toque fora; PT/EN perde a posição na página |
| 4 | Consistência | 2 | Dois CTAs coral idênticos com destinos opostos; cards de serviço reagem a hover sem serem clicáveis; erro do servidor em PT no /en |
| 5 | Prevenção de erro | 2 | `a@b` passa no browser e falha no servidor; sem `maxLength` (servidor corta em 200/5000) |
| 6 | Reconhecimento | 3 | Página única com âncoras, nada a memorizar |
| 7 | Flexibilidade | n/a | Landing de caminho único |
| 8 | Estética minimalista | 3 | Tipografia contida; seis camadas decorativas empilhadas (aurora, grade, borda gradiente, shine, spotlight, progresso) |
| 9 | Recuperação de erro | 2 | Mensagem genérica, sem `aria-invalid`/`aria-describedby`, sem "ou mande e-mail direto" |
| 10 | Ajuda | n/a | Landing; mas falta o FAQ que o comprador quer (prazo, preço, modelo de contrato) |
| **Total** | | **19/32** | **Aceitável (59%)** |

## Veredito de especificidade

**Avaliação de design:** ~60% template. O que é da Harpia: a paleta "Altitude" (creme, teal, coral, Bricolage + Instrument Sans) compartilhada com o Control, e o `ControlMockup` (R$, parcelas, "Lembrete enviado", "Aceito online"), único elemento que um comprador não encontra em outra agência. O resto é kit genérico: terminal `git push origin main` no hero, 4 cards numerados de serviço, Descoberta → Arquitetura → Desenvolvimento → Entrega, e o mesmo eyebrow mono + linha gradiente + aurora + grade mascarada em toda seção. Brasil só aparece em "Feito no Brasil" e no R$. Nenhum cliente, case, número, cidade, CNPJ ou WhatsApp.

**Scan determinístico:** CLI limpa (exit 0) com 1 aviso: `codex-grid-background` em `globals.css:86` (`.bg-grid`, usado em `page.tsx:50,139,246`). Overlay: 13 padrões no /pt, 8 no /en.
- Concordam com a revisão: `kicker-above-heading` ×3 + `hero-eyebrow-chip` (o eyebrow repetido do `SectionHeader`), `codex-grid-background`, `dark-glow` no CTA do Control (`page.tsx:166`), `overused-font` (Instrument Sans).
- Pegou o que a revisão não pegou: `straggler` ×4 e `unbalanced-heading` ×1 só no PT: parágrafos e `h3` dos cards sem `text-wrap: pretty/balance`.
- Falsos positivos: `low-contrast` em `HeroTerminal.tsx:40` (terminal é `aria-hidden`, decorativo); `blinking-cursor` (já atrás de `prefers-reduced-motion`); `cream-palette` (é a identidade Altitude, escolha deliberada).

**Overlays:** visíveis nas abas **[Human]** do Chrome (/pt e /en).

## Impressão geral

Base visual cuidada e acessível, mas a página vende para o leitor errado e esconde a única prova que tem. O Harpia Control é o melhor argumento do site e chega como "Também criamos…" na terceira seção. Maior oportunidade: transformar o Control em case e prova, logo depois do hero.

## O que funciona

1. **Contraste calibrado de propósito.** Texto variante 5.13:1, CTA 5.56:1, variante em seção escura 6.22:1, teal 8.70:1. Focus ring visível e com cor própria em fundo escuro (`globals.css:70-78`).
2. **`ControlMockup` é a melhor persuasão da página.** HTML, não screenshot; moeda via `Intl` em BRL; `role="img"` com label; barra de pagamento enche no scroll.
3. **Movimento disciplinado.** Tudo atrás de `prefers-reduced-motion: no-preference` (`globals.css:258`), estado estático completo, efeitos de scroll em CSS.

## Problemas prioritários

**[P1] Hero fala com dev, e a página não tem prova**
- Por quê: quem assina contrato de software sob medida lê "parcelas", não "lint + typecheck". Sem cliente, case ou número, o visitante não tem o que verificar.
- Correção: trocar o terminal por uma prova de resultado; tratar o Harpia Control como case ("software que construímos e operamos em produção") logo após o hero; tirar o "Também" de `pt.ts:44`; 1–3 linhas de case com resultado.
- Comando: /impeccable clarify (copy) + /impeccable layout (ordem das seções)

**[P1] CTA rival leva a uma tela de login**
- Por quê: "Acessar o Harpia Control" (`page.tsx:164-170`) tem o mesmo coral, tamanho e shine de "Solicitar orçamento" e manda o prospect para `control.harpialab.com`, que é login. Dois objetivos primários, e um é beco sem saída.
- Correção: virar link secundário (outline/texto), "Conhecer o Harpia Control", apontando para o control-website.
- Comando: /impeccable distill

**[P1] Contato sem confiança e sem canal local**
- Por quê: o fim da página é o momento mais fraco (peak-end ao contrário). Só tem form; B2B no Brasil passa por WhatsApp. Sucesso diz "Retornaremos em breve", mais fraco que o "até 24h" logo acima.
- Correção: WhatsApp ao lado do e-mail + cidade/CNPJ; linha "o que acontece depois" sob o botão; chips opcionais de tipo de projeto/faixa; sucesso repete as 24h e o e-mail de resposta.
- Comando: /impeccable onboard (fim de jornada) + /impeccable clarify

**[P2] Formulário frágil**
- `<form onSubmit>` sem `method`/`action` (`ContactForm.tsx:67`): submit antes da hidratação ou sem JS faz GET e põe nome, e-mail e mensagem na URL, o que viola a regra de nada de PII em URL.
- Erros hardcoded em PT no `route.ts:53,77` aparecem no /en.
- Sem `aria-invalid`/`aria-describedby`, sem `maxLength` 200/5000, input type="email" aceita `a@b`.
- Rate limit roda antes da validação (`route.ts:45`): quem erra 5 vezes fica bloqueado.
- `from: onboarding@resend.dev` (`route.ts:92`) é o remetente sandbox do Resend, risco de entregabilidade na conversão principal.
- Correção: `method="post" action="/api/contato"`; servidor devolve código de erro, front traduz pelo dicionário; validação por campo; rate limit depois da validação; domínio verificado no Resend (ação de infra).
- Comando: /impeccable harden

**[P2] Serviços repetidos e com falso affordance**
- "Fábrica de Software (web, mobile…)" e "Desenvolvimento Web & Mobile" se sobrepõem (`pt.ts:36-38`). Cards levantam e brilham no hover (`page.tsx:119`, `Spotlight`) sem serem clicáveis; os números 01–04 sugerem sequência.
- Correção: 3 ofertas separadas por modelo de contratação (escopo fechado, squad alocado, consultoria por hora); tirar hover e numeração.
- Comando: /impeccable distill

## Red flags por persona

**Jordan (primeira vez, não técnico):** "lint + typecheck", "212 passed", "deploy → production", "stack", "MVP", "back-end"; não distingue Fábrica de Software de Web & Mobile; nenhum prazo, preço ou modelo de contrato; o CTA do produto cai num login.

**Riley (stress tester):** `a@b` passa no browser e falha no servidor; mensagem acima de 5000 só é rejeitada depois do envio; erro em PT no /en; balão nativo segue o idioma do browser ("Please fill out this field." no /pt); rate limit conta tentativas inválidas; submit pré-hidratação vaza PII na URL.

**Casey (mobile, distraído):** 7523px, ~9 telas, sem CTA fixo (contato exige hambúrguer + toque); inputs de 14px fazem o iOS dar zoom no foco; menu sem backdrop e sem fechar com Esc/toque fora; links do rodapé com 20px de alvo; animação do terminal roda abaixo da dobra; em Produtos o CTA vem antes do mockup (pedido antes da prova).

## Observações menores

- Borda dos inputs `#e5dfd6` sobre `#fdfcfa` = 1.29:1 (WCAG 1.4.11 pede 3:1).
- Navbar fica cinza-lama sobre as seções escuras (`bg-background/80` sobre ink).
- Sem skip link; os dois `<nav>` sem `aria-label`; `scroll-smooth` no `<html>` ignora reduced motion (`layout.tsx:78`).
- Sem `og:image` (`layout.tsx:53`): link no WhatsApp/LinkedIn sai sem card.
- "Co-founder" em inglês no PT (`pt.ts:88`) enquanto o subtítulo diz "cofundadores"; registro alterna "a gente retorna" / "Respondemos".
- Equipe: três "Co-founder" idênticos, fotos de evento (lustre, charuto em `cm.png`), sem LinkedIn nem especialidade.
- ~240px vazios depois do hero, bem na dobra de 900px: parece fim de página.
- Parágrafos e `h3` dos cards sem `text-wrap: pretty` (stragglers no PT).
- Specs em `docs/superpowers/specs/` desatualizadas (dark cyan, depois navy); a intenção "Altitude" só existe em comentário de CSS; não há DESIGN.md nem PRODUCT.md.

## Perguntas para pensar

1. Se o Harpia Control é a única coisa verificável aqui, por que ele entra como "Também" na terceira seção em vez de ser a prova do hero?
2. Quem assina o contrato: um CTO que lê `lint + typecheck` ou um dono de negócio que lê "parcelas"? Hoje o hero fala com um e a seção de produto com o outro.
3. Quantos leads brasileiros saem calados num bloco de contato só com formulário, sem WhatsApp?
