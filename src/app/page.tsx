import Image from 'next/image'
import ContactForm from '@/components/ContactForm'

const services = [
  {
    icon: '🏭',
    title: 'Fábrica de Software',
    desc: 'Desenvolvimento de produtos digitais sob demanda — web, mobile e sistemas internos.',
  },
  {
    icon: '🎯',
    title: 'Consultoria Técnica',
    desc: 'Arquitetura de sistemas, revisão de código e escolha de stack para o seu contexto.',
  },
  {
    icon: '💻',
    title: 'Desenvolvimento Web & Mobile',
    desc: 'Aplicações rápidas, acessíveis e bem construídas do front ao back-end.',
  },
  {
    icon: '🔗',
    title: 'Integrações & APIs',
    desc: 'Conectamos sistemas legados a novas plataformas com integrações robustas.',
  },
]

const team = [
  { src: '/images/ttt.jpeg', name: 'Tiago Thomen Taraczuk', role: 'Co-founder' },
  { src: '/images/ggr.png',  name: 'Gabriel Gomes Rapozo',  role: 'Co-founder' },
  { src: '/images/cm.png',   name: 'Cezar Mauricio',        role: 'Co-founder' },
]

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <Image
          src="/images/logo-harpialab.png"
          alt="Harpia Lab"
          width={1280}
          height={1280}
          className="h-16 w-auto mb-10"
          priority
        />
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full mb-8">
          Consultoria &amp; Fábrica de Software
        </span>
        <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight text-on-surface leading-tight mb-6 max-w-2xl">
          Transformamos ideias em software de verdade.
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl mb-10">
          Desenvolvemos produtos digitais e oferecemos consultoria técnica para
          empresas que precisam de resultado — do MVP ao sistema em produção.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#contato"
            className="bg-primary text-on-primary px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors"
          >
            Solicitar Orçamento
          </a>
          <a
            href="#equipe"
            className="text-primary font-semibold text-sm flex items-center gap-1.5 hover:underline"
          >
            Conheça o time →
          </a>
        </div>
      </section>

      <div className="border-t border-outline-variant max-w-screen-xl mx-auto" />

      {/* ── Serviços ── */}
      <section id="servicos" className="scroll-mt-16 py-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-4">
          O que fazemos
        </span>
        <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-4">
          Serviços
        </h2>
        <p className="text-on-surface-variant mb-12 max-w-lg">
          Da ideia ao deploy, com código limpo e foco em entrega.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-7 hover:border-primary/40 transition-colors"
            >
              <span className="text-3xl block mb-4">{icon}</span>
              <h3 className="font-headline font-bold text-on-surface mb-2">{title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-outline-variant max-w-screen-xl mx-auto" />

      {/* ── Equipe ── */}
      <section id="equipe" className="scroll-mt-16 py-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-screen-xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-4">
            Quem somos
          </span>
          <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-4">
            Nossa equipe
          </h2>
          <p className="text-on-surface-variant mb-12 max-w-lg">
            Três co-fundadores com experiência em engenharia de software, design
            e arquitetura de sistemas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map(({ src, name, role }) => (
              <div
                key={name}
                className="bg-surface border border-outline-variant rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={src}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-on-surface text-sm">{name}</h3>
                  <p className="text-xs text-primary font-semibold mt-1">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contato ── */}
      <section id="contato" className="scroll-mt-16 py-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-4">
              Contato
            </span>
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-4">
              Vamos conversar?
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              Conte o seu desafio e a gente retorna com uma proposta.
              Respondemos em até 24h.
            </p>
            <a
              href="mailto:contato@harpialab.com"
              className="text-sm font-semibold text-primary flex items-center gap-2 hover:underline"
            >
              <span>✉</span>
              contato@harpialab.com
            </a>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
