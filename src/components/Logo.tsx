// Logo da Harpia Lab (manual, M03): o Curioso à esquerda + "Harpia Lab" em Onest Bold azul Harpia.
// Mascote sempre pequeno; no fundo escuro só o nome, em branco.
// Abaixo de 360px (barra do topo) só o mascote, para caber o botão de orçamento.
interface LogoProps {
  inverted?: boolean
}

export default function Logo({ inverted = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2">
      {!inverted && (
        // eslint-disable-next-line @next/next/no-img-element -- SVG pequeno, next/image não otimiza SVG
        <img src="/brand/curioso.svg" alt="" width={30} height={30} className="size-[30px]" />
      )}
      <span
        className={`font-headline text-[1.2rem] font-bold tracking-[-0.03em] whitespace-nowrap ${inverted ? 'text-white' : 'text-primary max-[359px]:sr-only'}`}
      >
        Harpia Lab
      </span>
    </span>
  )
}
