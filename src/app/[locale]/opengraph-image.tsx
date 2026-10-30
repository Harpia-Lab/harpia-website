import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getDictionary, locales } from '@/lib/getDictionary'

// Card de compartilhamento (WhatsApp, LinkedIn) na direção B · Azul Harpia: fundo azul Harpia, frase do hero
// e o Curioso no arco branco apoiado na borda de baixo, como no topo do site.
// next/og não lê woff2 nem o next/font: a Sora vai como .ttf em src/assets/fonts (OFL).
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Harpia Lab'

// Gera no build, um por idioma (sem isso a rota fica dinâmica)
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const mascot = `data:image/svg+xml;base64,${await readFile(join(process.cwd(), 'public/brand/curioso.svg'), 'base64')}`
const fonts = [
  { name: 'Sora', weight: 500 as const, data: await readFile(join(process.cwd(), 'src/assets/fonts/Sora-Medium.ttf')) },
  { name: 'Sora', weight: 800 as const, data: await readFile(join(process.cwd(), 'src/assets/fonts/Sora-ExtraBold.ttf')) },
]

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { hero, footer } = getDictionary(locale)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#0f3555',
          color: '#ffffff',
          fontFamily: 'Sora',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, width: 900 }}>
          <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: 4 }}>
            HARPIA&nbsp;<span style={{ fontWeight: 500 }}>LAB</span>
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
              <span>{hero.title}&nbsp;</span>
              <span style={{ color: '#a7c4e0' }}>{hero.titleAccent}</span>
            </div>
            <span style={{ fontSize: 30, fontWeight: 500, color: '#c9d6e3' }}>{footer.tagline}</span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 72,
            bottom: 0,
            width: 280,
            height: 241,
            background: '#ffffff',
            borderRadius: '140px 140px 0 0',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <img src={mascot} width={196} height={196} alt="" />
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
