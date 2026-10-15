<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Analytics

- GA4 com consentimento LGPD em `src/lib/analytics.ts` (banner opt-in: nada carrega antes do "Aceitar"). Regras de PII, URL, consentimento e como adicionar evento: `harpia-control-web/docs/ANALYTICS.md` (`git -C ../harpia-control-web show origin/main:docs/ANALYTICS.md`).
- Feature nova define seus eventos no `Events` de `src/lib/analytics.ts`, um comentário por entrada (a pergunta que o evento responde). Parâmetros só uniões literais ou números: nada de texto livre nem dado do formulário.
- Env de build: `NEXT_PUBLIC_GA_MEASUREMENT_ID` (vazio = nada carrega, nem o banner; na Vercel só em Production) e `NEXT_PUBLIC_GA_DEBUG=1` (`debug_mode`, para testar no DebugView). Local: `.env.local`.
- PR com a seção Analytics do template; parâmetro novo que vira dimensão → "Ações de infra: registrar dimensão".
