// Logo da Harpia Lab (direção B · Azul Harpia): o Curioso num círculo branco + "HARPIA LAB" em Sora espaçada.
// Mascote sempre pequeno. Abaixo de 360px (barra do topo) só o mascote, para caber o botão de orçamento.
interface LogoProps {
  onDark?: boolean
  mark?: boolean
}

export default function Logo({ onDark = false, mark = true }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {mark && (
        <span className={`grid size-10 shrink-0 place-items-center rounded-full bg-white ${onDark ? '' : 'ring-1 ring-outline-variant'}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG pequeno, next/image não otimiza SVG */}
          <img src="/brand/curioso.svg" alt="" width={32} height={32} className="size-8" />
        </span>
      )}
      <span
        className={`font-headline text-base font-extrabold tracking-[0.14em] whitespace-nowrap uppercase ${onDark ? 'text-white' : 'text-primary'} ${mark ? 'max-[359px]:sr-only' : ''}`}
      >
        Harpia <span className="font-medium">Lab</span>
      </span>
    </span>
  )
}
