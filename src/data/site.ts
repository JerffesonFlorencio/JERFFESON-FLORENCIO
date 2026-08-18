/**
 * Fonte única de conteúdo do portfólio.
 * Para adicionar um novo projeto, tecnologia ou etapa de experiência,
 * basta editar os arrays abaixo — nenhum componente precisa ser alterado.
 */

export const profile = {
  // name: 'Jerffeson Florêncio',
  initials: 'JF',
  logo: 'Jerffeson.dev',
  role: 'Back-End • Automação • Python • n8n',
  headline: {
    lead: 'Transformando processos em',
    accent: 'soluções digitais',
    tail: 'inteligentes.',
  },
  description:
    'Desenvolvedor focado em criar automações, integrações e sistemas que eliminam tarefas repetitivas, conectam operações e transformam processos reais em soluções escaláveis.',
  availability: 'Disponível para projetos',
  // availability: 'Disponível para projetos e novas oportunidades',
  // availability: 'Jerffeson Florêncio',
  photo: '/jerffeson-florencio.jpg',
  email: 'jerffeson.florencio93@gmail.com',
  links: {
    github: 'https://github.com/jerffesonflorencio',
    linkedin: 'https://www.linkedin.com/in/jerffeson-flor%C3%AAncio-5610212b2',
    email: 'mailto:jerffeson.florencio93@gmail.com',
  },
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME ?? 'jerffesonflorencio',
} as const

export const navigation = [
  { label: 'Início', href: '#inicio', id: 'inicio' },
  { label: 'Sobre', href: '#sobre', id: 'sobre' },
  { label: 'Tecnologias', href: '#tecnologias', id: 'tecnologias' },
  { label: 'Projetos', href: '#projetos', id: 'projetos' },
  { label: 'Experiência', href: '#experiencia', id: 'experiencia' },
  { label: 'Contato', href: '#contato', id: 'contato' },
] as const

export const terminalLines = [
  { text: '> iniciando automação...', tone: 'muted' },
  { text: '> conectando banco de dados...', tone: 'muted' },
  { text: '> executando workflow n8n...', tone: 'brand' },
  { text: '> processando informações...', tone: 'muted' },
  { text: '> ✓ processo concluído com sucesso', tone: 'success' },
] as const

export type TerminalLine = (typeof terminalLines)[number]

/* ------------------------------- SOBRE ---------------------------------- */

export const about = {
  title: 'Da gestão de processos para o código.',
  paragraphs: [
    'Mais de 10 anos de experiência em gestão de processos e liderança de equipes no setor industrial — rotinas operacionais, indicadores, pessoas e melhoria contínua.',
    'Em 2024 iniciei a transição profissional para tecnologia. Atualmente curso Análise e Desenvolvimento de Sistemas na Estácio, com conclusão prevista para 2026, e atuo como Estagiário de Projetos na MD Digital Law.',
    'Meu foco está em resolver o problema antes de escrever a primeira linha: entender o processo, medir o gargalo e só então construir a automação que devolve tempo para o time.',
  ],
  quote:
    'Traduzo anos de experiência em processos industriais em soluções de software que automatizam, integram e escalam operações.',
  focus: [
    'Python',
    'Desenvolvimento Back-End',
    'Automação de processos',
    'n8n',
    'APIs',
    'Bancos de dados',
    'Integrações',
    'Docker',
    'Soluções empresariais',
  ],
} as const

/* ----------------------------- INDICADORES ------------------------------ */

export type Stat = {
  value: number | null
  prefix?: string
  suffix?: string
  display?: string
  label: string
  description: string
}

export const stats: Stat[] = [
  {
    value: 10,
    prefix: '+',
    suffix: ' anos',
    label: 'Experiência com processos',
    description: 'Gestão operacional e liderança no setor industrial',
  },
  {
    value: 2024,
    label: 'Início na tecnologia',
    description: 'Transição de carreira para desenvolvimento',
  },
  {
    value: null,
    display: 'Python',
    label: 'Principal linguagem',
    description: 'Back-End, scripts e automações',
  },
  {
    value: null,
    display: 'Automação',
    label: 'Principal especialidade',
    description: 'n8n, integrações e processos ponta a ponta',
  },
]

/* ------------------------------ TECH STACK ------------------------------ */

export type TechCategory = {
  id: string
  title: string
  hint: string
  items: { name: string; icon: string }[]
}

export const techStack: TechCategory[] = [
  {
    id: 'backend',
    title: 'Back-End',
    hint: 'Onde a lógica acontece',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'APIs REST', icon: 'api' },
      { name: 'FastAPI', icon: 'fastapi' },
    ],
  },
  {
    id: 'frontend',
    title: 'Front-End',
    hint: 'Interfaces para operar os sistemas',
    items: [
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'HTML5', icon: 'html' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
    ],
  },
  {
    id: 'automation',
    title: 'Automação',
    hint: 'O coração do meu trabalho',
    items: [
      { name: 'n8n', icon: 'n8n' },
      { name: 'Selenium', icon: 'selenium' },
      { name: 'Automação de processos', icon: 'workflow' },
      { name: 'Integrações de APIs', icon: 'plug' },
    ],
  },
  {
    id: 'database',
    title: 'Banco de Dados',
    hint: 'Dado confiável, decisão confiável',
    items: [
      { name: 'PostgreSQL', icon: 'postgres' },
      { name: 'SQL', icon: 'sql' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps e Ferramentas',
    hint: 'Do ambiente local à entrega',
    items: [
      { name: 'Docker', icon: 'docker' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Linux', icon: 'linux' },
    ],
  },
]

/* ------------------------------- PROJETOS ------------------------------- */

export type Project = {
  id: string
  category: string
  title: string
  description: string
  highlights: string[]
  tags: string[]
  repo?: string
  demo?: string
  accent: 'petrol' | 'aqua' | 'deep'
  /** Linhas exibidas no mockup de código do card */
  snippet: { file: string; lines: string[] }
}

export const projects: Project[] = [
  {
    id: 'automacao-processos',
    category: 'Automação de Processos',
    title: 'Automação de Processos',
    description:
      'Sistema desenvolvido em Python para automatizar atividades operacionais repetitivas utilizando integração com sistemas web, Selenium, APIs e banco de dados.',
    highlights: [
      'Navegação automatizada em sistemas web sem API pública',
      'Persistência e auditoria das execuções em PostgreSQL',
      'Execução isolada e reproduzível em containers Docker',
    ],
    tags: ['Python', 'Selenium', 'PostgreSQL', 'Docker'],
    repo: 'https://github.com/jerffesonflorencio',
    accent: 'petrol',
    snippet: {
      file: 'runner.py',
      lines: [
        'driver = build_driver(headless=True)',
        'for task in queue.pending():',
        '    result = execute(driver, task)',
        '    db.save(result)',
        '# ✓ 0 tarefas manuais restantes',
      ],
    },
  },
  {
    id: 'n8n-workflows',
    category: 'Workflows & Integrações',
    title: 'Automação com n8n',
    description:
      'Workflows responsáveis pela integração entre aplicações, processamento de informações e execução automática de tarefas.',
    highlights: [
      'Gatilhos por webhook conectando sistemas que não conversavam',
      'Tratamento de erros e reprocessamento automático',
      'Notificações e relatórios entregues sem intervenção humana',
    ],
    tags: ['n8n', 'Webhooks', 'APIs', 'Automação'],
    repo: 'https://github.com/jerffesonflorencio',
    accent: 'aqua',
    snippet: {
      file: 'workflow.json',
      lines: [
        '"trigger": "webhook",',
        '"nodes": ["validate", "enrich", "route"],',
        '"onError": "retry(3) → alert",',
        '"output": "database + notify"',
      ],
    },
  },
  {
    id: 'api-backend',
    category: 'Back-End',
    title: 'API Back-End',
    description:
      'API responsável por receber dados, validar informações, processar solicitações e controlar filas de execução.',
    highlights: [
      'Validação de payloads e contratos bem definidos',
      'Fila de execução com controle de status por requisição',
      'Documentação automática dos endpoints',
    ],
    tags: ['Python', 'FastAPI', 'REST API', 'PostgreSQL'],
    repo: 'https://github.com/jerffesonflorencio',
    accent: 'deep',
    snippet: {
      file: 'main.py',
      lines: [
        '@app.post("/jobs")',
        'async def create_job(payload: JobIn):',
        '    job = await queue.enqueue(payload)',
        '    return {"id": job.id, "status": "queued"}',
      ],
    },
  },
]

/* --------------------------- COMO EU DESENVOLVO -------------------------- */

export const processSteps = [
  {
    step: '01',
    title: 'Entendo o processo',
    description: 'Converso com quem executa e mapeio o fluxo real, não o documentado.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'Identifico gargalos',
    description: 'Localizo onde o tempo se perde, o retrabalho nasce e o erro se repete.',
    icon: 'target',
  },
  {
    step: '03',
    title: 'Desenho a solução',
    description: 'Defino integrações, dados, regras e o que realmente vale automatizar.',
    icon: 'draft',
  },
  {
    step: '04',
    title: 'Desenvolvo',
    description: 'Construo com Python, APIs e banco de dados, priorizando clareza.',
    icon: 'code',
  },
  {
    step: '05',
    title: 'Automatizo',
    description: 'Coloco o fluxo para rodar sozinho com n8n, agendamentos e webhooks.',
    icon: 'zap',
  },
  {
    step: '06',
    title: 'Monitoro e evoluo',
    description: 'Acompanho execuções, trato falhas e melhoro o processo continuamente.',
    icon: 'activity',
  },
] as const

/* ------------------------------ EXPERIÊNCIA ----------------------------- */

export type ExperienceItem = {
  period: string
  title: string
  org?: string
  description: string
  current?: boolean
  tags?: string[]
}

export const experience: ExperienceItem[] = [
  {
    period: '+10 anos',
    title: 'Gestão de processos e liderança',
    org: 'Setor industrial',
    description:
      'Experiência no setor industrial, gestão operacional e melhoria de processos, liderando equipes e indicadores no chão de fábrica.',
    tags: ['Processos', 'Liderança', 'Melhoria contínua'],
  },
  {
    period: '2024',
    title: 'Transição para Tecnologia',
    description:
      'Início da jornada profissional em desenvolvimento de software e automação, com foco em Python, back-end e integração de sistemas.',
    tags: ['Python', 'Back-End', 'Automação'],
  },
  {
    period: 'Atualmente',
    title: 'Estagiário de Projetos',
    org: 'MD Digital Law',
    description:
      'Atuação com tecnologia, projetos, automações e soluções aplicadas ao setor jurídico.',
    current: true,
    tags: ['Projetos', 'Automação', 'LegalTech'],
  },
  {
    period: '2026',
    title: 'Conclusão prevista — Análise e Desenvolvimento de Sistemas',
    org: 'Estácio',
    description:
      'Formação superior em Análise e Desenvolvimento de Sistemas, consolidando a base em engenharia de software.',
    tags: ['Estácio', 'ADS'],
  },
]

/* -------------------------------- CONTATO ------------------------------- */

export const contact = {
  headline: 'Tem um processo que poderia ser automatizado?',
  subheadline: 'Vamos transformar essa ideia em uma solução.',
  cta: 'Falar comigo',
} as const

export const footer = {
  copyright: `© ${new Date().getFullYear()} Jerffeson Florêncio. Desenvolvido com código, automação e café. ☕`,
} as const
