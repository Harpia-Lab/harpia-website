import Link from 'next/link'

export default function ProjetosPage() {
  return (
    <main className="pt-32 pb-24">
      {/* ── Hero ── */}
      <header className="max-w-screen-2xl mx-auto px-8 mb-24">
        <div className="flex flex-col md:flex-row gap-12 items-end">
          <div className="md:w-2/3">
            <span className="inline-block py-1 px-3 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
              Portfólio de Engenharia
            </span>
            <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter leading-none text-on-surface mb-8">
              Projetos de <span className="text-primary">Alta Precisão</span>.
            </h1>
          </div>
          <div className="md:w-1/3 pb-2 border-l border-outline-variant/20 pl-8">
            <p className="text-lg text-on-surface-variant leading-relaxed font-body">
              Transformamos problemas complexos em soluções digitais elegantes
              através de engenharia rigorosa e design centrado em resultados.
            </p>
          </div>
        </div>
      </header>

      {/* ── Bento Grid ── */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main project */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-low transition-all duration-500 hover:bg-surface-container-high">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpCDosP5C117PqIGPtoroHRorXdNB7VS5xWOLzalrNtq-tmT-vbluiJcRY2Egnc3rqptPgZIuKwFeMpeofDM8tKJ_fEKMc_Qwra7ObOM2A1-U0L1l5phA1FDifVE6ULBv3MFxQRpDCoO3AzayDVkwKBZB44P1_IB0gKVA7dVPyWaUvt0jxjcSadaAbb4bOawmHjwBPZRepByEa5Lb72U9HtrI4bmApqZ3iR7ypqOjMmdpdZHKfF-wE79fZhpQXsMoTOxE2dk9FYK4"
                alt="Dashboard de Analytics"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-2 bg-primary/10 text-primary border border-primary/20 rounded">
                  AI &amp; Machine Learning
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-2 bg-primary/10 text-primary border border-primary/20 rounded">
                  Cloud Systems
                </span>
              </div>
              <h3 className="text-3xl font-headline font-bold text-on-surface mb-3">
                Project Chronos: Predição de Mercado
              </h3>
              <p className="text-on-surface-variant mb-6 max-w-2xl">
                Desenvolvemos um motor de processamento em tempo real capaz de
                analisar 1.5M de transações por segundo com latência
                sub-milissegundo para o setor financeiro.
              </p>
              <div className="flex items-center gap-2 text-primary font-bold group/link cursor-pointer">
                <span>Ver Estudo de Caso</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          {/* Secondary cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {[
              {
                icon: 'security',
                title: 'Vault Protocol',
                desc: 'Arquitetura de segurança Zero-Trust para infraestrutura crítica governamental.',
                tags: ['Rust', 'Kubernetes'],
              },
              {
                icon: 'biotech',
                title: 'Helix DNA',
                desc: 'Sequenciamento genético distribuído utilizando computação paralela massiva.',
                tags: ['Python', 'AWS Lambda'],
              },
            ].map(({ icon, title, desc, tags }) => (
              <div
                key={title}
                className="flex-1 group rounded-xl bg-surface-container-low p-8 transition-all hover:bg-surface-container-high flex flex-col justify-between"
              >
                <div>
                  <span
                    className="material-symbols-outlined text-primary mb-4 block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                  <h4 className="text-xl font-headline font-bold text-on-surface mb-2">
                    {title}
                  </h4>
                  <p className="text-sm text-on-surface-variant">{desc}</p>
                </div>
                <div className="mt-8 flex gap-3">
                  {tags.map((t) => (
                    <span key={t} className="text-xs font-mono text-outline">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Third row */}
          {[
            {
              src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-IFwSJczyPZLEjnz_s8MG3598RTx3O0kBzI8GnL5c26PL-MlYeISnMLk8-NyiUcNnyuIrM4ujt0cKPI0YLwm7cO-0jWiXwz3k2_yZAG5EbAQvJBW0j5IPCSZGSG35ZNQafSPIS5Z4YLA9dkY0-sxi7eMrk-hIAQbZTKWmK2K_YM3S9t0UQP07ZmlOkLX3Uvi5C4rvlyPJNXDidwwo1LomIctCtTmSHDeig6NcT9jyeffJms1o5J4D0Z8u4v1fbsm-pEhTj3gr6H0',
              alt: 'Datacenter',
              title: 'Core Infrastructure v2',
              desc: 'Migração total para nuvem híbrida com disponibilidade de 99.999% para gigante do e-commerce.',
            },
            {
              src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwAtphdzKxt0AGB_KL2IiBEg2_bu-Qz9Qt0TsPx3njlFw0Kimt5v_i1L09QQzYdjT-CecwgaoJUe4Kys5ZRDj_4eUdWpTdg7MjohIjFxmUxC_lJwDjlIDvZCdHcx8yptDCciuJwIdStDfGMUU6MUbhhkE_mY721C1pvPC0KB-Hn6K6SjpZWxSJx8btniCo8kjekbO7CoTzqZs1Jd8ygqaJujVl58u3iwV1C3wMYzXP43M7NokxwkgQK6XccSrlfpFi2yM9WFLrTtc',
              alt: 'Rede de Satélites',
              title: 'Signal Connect',
              desc: 'Sistema de comunicação via satélite de baixa órbita para monitoramento de frotas em áreas remotas.',
            },
          ].map(({ src, alt, title, desc }) => (
            <div
              key={title}
              className="md:col-span-6 group rounded-xl bg-surface-container-low overflow-hidden transition-all hover:bg-surface-container-high"
            >
              <div className="aspect-video w-full">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-headline font-bold mb-2">{title}</h4>
                <p className="text-on-surface-variant text-sm mb-4">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Clientes ── */}
      <section className="bg-surface-container-low py-32">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-4 text-on-surface">
                Nossos Clientes
              </h2>
              <p className="text-on-surface-variant text-lg">
                Parcerias estratégicas com empresas que lideram a fronteira
                tecnológica global.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-400">
                Projetos entregues em 12 países
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0.5 bg-outline-variant/10 rounded-xl overflow-hidden border border-outline-variant/5">
            {[
              'QUANTUM','SYNERGY','APEX.IO','VELOCITY','HORIZON','SPHERE',
              'NEXUS','STRATOS','ORBITAL','PRISM','ECLIPSE','CORE.CO',
            ].map((name) => (
              <div
                key={name}
                className="bg-surface p-12 flex items-center justify-center group transition-colors hover:bg-surface-container-lowest"
              >
                <div className="text-xl font-black text-slate-500 group-hover:text-primary transition-colors opacity-40 group-hover:opacity-100">
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-screen-2xl mx-auto px-8 py-32 text-center">
        <div className="bg-gradient-to-br from-primary-container/20 to-transparent p-20 rounded-2xl border border-primary/10 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-5xl font-headline font-extrabold mb-6">
              Pronto para elevar seu{' '}
              <span className="text-primary">padrão tecnológico</span>?
            </h2>
            <p className="text-xl text-on-surface-variant mb-10 max-w-2xl mx-auto">
              Nossa equipe de engenheiros está pronta para transformar seu próximo
              grande desafio em realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                className="bg-primary text-on-primary px-10 py-4 font-headline font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,218,243,0.3)] transition-all active:scale-95"
              >
                Iniciar Projeto
              </Link>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* ── Floating Status Badge ── */}
      <div className="fixed bottom-8 right-8 bg-surface-container-high/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 flex items-center gap-3 shadow-xl z-50">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">
          Systems Operational
        </span>
      </div>
    </main>
  )
}
