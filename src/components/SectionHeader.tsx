interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={className}>
      <h2 className="font-headline text-[2rem] leading-[1.15] font-bold tracking-[-0.03em] text-balance text-primary md:text-[2.4rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-[40rem] text-on-surface-variant">{subtitle}</p>
      )}
    </div>
  )
}
