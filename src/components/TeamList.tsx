// Só os nomes; as fotos antigas saíram do repositório (ficam no histórico, se voltarem)
const team = ['Tiago Thomen Taraczuk', 'Gabriel Gomes Rapozo', 'Cezar Mauricio']

interface TeamListProps {
  role: string
  className?: string
}

export default function TeamList({ role, className = '' }: TeamListProps) {
  return (
    <ul className={`flex flex-col gap-7 md:gap-9 ${className}`}>
      {team.map((name) => (
        <li key={name} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <span className="font-headline text-2xl leading-tight font-semibold tracking-[-0.03em] text-balance text-on-surface md:text-[1.75rem]">
            {name}
          </span>
          <span className="shrink-0 text-sm text-muted">{role}</span>
        </li>
      ))}
    </ul>
  )
}
