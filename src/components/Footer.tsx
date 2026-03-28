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
        <p className="text-sm text-on-surface-variant">
          © {new Date().getFullYear()} Harpia Lab. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
