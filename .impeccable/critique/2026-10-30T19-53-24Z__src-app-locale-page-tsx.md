---
target: homepage
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/tiagothomen/Documents/work/harpia/harpia-website/.claude/worktrees/agent-a4771c8fc98c065dd/src/app/[locale]/page.tsx"
target_fingerprint: "sha256:433386fb0be03cafef95a1b6b454ab03b387ffd9c919864f4b831655de36d90e"
target_path: /Users/tiagothomen/Documents/work/harpia/harpia-website/.claude/worktrees/agent-a4771c8fc98c065dd/src/app/[locale]/page.tsx
timestamp: 2026-10-30T19-53-24Z
slug: src-app-locale-page-tsx
---
Method: dual-agent (A: design review · B: detector + overlay)
Target: src/app/[locale]/page.tsx (homepage, Persuade), branch feat/nova-identidade

## Design Health Score: 22/32 (7 and 10 n/a)
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of status | 3 | Nav order Produtos/Serviços/Processo ≠ page order (Serviços first): active underline jumps backward |
| 2 | Match real world | 3 | PT plain; EN "Software Factory", "PDV" unexplained |
| 3 | User control | 3 | Menu Esc/tap-out, balanced consent |
| 4 | Consistency | 2 | Each product panel own type/radius/button/CTA pattern; Control lacks "learn more" link |
| 5 | Error prevention | 3 | Placeholders repeat labels |
| 6 | Recognition | 3 | — |
| 7 | Flexibility | n/a | one-scroll persuasion page |
| 8 | Aesthetic/minimalist | 2 | 7 font families, 4 color worlds, "24h" said 4x |
| 9 | Error recovery | 3 | errors color-only, only first error focused |
| 10 | Help | n/a | marketing page |

## Specificity
Half-specific. Product mockups (Pix, "Noite de sexta · 22h", fictional-data labels) are authored; Harpia shell (pill eyebrow, two-tone headline, check highlights, 3 icon-tile cards, 4 numbered steps) is template. Detector agrees: icon-tile-stack x3 at page.tsx:141. overused-font (Instrument Sans 55%) = false positive (body font share). CLI static scan clean.

## Priority issues
- [P1] No proof at conversion moment: no clients, cases, numbers, or person near form (team removed in 6876a43). Fix: proof strip + named responder by form.
- [P1] Product panels hijack hierarchy: Control coral-on-black CTA (page.tsx:204) outweighs navy hero CTA; three foreign type systems. Fix: product color/type inside mockups only, panels in Harpia shell.
- [P2] 7 font families in layout.tsx:2-64; JetBrains Mono preloaded for PT/EN switch + 3 figures. Fix: drop Mono (tabular-nums), cut product fonts if panels unified.
- [P2] IA/labels: nav vs section order; product name is <span>, tagline is <h3> (page.tsx:165-168) so heading outline has no product names; "Quero um sistema assim" ambiguous; Control no learn-more link.
- [P2] Services cards: icon-tile-stack x3, subtitle promises "choose by moment" but cards never say when.
- [P3] EN copy reads translated.

## Personas
SMB owner: PDV CTA leaves site same tab, no terminal/price info, no testimonial. Mobile 390: product stretch ~2400px, mockup after CTA, Fellows card orphans "1,2 km", form ~6000px down. SR/keyboard: headings lack product names, logo href="#", later field errors silent.

## Minor
Hero aside dead block lower right (items-start); resize-none textarea; no LGPD line under form; h1 hero-enter delays LCP; WhatsApp env-gated.
