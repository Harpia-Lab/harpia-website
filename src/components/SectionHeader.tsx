interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={className}>
      <h2 className="font-headline text-3xl font-extrabold tracking-tight text-balance text-on-surface md:text-[2.5rem] md:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-on-surface-variant">{subtitle}</p>
      )}
    </div>
  )
}
