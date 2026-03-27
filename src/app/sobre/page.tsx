import Link from 'next/link'

export default function SobrePage() {
  return (
    <main className="pt-24">
      {/* ── Hero / Missão & História ── */}
      <section className="relative px-8 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Nossa História
            </div>
            <h1 className="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-on-surface mb-8 leading-tight">
              Engenharia de{' '}
              <span className="text-primary">Alta Precisão</span> para o Futuro.
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-8 max-w-xl">
              Fundada na convergência entre dados e design, a Harpia Lab nasceu
              para decodificar problemas complexos em soluções digitais elegantes.
              Nossa missão é elevar o padrão de desenvolvimento de software através
              de uma mentalidade de laboratório: experimentação rigorosa e execução
              impecável.
            </p>
            <div className="grid grid-cols-2 gap-8 py-8 border-t border-outline-variant/15">
              <div>
                <h3 className="text-primary font-headline font-extrabold text-xl mb-2 italic">
                  Missão
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Transformar a arquitetura digital de empresas globais através de
                  código limpo e inovação contínua.
                </p>
              </div>
              <div>
                <h3 className="text-primary font-headline font-extrabold text-xl mb-2 italic">
                  Visão
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Ser a referência técnica em desenvolvimento de sistemas de alta
                  performance na América Latina.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/15 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2Vlw3795KYYtzj4u4RfS2-lEFlXZ7JP6OtqzOWEFvy8RE4qHPXREAIw0PQYfzM5nRJY6NlvhWOfcsJ6Uy_97-D9xCYWrB72XJCBAFvtodr3G4Mk6FmJqwJupH212JGPv8WfhMYmi-JorlVYMgcVhhABWikBOgpla8bGvd3Pvo-j7qkslgyuswzoTzI3NY3onkCS2XISmvANFJeJfg1NxE0_tawH-mdXmIeWPccwhyxyKmwAfFCq8hZW4CyOGnn8PEHEUs-UwPs7E"
                alt="Digital Engineering"
                className="w-full h-full object-cover grayscale contrast-125 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-primary/10" />
              <div className="absolute bottom-8 right-8 p-6 bg-surface-container-highest/80 backdrop-blur-md rounded-xl border border-primary/30 shadow-2xl max-w-xs">
                <span className="material-symbols-outlined text-primary mb-2 text-3xl block">
                  verified
                </span>
                <h4 className="text-white font-headline font-bold">
                  Excelência Técnica
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Auditamos cada linha de código para garantir estabilidade e
                  escalabilidade absoluta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nossos Valores ── */}
      <section className="bg-surface-container-low py-24 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-3xl font-headline font-extrabold tracking-tighter mb-16 border-l-4 border-primary pl-6">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                num: '01',
                title: 'Transparência Radical',
                desc: 'Acreditamos que a confiança é construída através de processos abertos e comunicação direta em todas as etapas do desenvolvimento.',
              },
              {
                num: '02',
                title: 'Foco no Detalhe',
                desc: 'Não entregamos apenas funcionalidade; entregamos polimento. Cada pixel e milissegundo de performance importa para nós.',
              },
              {
                num: '03',
                title: 'Inovação Pragmática',
                desc: 'Utilizamos as tecnologias mais recentes não pelo hype, mas por sua capacidade de resolver problemas reais de forma eficiente.',
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="space-y-4 group">
                <div className="text-primary-container font-headline text-6xl font-black opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                  {num}
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface">
                  {title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nossa Equipe ── */}
      <section className="py-32 px-8 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tighter mb-4">
              Nossa Equipe
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Mentes brilhantes dedicadas a construir o amanhã. Conheça os
              especialistas por trás da Harpia Lab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1-l5u4IlSO7TRsjQ3p2FDDILk3ZLfGc32uLQBKoL-yWvV2EmmBqf_ja2exxNdy3dUBmLHj3PkHF9j9jGKCMStbU56eMRu04SRS8Hir5mIRIR6UN83B5r9A153p_HGVuEbqqdz3I9XNgH2TkKoU1nMzTtOId5VqEmjJEDSJW4IRnx5FsffSCN5gNFnw7bui9qNgdg6bTysyauWhFNGFTuDsw7SbZJvIf9dVL__616bcM2s72wDQeS6yOqWkC18CbcwgOVLOLMic30',
                name: 'Arthur Mendes',
                role: 'Tech Lead',
                desc: 'Especialista em arquitetura de sistemas distribuídos e liderança técnica de projetos críticos.',
                icon: 'terminal',
              },
              {
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVW08rVOfcmiMnq7Gw8M_HkIUbCECPcfUguzFFuEEuO0OSh78cks8ohIBQ7kl9byi0Mcz0Y9ZLFHGt4ANveu2rbllBtdkR9VitFP3YkfDmF7ggSl1iMhPvNDpTgTfyd39oN5wjAjuNvhkKV9GSO2KIlBoa8KE1A8KUeGag6RNVZNNMOiX5McdLP7hYVghXu_2a6Jb7geBvUTWen9YDXIOWAyfPfgN2X-epg-2ltTQuBiwQlzBiU93nwtUtwEpQG7tP7ZQMPAWxwk0',
                name: 'Beatriz Rocha',
                role: 'Front-end Developer',
                desc: 'Apaixonada por interfaces intuitivas e performance Web. Mestra em React e design systems.',
                icon: 'palette',
              },
              {
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJKoAAcMWMPNVy8JuaP_LP7i1reWU85rU42UFyG6D1DYvnqqpNSXDc5YPrOa2zhhtqDWF195txMfNZG3cKFgFLyNCdpB59Auc4KKay28_dE37TXbS6pWgi0yZHxJNx5HoRmfNPRsSAUcGK6wqh4tkQRoBGe4XLKk0AaLuyru6QiH0wXrpV0nwaWXomtYFe9AfV2ZEEuCJY0cM70omZEXEHEpaGfdpi38DMVnhHvLjLDBbjBbtHNkIFkHMHmgID_aElD0LPzk6VNHc',
                name: 'Ricardo Silva',
                role: 'Back-end Developer',
                desc: 'Focado em segurança, bancos de dados e integração de APIs robustas para alto tráfego.',
                icon: 'database',
              },
            ].map(({ src, name, role, desc, icon }) => (
              <div
                key={name}
                className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="relative mb-8 aspect-square overflow-hidden rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img
                    src={src}
                    alt={name}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-headline font-bold text-on-surface">
                    {name}
                  </h3>
                  <div className="text-primary font-label text-xs font-bold tracking-widest uppercase mb-4">
                    {role}
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {desc}
                  </p>
                  <div className="flex gap-4 pt-4">
                    <span className="material-symbols-outlined text-slate-500 hover:text-primary cursor-pointer transition-colors text-xl">
                      share
                    </span>
                    <span className="material-symbols-outlined text-slate-500 hover:text-primary cursor-pointer transition-colors text-xl">
                      {icon}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-8">
        <div className="max-w-screen-2xl mx-auto rounded-3xl bg-gradient-to-br from-primary-container to-primary p-12 lg:p-20 text-on-primary-container overflow-hidden relative">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl lg:text-6xl font-headline font-black tracking-tighter mb-8 leading-tight">
              Vamos construir algo lendário juntos.
            </h2>
            <p className="text-xl opacity-90 mb-12">
              Nossa equipe está pronta para o seu próximo desafio técnico. Fale
              com um de nossos especialistas hoje.
            </p>
            <Link
              href="/contato"
              className="inline-block bg-background text-primary px-10 py-4 rounded-lg font-headline font-extrabold text-lg active:scale-95 transition-transform"
            >
              Inicie seu Projeto
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-30" />
          </div>
        </div>
      </section>
    </main>
  )
}
