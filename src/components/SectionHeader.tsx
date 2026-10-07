interface EyebrowProps {
  children: React.ReactNode
  onInk?: boolean
  className?: string
}

export function Eyebrow({ children, onInk = false, className = '' }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.12em] sm:tracking-[0.18em] ${onInk ? 'text-accent' : 'text-primary'} ${className}`}
    >
      <span aria-hidden="true" className="h-px w-6 bg-linear-to-r from-brand to-brand-2" />
      {children}
    </span>
  )
}

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({ label, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={className}>
      <Eyebrow>{label}</Eyebrow>
      <h2 className="mt-5 font-headline text-3xl font-extrabold tracking-tight text-balance text-on-surface md:text-[2.5rem] md:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-on-surface-variant">{subtitle}</p>
      )}
    </div>
  )
}
