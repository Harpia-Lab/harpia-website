import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="pt-20">
      {/* ── Hero ── */}
      <section className="relative min-h-[921px] flex items-center overflow-hidden px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary-container/10" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/15 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-label font-medium tracking-widest uppercase text-on-surface-variant">
                Software Factory &amp; Tech Consultancy
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter mb-8 leading-[0.9] text-on-surface">
              Inovação em Cada Linha de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
                Código
              </span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              Transformamos ideias complexas em software de alta performance
              através de engenharia de precisão e design centrado no usuário.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contato"
                className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-lg font-headline font-bold text-lg hover:shadow-[0_0_20px_rgba(0,218,243,0.3)] transition-all active:scale-95"
              >
                Solicite um Orçamento
              </Link>
              <Link
                href="/projetos"
                className="border border-outline-variant/30 text-on-surface px-8 py-4 rounded-lg font-headline font-bold text-lg hover:bg-surface-container-low transition-all active:scale-95"
              >
                Ver Portfólio
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="aspect-square rounded-xl bg-surface-container-low border border-outline-variant/15 p-4 overflow-hidden relative group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfXc_qX1ncuwlD9JZwVzNieTkXS2vjcnCk-uvB5weU78IH9MvGiR0f4nSxTyx_UUINIkbqVQIwuTRQNRjlZiYug_ggr4pDkI4eiLF8ZlPmgZGZoCj-PfO4nInM56aYR9pBhqlhfOGtPEK84JSVhjkBtEV22xyv2GQob8YtdanWLWcxI_hA3mYnnDPa5WymfMcQ5AU-lW644tvlcuxD-49P45Y2iGLvSfOeECdbnkuZ5aT8ADMf7uTp2xfoKhp9NSmswxG7c-3-VlU"
                alt="Futuristic Tech Laboratory"
                className="w-full h-full object-cover rounded-lg opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 glass-panel rounded-lg border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-label text-primary uppercase tracking-widest mb-1">
                      Status do Sistema
                    </p>
                    <h3 className="text-lg font-headline font-bold">
                      Operação 100% Nominal
                    </h3>
                  </div>
                  <span className="material-symbols-outlined text-primary text-4xl">
                    analytics
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento Grid (Serviços) ── */}
      <section className="py-32 px-8 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-on-surface">
                Engenharia Digital de <br />
                <span className="text-primary">Classe Mundial.</span>
              </h2>
              <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                A Harpia Lab não é apenas uma fábrica de software; somos parceiros
                estratégicos na sua jornada digital. Utilizamos as tecnologias mais
                avançadas para construir ecossistemas digitais escaláveis, seguros e
                impactantes.
              </p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 flex flex-col justify-between">
              <span className="material-symbols-outlined text-primary text-5xl mb-4 block">
                rocket_launch
              </span>
              <div>
                <h4 className="text-2xl font-headline font-bold mb-2">
                  Consultoria Ágil
                </h4>
                <p className="text-on-surface-variant text-sm">
                  Aceleramos o ciclo de vida do seu produto com metodologias focadas
                  em entrega contínua.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            {[
              { icon: 'cloud_done',      title: 'Cloud Native',     desc: 'Sistemas desenhados para a nuvem, garantindo escalabilidade infinita.' },
              { icon: 'security',        title: 'Cybersecurity',    desc: 'Segurança blindada integrada ao core de cada aplicação construída.' },
              { icon: 'developer_board', title: 'IA Aplicada',      desc: 'Integração de modelos inteligentes para automação de processos críticos.' },
              { icon: 'terminal',        title: 'Back-end Robusto', desc: 'Arquiteturas de microsserviços prontas para alta densidade de dados.' },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10"
              >
                <span className="material-symbols-outlined text-primary mb-4 block">
                  {icon}
                </span>
                <h4 className="font-headline font-bold mb-2">{title}</h4>
                <p className="text-on-surface-variant text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projetos em Destaque ── */}
      <section className="py-32 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-primary font-label font-bold tracking-[0.2em] uppercase text-xs">
                Portfólio Selecionado
              </span>
              <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tight mt-2">
                Projetos em Destaque
              </h2>
            </div>
            <Link
              href="/projetos"
              className="text-primary font-headline font-bold flex items-center group"
            >
              Ver todos os projetos
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9Y4Kf1UoedhanxtJX-n_0WN_9SCIq0bojot-sSr2WhY2u6sV_IvM9lRKHcpIZEg9abDTHhYanbb35pfeehHf7EPPbqGUkQG334KQVN1oKdCIrPXcFkizPzptLZU-r4V0xhmww5N4EuEUHRbN9VMxVtAvuteQsFK7DHjFaCkbQcEbgy5dJPcUQHNfV8p_DJvo2DEvRJDrTWldS11M9CK1lBe4CzYTabElwlP2l6nbIxPI9PNEW5vAEoNg2ImLoWnHv0Vnv3HhbuoU',
                alt: 'Data Analytics Dashboard',
                title: 'Sistema Quantitativo "Zenith"',
                desc: 'Plataforma de análise preditiva para o mercado financeiro com processamento em tempo real.',
              },
              {
                src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5tvjX-2jVQDCmaZ6Dp-lQeIcZkYRh9d7nG9wHanGWcZ_nsq142HHXDgQbJVqemFfJWxjNAYfoMs8ET86RJlkQRlCg5WTDKN3kX-NljQwF265y1vuXEcsbJpBnzxwiZlqffwnGPUAw2vht23Kog-5o0pvyYV02hj61N7lrN2uzjHJzusvg0ZiY9ufuGmqb4VRzvh67DfYgDdEBrq9T1IfpbtTf0U7gR20F3Z7kUrKfUsLl7lF44N2R8j4KLQQZjUB6Jdk11NZhk_E',
                alt: 'Mobile App Interface',
                title: 'LogiTech Mobile Ecosystem',
                desc: 'Ecossistema mobile completo para gestão de logística internacional de última milha.',
              },
            ].map(({ src, alt, title, desc }) => (
              <div key={title} className="group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Logos ── */}
      <section className="py-24 px-8 border-t border-outline-variant/15">
        <div className="max-w-screen-2xl mx-auto text-center">
          <p className="text-xs font-label uppercase tracking-[0.3em] text-slate-500 mb-12">
            Empresas que confiam na nossa engenharia
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center grayscale opacity-40 hover:opacity-100 transition-opacity">
            {['NEXUS', 'QUANTUM', 'STREAM', 'ORBIT', 'PHOENIX', 'CORE'].map((name) => (
              <div
                key={name}
                className="flex justify-center font-headline font-extrabold text-2xl tracking-tighter"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
