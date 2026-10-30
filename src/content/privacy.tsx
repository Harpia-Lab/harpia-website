// Texto da Política de Privacidade. Fonte: specs/10-politica-de-privacidade.md (workspace harpia).
// Mudou lá, muda aqui (e no control-website), com a data de "Última atualização". O pt vale; o en é tradução.
// [PENDENTE: …] fica visível até o Tiago informar.
import Link from 'next/link'
import type { Locale } from '@/lib/getDictionary'

const pt = (
  <>
    <h1>Política de Privacidade</h1>
    <p className="policy-updated">Última atualização: 25 de outubro de 2026</p>
    <p>
      Esta política explica quais dados pessoais a Harpia Lab trata nos sites harpialab.com e do Control e no Harpia
      Control (app.control.harpialab.com), para quê, por quanto tempo e como você exerce seus direitos pela Lei Geral de
      Proteção de Dados (LGPD, Lei 13.709/2018).
    </p>

    <h2>1. Quem somos</h2>
    <p>
      Harpia Lab, Curitiba/PR, CNPJ [PENDENTE: CNPJ]. Contato de privacidade: [PENDENTE: e-mail de privacidade].
    </p>
    <p>
      Somos a controladora dos dados dos sites, das contas do Control e dos dados de uso descritos aqui. Os dados que um
      escritório cadastra no Control sobre os próprios clientes são do escritório: nesse caso ele é o controlador e nós
      tratamos esses dados em nome dele (operadora), só para prestar o serviço.
    </p>

    <h2>2. A quem se aplica</h2>
    <ul>
      <li>Visitantes dos sites.</li>
      <li>Usuários do Control: quem cria uma conta e a equipe convidada.</li>
      <li>Clientes dos escritórios que abrem um orçamento pelo link ou entram no portal.</li>
    </ul>

    <h2>3. Quais dados tratamos e por quê</h2>

    <h3>3.1 Conta e uso do serviço (usuários do Control)</h3>
    <p>
      Nome, e-mail, organização, papel na equipe e, se você ativar, o segundo fator de login. Também o que você
      cadastra: clientes, orçamentos, arquivos e pagamentos. Usamos para prestar o serviço contratado (LGPD, art. 7º, V)
      e mandar os e-mails do próprio serviço (convites, avisos de orçamento e de parcela).
    </p>

    <h3>3.2 Dados dos clientes dos escritórios</h3>
    <p>
      Nome, e-mail e o que o escritório registra sobre o orçamento e os pagamentos, além da decisão do cliente (aceite
      ou recusa) e dos itens escolhidos. Tratamos como operadora, seguindo as instruções do escritório, que define a base
      legal e responde ao cliente sobre esses dados.
    </p>

    <h3>3.3 Registros técnicos de acesso</h3>
    <p>
      Endereço IP, data e hora, navegador e a ação feita, para segurança e para investigar abuso (legítimo interesse,
      art. 7º, IX). Guardados por até 30 dias.
    </p>

    <h3>3.4 Formulário de contato (harpialab.com)</h3>
    <p>
      Nome, e-mail, empresa (opcional) e a mensagem que você escreve, para responder o contato e conversar sobre um possível projeto (art.
      7º, V, procedimentos preliminares a um contrato). Ficam na nossa caixa de e-mail enquanto a conversa for útil.
    </p>

    <h3>3.5 Dados de uso (Google Analytics)</h3>
    <p>Para entender como os sites e o Control são usados e melhorar o produto, registramos:</p>
    <ul>
      <li>páginas vistas e ações (por exemplo, &quot;orçamento criado&quot; ou &quot;link copiado&quot;);</li>
      <li>tipo de dispositivo, navegador, idioma e localização aproximada (cidade e país);</li>
      <li>de onde a visita veio (site de origem e campanha);</li>
      <li>um identificador aleatório guardado em cookie no seu navegador;</li>
      <li>
        no Control, com você logado: o identificador interno da sua conta e da organização, seu papel na equipe, o plano
        e a área de atuação da organização.
      </li>
    </ul>
    <p>
      <strong>Não</strong> registramos nome, e-mail, telefone, documentos, nomes de clientes, conteúdo ou valores de
      orçamentos, nem o que você digita.
    </p>
    <p>Base legal:</p>
    <ul>
      <li>
        <strong>Sites, portal do cliente e link do orçamento:</strong> consentimento (art. 7º, I). Nada é coletado antes
        de você clicar em &quot;Aceitar&quot; no aviso de cookies. Você muda a escolha quando quiser em
        &quot;Preferências de cookies&quot;, no rodapé dos sites, ou em Segurança → Privacidade, no portal.
      </li>
      <li>
        <strong>Control, com você logado (e cadastro, login e configuração inicial):</strong> legítimo interesse em
        melhorar o produto que você usa (art. 7º, IX). Você desliga em Segurança → Privacidade (&quot;Enviar dados de uso
        neste navegador&quot;). Se recusou os cookies em um dos nossos sites, essa escolha também vale no Control.
      </li>
    </ul>
    <p>
      Os dados de uso não são usados para publicidade: os recursos de anúncios e de dados demográficos do Google estão
      desligados.
    </p>

    <h2>4. Cookies e armazenamento no navegador</h2>
    <div className="policy-table">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Para quê</th>
            <th>Duração</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>hl_consent</code>
            </td>
            <td>guarda sua escolha sobre os cookies de uso</td>
            <td>12 meses</td>
            <td>necessário</td>
          </tr>
          <tr>
            <td>armazenamento local do login (Firebase)</td>
            <td>manter você logado no Control</td>
            <td>até você sair</td>
            <td>necessário</td>
          </tr>
          <tr>
            <td>
              <code>theme</code> (armazenamento local)
            </td>
            <td>lembrar o tema claro ou escuro</td>
            <td>até você limpar</td>
            <td>preferência</td>
          </tr>
          <tr>
            <td>
              <code>_ga</code>, <code>_ga_&lt;id&gt;</code> (Google Analytics)
            </td>
            <td>contar visitas e sessões sem identificar você pelo nome</td>
            <td>13 meses</td>
            <td>uso (seção 3.5)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>5. Com quem compartilhamos</h2>
    <p>Não vendemos dados. Usamos fornecedores que tratam dados em nosso nome:</p>
    <ul>
      <li>
        <strong>Google Cloud e Firebase:</strong> hospedagem do Control, banco de dados, arquivos e login. Os dados do
        Control ficam em São Paulo; o serviço de login pode processar dados fora do Brasil.
      </li>
      <li>
        <strong>Google Analytics:</strong> dados de uso (seção 3.5).
      </li>
      <li>
        <strong>Resend:</strong> envio dos e-mails do serviço.
      </li>
      <li>
        <strong>Vercel:</strong> hospedagem do site harpialab.com.
      </li>
    </ul>
    <p>Também podemos compartilhar dados quando a lei ou uma autoridade exigir.</p>

    <h2>6. Transferência internacional</h2>
    <p>
      Alguns desses fornecedores processam dados fora do Brasil, principalmente nos Estados Unidos (Google Analytics,
      login, Resend, Vercel). Essas transferências seguem o art. 33 da LGPD, com as cláusulas contratuais de proteção de
      dados que os fornecedores oferecem.
    </p>

    <h2>7. Por quanto tempo guardamos</h2>
    <ul>
      <li>
        Conta e dados do serviço: enquanto a conta existir. Depois de um pedido de exclusão, as cópias de backup que
        ainda tenham esses dados expiram em até 7 dias.
      </li>
      <li>Registros técnicos de acesso: até 30 dias.</li>
      <li>
        Dados de uso: 14 meses no Google Analytics; uma cópia para análise (Google Cloud, região de São Paulo) por até 24
        meses.
      </li>
    </ul>

    <h2>8. Seus direitos</h2>
    <p>
      Pela LGPD (art. 18), você pode pedir: confirmação de que tratamos seus dados, acesso, correção, anonimização ou
      eliminação do que for desnecessário, portabilidade, informação sobre com quem compartilhamos, revogação do
      consentimento e oposição a um tratamento feito por legítimo interesse.
    </p>
    <p>
      Para pedir, escreva para [PENDENTE: e-mail de privacidade] do e-mail da sua conta. Confirmamos que o pedido é seu
      antes de agir e respondemos em até 15 dias. Se você é cliente de um escritório que usa o Control, fale primeiro com
      o escritório; nós o ajudamos a atender o pedido.
    </p>
    <p>Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).</p>

    <h2>9. Encarregado</h2>
    <p>
      Como agente de tratamento de pequeno porte, a Harpia Lab está dispensada de indicar um encarregado (Resolução
      CD/ANPD nº 2/2022, art. 11). O canal para qualquer assunto de privacidade é o e-mail da seção 1.
    </p>

    <h2>10. Segurança</h2>
    <p>
      Usamos criptografia em trânsito e em repouso, acesso por permissão, verificação em duas etapas e backups diários.
      Nenhum sistema é infalível; se acontecer um incidente que possa causar risco ou dano relevante, avisamos você e a
      ANPD.
    </p>

    <h2>11. Mudanças nesta política</h2>
    <p>
      Quando a política mudar, atualizamos a data no topo e avisamos nos sites ou no Control se a mudança for relevante.
    </p>
  </>
)

const en = (
  <>
    <p className="policy-note">
      This is a translation for convenience. The <Link href="/pt/privacidade">Portuguese version</Link> is the legally binding
      one.
    </p>
    <h1>Privacy Policy</h1>
    <p className="policy-updated">Last updated: October 25, 2026</p>
    <p>
      This policy explains which personal data Harpia Lab processes on the harpialab.com and Control websites and in
      Harpia Control (app.control.harpialab.com), for what purpose, for how long, and how you exercise your rights under the
      Brazilian General Data Protection Law (LGPD, Law 13,709/2018).
    </p>

    <h2>1. Who we are</h2>
    <p>
      Harpia Lab, Curitiba/PR, Brazil, CNPJ [PENDENTE: CNPJ]. Privacy contact: [PENDENTE: e-mail de privacidade].
    </p>
    <p>
      We are the controller of the data from the websites, from Control accounts, and of the usage data described here.
      The data a firm enters in Control about its own clients belongs to the firm: in that case the firm is the
      controller and we process that data on its behalf (processor), only to provide the service.
    </p>

    <h2>2. Who this applies to</h2>
    <ul>
      <li>Website visitors.</li>
      <li>Control users: whoever creates an account and the invited team.</li>
      <li>Clients of the firms who open a quote through the link or sign in to the portal.</li>
    </ul>

    <h2>3. What data we process and why</h2>

    <h3>3.1 Account and use of the service (Control users)</h3>
    <p>
      Name, email, organization, role on the team and, if you enable it, the second login factor. Also what you enter:
      clients, quotes, files, and payments. We use it to provide the contracted service (LGPD, art. 7, V) and to send the
      service&rsquo;s own emails (invitations, quote and installment notices).
    </p>

    <h3>3.2 Data about the firms&rsquo; clients</h3>
    <p>
      Name, email, and what the firm records about the quote and the payments, plus the client&rsquo;s decision
      (acceptance or rejection) and the items chosen. We process it as a processor, following the instructions of the
      firm, which defines the legal basis and answers to the client about this data.
    </p>

    <h3>3.3 Technical access logs</h3>
    <p>
      IP address, date and time, browser, and the action performed, for security and to investigate abuse (legitimate
      interest, art. 7, IX). Kept for up to 30 days.
    </p>

    <h3>3.4 Contact form (harpialab.com)</h3>
    <p>
      Name, email, company (optional), and the message you write, to reply to you and discuss a possible project (art. 7, V, preliminary
      procedures to a contract). They stay in our mailbox for as long as the conversation is useful.
    </p>

    <h3>3.5 Usage data (Google Analytics)</h3>
    <p>To understand how the websites and Control are used and to improve the product, we record:</p>
    <ul>
      <li>pages viewed and actions (for example, &quot;quote created&quot; or &quot;link copied&quot;);</li>
      <li>device type, browser, language, and approximate location (city and country);</li>
      <li>where the visit came from (referring site and campaign);</li>
      <li>a random identifier stored in a cookie in your browser;</li>
      <li>
        in Control, while you are signed in: the internal identifier of your account and of the organization, your role
        on the team, and the organization&rsquo;s plan and field of work.
      </li>
    </ul>
    <p>
      We do <strong>not</strong> record names, emails, phone numbers, documents, client names, the content or amounts of
      quotes, or anything you type.
    </p>
    <p>Legal basis:</p>
    <ul>
      <li>
        <strong>Websites, client portal, and quote link:</strong> consent (art. 7, I). Nothing is collected before you
        click &quot;Accept&quot; on the cookie notice. You can change your choice at any time under &quot;Cookie
        preferences&quot; in the websites&rsquo; footer, or under Security → Privacy in the portal.
      </li>
      <li>
        <strong>Control, while you are signed in (and sign-up, login, and initial setup):</strong> legitimate interest in
        improving the product you use (art. 7, IX). You can turn it off under Security → Privacy (&quot;Send usage data
        from this browser&quot;). If you declined cookies on one of our websites, that choice also applies in Control.
      </li>
    </ul>
    <p>
      Usage data is not used for advertising: Google&rsquo;s advertising and demographics features are turned off.
    </p>

    <h2>4. Cookies and browser storage</h2>
    <div className="policy-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Duration</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>hl_consent</code>
            </td>
            <td>stores your choice about usage cookies</td>
            <td>12 months</td>
            <td>necessary</td>
          </tr>
          <tr>
            <td>login local storage (Firebase)</td>
            <td>keep you signed in to Control</td>
            <td>until you sign out</td>
            <td>necessary</td>
          </tr>
          <tr>
            <td>
              <code>theme</code> (local storage)
            </td>
            <td>remember the light or dark theme</td>
            <td>until you clear it</td>
            <td>preference</td>
          </tr>
          <tr>
            <td>
              <code>_ga</code>, <code>_ga_&lt;id&gt;</code> (Google Analytics)
            </td>
            <td>count visits and sessions without identifying you by name</td>
            <td>13 months</td>
            <td>usage (section 3.5)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>5. Who we share data with</h2>
    <p>We do not sell data. We use providers that process data on our behalf:</p>
    <ul>
      <li>
        <strong>Google Cloud and Firebase:</strong> Control hosting, database, files, and login. Control data is stored in
        São Paulo; the login service may process data outside Brazil.
      </li>
      <li>
        <strong>Google Analytics:</strong> usage data (section 3.5).
      </li>
      <li>
        <strong>Resend:</strong> sending the service&rsquo;s emails.
      </li>
      <li>
        <strong>Vercel:</strong> hosting of the harpialab.com website.
      </li>
    </ul>
    <p>We may also share data when required by law or by an authority.</p>

    <h2>6. International transfer</h2>
    <p>
      Some of these providers process data outside Brazil, mainly in the United States (Google Analytics, login, Resend,
      Vercel). These transfers follow art. 33 of the LGPD, under the data protection contractual clauses the providers
      offer.
    </p>

    <h2>7. How long we keep data</h2>
    <ul>
      <li>
        Account and service data: for as long as the account exists. After a deletion request, backup copies that still
        contain this data expire within 7 days.
      </li>
      <li>Technical access logs: up to 30 days.</li>
      <li>
        Usage data: 14 months in Google Analytics; a copy for analysis (Google Cloud, São Paulo region) for up to 24
        months.
      </li>
    </ul>

    <h2>8. Your rights</h2>
    <p>
      Under the LGPD (art. 18), you can request: confirmation that we process your data, access, correction,
      anonymization or deletion of what is unnecessary, portability, information about whom we share it with, withdrawal
      of consent, and objection to processing based on legitimate interest.
    </p>
    <p>
      To make a request, write to [PENDENTE: e-mail de privacidade] from your account&rsquo;s email. We confirm that the
      request is yours before acting and reply within 15 days. If you are a client of a firm that uses Control, contact
      the firm first; we help it handle the request.
    </p>
    <p>You can also file a complaint with the Brazilian National Data Protection Authority (ANPD).</p>

    <h2>9. Data protection officer</h2>
    <p>
      As a small-scale processing agent, Harpia Lab is exempt from appointing a data protection officer (Resolution
      CD/ANPD No. 2/2022, art. 11). The channel for any privacy matter is the email in section 1.
    </p>

    <h2>10. Security</h2>
    <p>
      We use encryption in transit and at rest, permission-based access, two-step verification, and daily backups. No
      system is infallible; if an incident occurs that may cause relevant risk or harm, we notify you and the ANPD.
    </p>

    <h2>11. Changes to this policy</h2>
    <p>
      When the policy changes, we update the date at the top and, if the change is relevant, notify you on the websites
      or in Control.
    </p>
  </>
)

export const privacyPolicy: Record<Locale, React.ReactNode> = { pt, en }
