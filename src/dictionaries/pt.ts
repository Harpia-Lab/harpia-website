const pt = {
  meta: {
    title: 'Harpia Lab | Consultoria & Fábrica de Software',
    description:
      'Sistemas, aplicativos e integrações sob medida para a sua empresa, do entendimento do problema ao suporte depois da entrega.',
  },
  nav: {
    products: 'Produtos',
    services: 'Serviços',
    process: 'Processo',
    team: 'Equipe',
    cta: 'Fale conosco',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    language: 'Idioma',
  },
  hero: {
    title: 'Software sob medida,',
    titleAccent: 'feito para durar.',
    subtitle:
      'Sistemas, aplicativos e integrações para a sua empresa. Entendemos o problema, construímos a solução e seguimos junto depois da entrega.',
    ctaPrimary: 'Solicitar orçamento',
    ctaSecondary: 'Como trabalhamos',
    highlights: ['Sistemas web e aplicativos', 'Suporte depois da entrega', 'Resposta em até 24h'],
    terminal: {
      live: 'no ar',
      url: 'seuproduto.com.br',
    },
  },
  services: {
    title: 'Três jeitos de trabalhar com a gente.',
    subtitle: 'Escolha o formato pelo momento da sua empresa.',
    items: [
      { title: 'Projeto sob medida', desc: 'Você traz o problema ou a ideia e nós entregamos o sistema funcionando: site, aplicativo, sistema interno ou integração, com escopo e prazo combinados antes de começar.' },
      { title: 'Time dedicado', desc: 'Pessoas do nosso time trabalhando no seu produto, junto com a sua equipe, pelo tempo que fizer sentido.' },
      { title: 'Consultoria técnica', desc: 'Uma segunda opinião antes de investir: arquitetura, revisão do sistema que você já tem e escolha de tecnologia.' },
    ],
  },
  products: {
    title: 'Software nosso, em produção.',
    subtitle: 'Um problema que víamos se repetir virou produto. O mesmo time e o mesmo processo cuidam do seu projeto.',
    name: 'Harpia Control',
    tagline: 'Controle de orçamentos e pagamentos, com portal para o seu cliente.',
    desc: 'Monte o orçamento, envie para aprovação e acompanhe cada parcela até cair na conta, sem planilha e sem cobrar ninguém por mensagem.',
    benefits: [
      { title: 'Orçamentos em PDF com versões', desc: 'Cada ajuste vira uma nova versão, e o cliente aceita online.' },
      { title: 'Parcelas e lembretes automáticos', desc: 'Defina as parcelas uma vez; os lembretes de vencimento saem sozinhos.' },
      { title: 'Portal do cliente', desc: 'O cliente vê orçamentos e parcelas em um acesso só dele.' },
      { title: 'Equipe com permissões', desc: 'Cada pessoa da equipe acessa apenas o que precisa.' },
    ],
    ctaContact: 'Quero um sistema assim',
    ctaLogin: 'Já usa o Control? Entrar',
    mockup: {
      label: 'Exemplo de tela do Harpia Control: orçamento aceito com quatro parcelas, duas pagas',
        quote: 'Orçamento 0142',
      client: 'Cliente Exemplo · Reforma do site',
      version: 'v3',
      accepted: 'Aceito online',
      total: 'Total',
      received: 'Recebido',
      installments: 'Parcelas',
      rows: [
        { due: '10/09', status: 'Pago', tone: 'ok' },
        { due: '10/10', status: 'Pago', tone: 'ok' },
        { due: '10/11', status: 'Lembrete enviado', tone: 'info' },
        { due: '10/12', status: 'A vencer', tone: 'muted' },
      ],
    },
  },
  process: {
    title: 'Como trabalhamos',
    subtitle: 'Um caminho claro do primeiro contato à entrega, com você acompanhando cada etapa.',
    steps: [
      { title: 'Descoberta', desc: 'Entendemos o problema, o contexto do negócio e o que precisa existir primeiro.' },
      { title: 'Planejamento', desc: 'Combinamos escopo, prazo e tecnologia antes de começar a construir.' },
      { title: 'Desenvolvimento', desc: 'Entregas frequentes, que você vê funcionando, com código revisado.' },
      { title: 'Entrega e suporte', desc: 'Colocamos em produção e seguimos junto na evolução do produto.' },
    ],
  },
  team: {
    title: 'Quem constrói com você',
    subtitle: 'Três cofundadores com experiência em engenharia de software, design e arquitetura de sistemas.',
    role: 'Cofundador',
  },
  contact: {
    title: 'Vamos conversar?',
    subtitle: 'Conte o que você precisa. Respondemos com as primeiras perguntas ou com uma proposta.',
    emailLabel: 'E-mail',
    whatsappAction: 'Conversar pelo WhatsApp',
    whatsappText: 'Olá! Vim pelo site da Harpia Lab.',
    location: 'Harpia Lab · Curitiba, PR',
  },
  form: {
    name: 'Nome',
    namePlaceholder: 'Seu nome',
    email: 'E-mail',
    emailPlaceholder: 'seu@email.com',
    message: 'Mensagem',
    messagePlaceholder: 'O que você quer construir ou resolver?',
    submit: 'Enviar mensagem',
    sending: 'Enviando…',
    nextStep: 'Respondemos em até 24h, no e-mail que você informar.',
    success: 'Mensagem enviada. Respondemos em até 24h, no e-mail que você informou.',
    error: 'Não foi possível enviar. Tente de novo ou escreva para contato@harpialab.com.',
    rateLimited: 'Muitas tentativas. Tente novamente mais tarde.',
  },
  footer: {
    tagline: 'Consultoria & Fábrica de Software',
    copyright: 'Todos os direitos reservados.',
    madeWith: 'Feito no Brasil',
    privacy: 'Privacidade',
    cookiePreferences: 'Preferências de cookies',
  },
  consent: {
    label: 'Aviso de cookies',
    text: 'Podemos usar cookies do Google Analytics para entender como este site é usado? Nada do que você digita é enviado.',
    policy: 'Política de Privacidade',
    decline: 'Recusar',
    accept: 'Aceitar',
  },
  privacy: {
    title: 'Política de Privacidade',
    description:
      'Quais dados pessoais a Harpia Lab trata nos sites e no Harpia Control, para quê, por quanto tempo e como exercer seus direitos pela LGPD.',
  },
}

export default pt
