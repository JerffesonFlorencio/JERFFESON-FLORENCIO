# Jerffeson Florêncio — Portfólio

Portfólio profissional com foco em **Back-End, Automação, Python e n8n**.
Landing page dark premium em **azul petróleo**, responsiva, com animações de scroll,
partículas em Three.js, dados reais do GitHub e formulário de contato persistido no Supabase.

## Paleta

| Token | Hex | Uso |
| --- | --- | --- |
| `base` | `#141414` | Background principal |
| `base-soft` | `#14191B` | Background secundário |
| `base-card` | `#161D20` | Cards |
| `base-alt` | `#1A2529` | Cards alternativos |
| `brand-950` | `#06333D` | Petróleo profundo |
| `brand-900` | `#0B4A57` | Petróleo escuro |
| `brand-700` | `#10697C` | Intermediário |
| `brand-500` | `#1B8FA8` | **Destaque** (CTAs, ícones, glow) |
| `brand-400` | `#2AA6C0` | Hover claro |
| `ink` | `#F7F7F7` | Branco principal |
| `ink-muted` | `#B8AEA7` | Texto secundário |

Para trocar a paleta inteira, edite `theme.extend.colors` em
[`tailwind.config.js`](tailwind.config.js) e as variáveis `:root` em
[`src/index.css`](src/index.css).

## Stack

| Camada | Tecnologias |
| --- | --- |
| Base | React 18 + TypeScript + Vite |
| Estilo | Tailwind CSS + componentes no padrão shadcn/ui (`src/components/ui`) |
| Animação | Framer Motion |
| 3D | Three.js (partículas do Hero) |
| Dados | Supabase (contato) + API pública do GitHub |
| Gráficos | Recharts |
| Carrossel | Embla Carousel (projetos no mobile) |

## Rodando localmente

```bash
npm install
```

```bash
npm run dev
```

Outros scripts:

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run lint
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

```
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
VITE_GITHUB_USERNAME=jerffesonflorencio
```

O site funciona **sem** Supabase configurado: nesse caso o formulário de contato
faz fallback para o cliente de e-mail com os campos já preenchidos.

## Supabase — tabela de contato

Execute `supabase/migrations/0001_contact_messages.sql` no SQL Editor do projeto.
A migração cria a tabela `contact_messages` com RLS habilitado:

- `anon` pode **apenas inserir** mensagens;
- somente usuários autenticados conseguem ler o conteúdo recebido.

## Como editar o conteúdo

Todo o conteúdo textual fica em [`src/data/site.ts`](src/data/site.ts).

**Adicionar um novo projeto** — inclua um objeto no array `projects`:

```ts
{
  id: 'novo-projeto',
  category: 'Automação',
  title: 'Nome do projeto',
  description: 'O que ele resolve.',
  highlights: ['Ponto 1', 'Ponto 2'],
  tags: ['Python', 'FastAPI'],
  repo: 'https://github.com/...',
  accent: 'petrol',            // 'petrol' | 'aqua' | 'deep'
  snippet: { file: 'main.py', lines: ['# código de exemplo'] },
}
```

O grid do desktop e o carrossel do mobile se ajustam automaticamente.
O mesmo vale para `techStack`, `experience`, `processSteps` e `stats`.

## Estrutura

```
src/
  components/
    common/     Reveal, SectionHeading, GridBackground, TechIcon
    contact/    ContactForm
    github/     LanguageChart (Recharts)
    hero/       TerminalCard (animação de digitação)
    layout/     Header, Footer
    projects/   ProjectCard
    sections/   Hero, About, Stats, TechStack, Projects, Process,
                Experience, GitHubSection, Contact
    three/      ParticleField
    ui/         button, card, badge, input (padrão shadcn/ui)
  data/site.ts  Conteúdo do site
  hooks/        useActiveSection, useCountUp, useTypewriter,
                useDevicePerformance, useGitHub
  lib/          supabase.ts, utils.ts
```

## Performance e acessibilidade

- O `ParticleField` adapta a quantidade de partículas, o DPR e as linhas de
  conexão ao hardware (`useDevicePerformance`), e é **desligado** em
  `prefers-reduced-motion`, sem WebGL ou em dispositivos limitados.
- A animação pausa quando a aba está oculta ou o Hero sai da tela.
- Recharts e o gráfico de linguagens são carregados sob demanda (`React.lazy`).
- Estrutura semântica (`header`/`main`/`section`/`article`/`footer`), skip link,
  foco visível, `aria-*` nos componentes interativos e retrato otimizado (63 KB).

## Dados do GitHub

A seção de GitHub consome a API pública em tempo real. Nenhuma estatística é
simulada: se a requisição falhar ou o rate limit for atingido, a seção exibe
um aviso e o link direto para o perfil.

## Deploy

Build estático em `dist/` — compatível com Vercel, Netlify, Cloudflare Pages ou
GitHub Pages. Lembre-se de cadastrar as variáveis `VITE_*` no painel do provedor
e de atualizar o domínio em `index.html` (`canonical`, `og:url`) e em
`public/sitemap.xml`.
