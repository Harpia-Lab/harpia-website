import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getDictionary } from '@/lib/getDictionary'

// Card de compartilhamento (WhatsApp, LinkedIn): cores da paleta Altitude, mesma frase do hero.
// next/og não lê woff2 nem o next/font: a Bricolage vai como .ttf em src/assets/fonts (OFL).
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Harpia Lab'

const logo = `data:image/png;base64,${await readFile(join(process.cwd(), 'public/images/logo-mark.png'), 'base64')}`
const fonts = [
  { name: 'Bricolage', weight: 500 as const, data: await readFile(join(process.cwd(), 'src/assets/fonts/BricolageGrotesque-Medium.ttf')) },
  { name: 'Bricolage', weight: 800 as const, data: await readFile(join(process.cwd(), 'src/assets/fonts/BricolageGrotesque-ExtraBold.ttf')) },
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
          background: '#f7f5f1',
          fontFamily: 'Bricolage',
          borderTop: '12px solid #e8674a',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <img src={logo} width={88} height={66} alt="" />
          <span style={{ fontSize: 34, letterSpacing: 6, color: '#1b1916' }}>
            <b style={{ fontWeight: 800 }}>HARPIA</b>&nbsp;LAB
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            <span style={{ color: '#1b1916' }}>{hero.title}&nbsp;</span>
            <span style={{ color: '#0b746d' }}>{hero.titleAccent}</span>
          </div>
          <span style={{ fontSize: 32, fontWeight: 500, color: '#6e675d' }}>{footer.tagline}</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
