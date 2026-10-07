import Image from 'next/image'

interface LogoProps {
  inverted?: boolean
}

export default function Logo({ inverted = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={800}
        height={600}
        sizes="48px"
        loading="eager"
        className={`h-8 w-auto ${inverted ? 'brightness-0 invert' : ''}`}
      />
      <span className={`font-headline text-[15px] tracking-[0.16em] ${inverted ? 'text-white' : 'text-primary'}`}>
        <span className="font-extrabold">HARPIA</span> <span className="font-medium">LAB</span>
      </span>
    </span>
  )
}
