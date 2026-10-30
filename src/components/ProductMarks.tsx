// Marcas dos produtos, copiadas dos sites deles (pdv-website, control-website e fellows-website). Mudou lá → muda aqui.
// Ordem: Harpia PDV, Harpia Control, Fellows (manual, M10).

// PDV: o ponto verde-água sobre o roxo (ícone do mockup da marca)
export function PdvMark({ className = 'size-10' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-lg bg-pdv-accent ${className}`}>
      <span className="size-[31%] rounded-full bg-pdv-teal-bright" />
    </span>
  )
}

// Control: as asas abertas da harpia sobre o teal (tema escuro do Control)
export function ControlMark({ className = 'size-10' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-[10px] bg-accent text-ink ${className}`}>
      <svg viewBox="0 0 24 24" className="size-[56%]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10c4-6 14-6 18 0" />
        <path d="M12 10v10" />
        <path d="M8 14l4 6 4-6" />
      </svg>
    </span>
  )
}

// Fellows: dois círculos que se cruzam, gente junta, sobre o cobalto (marca provisória)
export function FellowsMark({ className = 'size-10' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-md bg-fellows-accent text-white ${className}`}>
      <svg viewBox="0 0 24 24" className="size-[66%]" fill="none" stroke="currentColor" strokeWidth="2.25">
        <circle cx="9" cy="12" r="5.25" />
        <circle cx="15" cy="12" r="5.25" />
      </svg>
    </span>
  )
}
