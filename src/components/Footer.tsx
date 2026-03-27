import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background w-full border-t border-outline-variant/15">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-12 py-16 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <div className="md:col-span-1">
          <span className="text-xl font-bold text-primary mb-4 block font-headline">
            Harpia Lab
          </span>
          <p className="font-body text-sm text-slate-400 leading-relaxed">
            A arquitetura do amanhã, codificada hoje. Especialistas em software
            de alta criticidade e performance extrema.
          </p>
        </div>

        {/* Navegação */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-on-surface font-headline font-bold text-sm uppercase tracking-widest">
            Navegação
          </h4>
          <Link href="/" className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors">Início</Link>
          <Link href="/sobre" className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors">Sobre Nós</Link>
          <Link href="/projetos" className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors">Projetos</Link>
          <Link href="/contato" className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors">Contato</Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-on-surface font-headline font-bold text-sm uppercase tracking-widest">
            Legal
          </h4>
          <span className="font-body text-sm text-slate-500">Privacidade</span>
          <span className="font-body text-sm text-slate-500">Termos de Uso</span>
          <span className="font-body text-sm text-slate-500">Cookies</span>
        </div>

        {/* Social & Contato */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-on-surface font-headline font-bold text-sm uppercase tracking-widest">
            Social &amp; Contato
          </h4>
          <a
            href="https://linkedin.com/company/harpialab"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/harpialab"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:contato@harpialab.com"
            className="font-body text-sm text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-colors"
          >
            contato@harpialab.com
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-screen-2xl mx-auto px-12 py-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-body text-sm text-slate-400">
          © {new Date().getFullYear()} Harpia Lab. High-Precision Engineering.
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-label">Status:</span>
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-on-surface-variant font-label uppercase">
              Sistemas Online
            </span>
          </span>
        </div>
      </div>
    </footer>
  )
}
