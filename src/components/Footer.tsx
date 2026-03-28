import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Image
          src="/images/logo-harpialab.png"
          alt="Harpia Lab"
          width={1280}
          height={1280}
          className="h-9 w-auto opacity-70"
        />
        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-sm text-on-surface-variant">
            © {new Date().getFullYear()} Harpia Lab. Todos os direitos reservados.
          </p>
          <p className="text-xs text-on-surface-variant/60">
            Feito com ❤️ no Brasil 🇧🇷
          </p>
        </div>
      </div>
    </footer>
  )
}
