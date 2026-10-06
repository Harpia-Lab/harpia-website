'use client'

interface SpotlightProps {
  children: React.ReactNode
  className?: string
}

// Expõe a posição do cursor em --mx/--my para o foco de luz (.spotlight-* em globals.css)
export default function Spotlight({ children, className = '' }: SpotlightProps) {
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div onPointerMove={handlePointerMove} className={`group relative ${className}`}>
      <div
        aria-hidden="true"
        className="spotlight-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
      <div
        aria-hidden="true"
        className="spotlight-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  )
}
