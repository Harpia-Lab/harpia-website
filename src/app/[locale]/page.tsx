import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import { getDictionary } from '@/lib/getDictionary'

const team = [
  { src: '/images/ttt.jpeg', name: 'Tiago Thomen Taraczuk' },
  { src: '/images/ggr.png',  name: 'Gabriel Gomes Rapozo' },
  { src: '/images/cm.png',   name: 'Cezar Mauricio' },
]

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }]
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <Image
          src="/images/logo-harpialab.png"
          alt="Harpia Lab"
          width={1280}
          height={1280}
          className="h-48 w-auto mb-10"
          priority
        />
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full mb-8">
          {dict.hero.badge}
        </span>
        <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight text-on-surface leading-tight mb-6 max-w-2xl">
          {dict.hero.title}
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl mb-10">
          {dict.hero.subtitle}
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#contato" className="bg-primary text-on-primary px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-primary-hover transition-colors">
            {dict.hero.ctaPrimary}
          </a>
          <a href="#equipe" className="text-primary font-semibold text-sm flex items-center gap-1.5 hover:underline">
            {dict.hero.ctaSecondary}
          </a>
        </div>
      </section>

      <div className="border-t border-outline-variant max-w-screen-xl mx-auto" />

      {/* Services */}
      <section id="servicos" className="scroll-mt-16 py-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-4">{dict.services.label}</span>
        <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-4">{dict.services.title}</h2>
        <p className="text-on-surface-variant mb-12 max-w-lg">{dict.services.subtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {dict.services.items.map(({ icon, title, desc }) => (
            <div key={title} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-7 hover:border-primary/40 transition-colors">
              <span className="text-3xl block mb-4">{icon}</span>
              <h3 className="font-headline font-bold text-on-surface mb-2">{title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-outline-variant max-w-screen-xl mx-auto" />

      {/* Team */}
      <section id="equipe" className="scroll-mt-16 py-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-screen-xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-4">{dict.team.label}</span>
          <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-4">{dict.team.title}</h2>
          <p className="text-on-surface-variant mb-12 max-w-lg">{dict.team.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map(({ src, name }) => (
              <div key={name} className="bg-surface border border-outline-variant rounded-2xl overflow-hidden">
                <div className="relative aspect-square w-full">
                  <Image src={src} alt={name} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-on-surface text-sm">{name}</h3>
                  <p className="text-xs text-primary font-semibold mt-1">{dict.team.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="scroll-mt-16 py-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary block mb-4">{dict.contact.label}</span>
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-4">{dict.contact.title}</h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">{dict.contact.subtitle}</p>
            <a href="mailto:contato@harpialab.com" className="text-sm font-semibold text-primary flex items-center gap-2 hover:underline">
              <span>✉</span>
              contato@harpialab.com
            </a>
          </div>
          <ContactForm dict={dict.form} />
        </div>
      </section>
    </main>
  )
}
