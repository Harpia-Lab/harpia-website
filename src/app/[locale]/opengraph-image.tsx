import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getDictionary, locales } from '@/lib/getDictionary'

// Card de compartilhamento (WhatsApp, LinkedIn) na identidade da Harpia Lab: papel, Curioso + "Harpia Lab" em azul Harpia.
// next/og não lê woff2 nem o next/font: a Onest vai como .ttf em src/assets/fonts (OFL).
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Harpia Lab'

// Gera no build, um por idioma (sem isso a rota fica dinâmica)
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const mascot = `data:image/svg+xml;base64,${await readFile(join(process.cwd(), 'public/brand/curioso.svg'), 'base64')}`
const fonts = [
  { name: 'Onest', weight: 500 as const, data: await readFile(join(process.cwd(), 'src/assets/fonts/Onest-Medium.ttf')) },
  { name: 'Onest', weight: 700 as const, data: await readFile(join(process.cwd(), 'src/assets/fonts/Onest-Bold.ttf')) },
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#f7f7f5',
          fontFamily: 'Onest',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <img src={mascot} width={84} height={84} alt="" />
          <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1.4, color: '#0f3555' }}>Harpia Lab</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 84, fontWeight: 700, lineHeight: 1.04, letterSpacing: -3 }}>
            <span style={{ color: '#0f3555' }}>{hero.title}&nbsp;</span>
            <span style={{ color: '#3d6f9e' }}>{hero.titleAccent}</span>
          </div>
          <span style={{ fontSize: 32, fontWeight: 500, color: '#4b525c' }}>{footer.tagline}</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
