import ContactForm from '@/components/ContactForm'

export default function ContatoPage() {
  return (
    <main className="pt-32 pb-24">
      {/* ── Hero ── */}
      <section className="mb-20 max-w-screen-2xl mx-auto px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00daf3]" />
          <span className="text-primary font-headline font-bold tracking-widest text-xs uppercase">
            Conecte-se à Precisão
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-on-background tracking-tighter mb-6 leading-tight">
          Vamos transformar sua{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container">
            visão em código.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl font-body leading-relaxed">
          Engenharia de alta performance para projetos que demandam escalabilidade,
          segurança e design de ponta. Inicie seu orçamento agora.
        </p>
      </section>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-screen-2xl mx-auto px-8">
        {/* Form card */}
        <div className="lg:col-span-7 bg-surface-container-low p-8 md:p-12 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
          <h2 className="text-2xl font-headline font-bold mb-8 text-on-surface">
            Solicitar Orçamento
          </h2>
          <ContactForm />
        </div>

        {/* Contact info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
            <h3 className="text-xl font-headline font-bold mb-6">
              Canais Diretos
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: 'mail',
                  label: 'E-mail Comercial',
                  value: 'contato@harpialab.com',
                  href: 'mailto:contato@harpialab.com',
                },
                {
                  icon: 'call',
                  label: 'Telefone',
                  value: '+55 (11) 4003-0000',
                  href: 'tel:+551140030000',
                },
                {
                  icon: 'location_on',
                  label: 'Sede Tecnológica',
                  value: 'Av. Paulista, 1000 — São Paulo, SP',
                  href: undefined,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 flex-shrink-0">
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-headline font-bold text-slate-500 uppercase">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-on-surface font-medium hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-on-surface font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative image */}
          <div className="relative rounded-xl overflow-hidden aspect-video group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXppTyZLdwZEceIECRLsSK7yzmA_uGSxK6iSybHuCBlyxdT-DZICO6AsyhkrcaUzC5PvIdjIu2P2unIA68OtSehFWzOyjTCWky0HWAhmTl494Sr04-ypelXYOi0oirKfUKZXWBVq13VqgsALTvxKBwoCCOkx6mfka9bHRLZXCeblz2kRJy4ToqddPkHKzm6EK7ctj758bxNxNRebx5vECWehFIDPs98W8QXV8JkcuYZQsJmNZbRbYX8YEj9a2fOqVKNlQUr-q4DnE"
              alt="Harpia Lab Tech Environment"
              className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-700"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <p className="text-primary font-headline font-bold text-sm">
                Disponibilidade 24/7
              </p>
              <p className="text-slate-400 text-xs">
                Sistemas monitorados em tempo real
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-between opacity-50 px-2">
            <span className="text-xs font-headline font-bold">AWS PARTNER</span>
            <span className="text-xs font-headline font-bold">ISO 27001</span>
            <span className="text-xs font-headline font-bold">SOC2 COMPLIANT</span>
          </div>
        </div>
      </div>

      {/* ── Processo de Atendimento ── */}
      <section className="mt-32 max-w-screen-2xl mx-auto px-8">
        <h2 className="text-3xl font-headline font-bold mb-12 text-center">
          Processo de Atendimento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: '01',
              title: 'Análise Técnica',
              desc: 'Nossa equipe de arquitetos avalia a viabilidade e os requisitos técnicos da sua demanda em até 24h.',
            },
            {
              num: '02',
              title: 'Proposta de Valor',
              desc: 'Apresentamos um escopo detalhado com cronograma, tecnologias sugeridas e investimento necessário.',
            },
            {
              num: '03',
              title: 'Kick-off',
              desc: 'Início imediato do desenvolvimento com reuniões semanais de acompanhamento e entregas contínuas.',
            },
          ].map(({ num, title, desc }) => (
            <div
              key={num}
              className="p-8 border-l border-primary/20 hover:border-primary transition-colors duration-500"
            >
              <span className="text-4xl font-headline font-black text-primary/20 mb-4 block">
                {num}
              </span>
              <h4 className="text-lg font-headline font-bold mb-2">{title}</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
