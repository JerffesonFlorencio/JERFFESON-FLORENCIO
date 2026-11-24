import { lazy, Suspense } from 'react'
import { AlertCircle, ArrowRight, ArrowUpRight, GitFork, Github, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useGitHub } from '@/hooks/useGitHub'
import { profile } from '@/data/site'

const LanguageChart = lazy(() =>
  import('@/components/github/LanguageChart').then((m) => ({ default: m.LanguageChart })),
)

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-white/[.05] ${className}`} />
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(iso),
  )
}

export function GitHubSection() {
  const { status, user, repos, languages, error } = useGitHub(profile.githubUsername)
  const latestRepos = repos.slice(0, 4)

  return (
    <section aria-labelledby="github-titulo" className="section-pad relative">
      <div aria-hidden className="hr-glow container-page mb-14 opacity-40 lg:mb-20" />

      <div className="container-page">
        <SectionHeading
          eyebrow="GitHub"
          title={
            <span id="github-titulo">
              Construindo, automatizando e{' '}
              <span className="serif-accent text-gradient-brand">aprendendo</span> todos os dias.
            </span>
          }
          subtitle="Repositórios públicos carregados diretamente da API do GitHub."
        />

        <Reveal delay={0.12} className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="outline" className="group">
            <a href={profile.links.github} target="_blank" rel="noreferrer noopener">
              <Github />
              Ver meu GitHub
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
        </Reveal>

        {/* ------------------------------ erro ------------------------------ */}
        {status === 'error' && (
          <Reveal className="mt-14">
            <div className="card-surface mx-auto flex max-w-xl items-start gap-4 p-6">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-brand-500" strokeWidth={1.8} />
              <div>
                <p className="text-sm font-medium text-ink">Dados do GitHub indisponíveis</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{error}</p>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] text-brand-500 hover:text-brand-400 hover:underline"
                >
                  Acessar o perfil diretamente
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        )}

        {/* --------------------------- carregando --------------------------- */}
        {status === 'loading' && (
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <div className="card-surface p-7">
              <Skeleton className="h-4 w-32" />
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[0, 1, 2].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="mt-2.5 h-3 w-20" />
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[74px] w-full" />
                ))}
              </div>
            </div>
            <div className="card-surface p-7">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="mx-auto mt-8 h-[200px] w-[200px] rounded-full" />
            </div>
          </div>
        )}

        {/* ---------------------------- sucesso ----------------------------- */}
        {status === 'success' && user && (
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            {/* perfil + repositórios */}
            <Reveal className="h-full">
              <div className="card-surface h-full p-6 sm:p-7">
                <header className="flex items-center gap-4">
                  <img
                    src={user.avatar_url}
                    alt=""
                    width={52}
                    height={52}
                    loading="lazy"
                    className="size-13 rounded-xl border border-brand-500/25 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-ink">
                      {user.name ?? user.login}
                    </p>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-mono text-[12.5px] text-brand-500/85 hover:text-brand-400 hover:underline"
                    >
                      @{user.login}
                    </a>
                  </div>
                </header>

                <dl className="mt-7 grid grid-cols-3 gap-4 border-y border-white/[.06] py-6">
                  {[
                    { label: 'Repositórios', value: user.public_repos },
                    { label: 'Seguidores', value: user.followers },
                    { label: 'Seguindo', value: user.following },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <dd className="text-[1.7rem] font-bold leading-none text-gradient-brand tabular-nums">
                        {metric.value}
                      </dd>
                      <dt className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-muted/70">
                        {metric.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <h3 className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted/70">
                  Últimos projetos públicos
                </h3>

                {latestRepos.length === 0 ? (
                  <p className="mt-4 text-[13.5px] text-ink-muted">
                    Nenhum repositório público próprio encontrado no momento.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-2.5">
                    {latestRepos.map((repo) => (
                      <li key={repo.id}>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group flex items-start gap-3 rounded-xl border border-white/[.06] bg-white/[.02] p-4 transition-all duration-300 hover:-translate-y-[3px] hover:border-brand-500/40 hover:bg-brand-500/[.05]"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="truncate text-[14px] font-medium text-ink group-hover:text-brand-400">
                                {repo.name}
                              </span>
                              <ArrowUpRight className="size-3.5 shrink-0 text-ink-muted/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                            </div>

                            {repo.description && (
                              <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-ink-muted/85">
                                {repo.description}
                              </p>
                            )}

                            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-ink-muted/60">
                              {repo.language && (
                                <span className="flex items-center gap-1.5">
                                  <span className="size-2 rounded-full bg-brand-500" />
                                  {repo.language}
                                </span>
                              )}
                              {repo.stargazers_count > 0 && (
                                <span className="flex items-center gap-1">
                                  <Star className="size-3" />
                                  {repo.stargazers_count}
                                </span>
                              )}
                              {repo.forks_count > 0 && (
                                <span className="flex items-center gap-1">
                                  <GitFork className="size-3" />
                                  {repo.forks_count}
                                </span>
                              )}
                              <span>atualizado em {formatDate(repo.updated_at)}</span>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>

            {/* gráfico de linguagens */}
            <Reveal delay={0.1} className="h-full">
              <div className="card-surface flex h-full flex-col p-6 sm:p-7">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted/70">
                  Distribuição de tecnologias
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-muted/80">
                  Linguagem principal de cada repositório público.
                </p>

                <div className="mt-8 flex-1">
                  {languages.length === 0 ? (
                    <p className="text-[13.5px] text-ink-muted">
                      Ainda não há linguagens detectadas nos repositórios públicos.
                    </p>
                  ) : (
                    <Suspense
                      fallback={<Skeleton className="mx-auto h-[200px] w-[200px] rounded-full" />}
                    >
                      <LanguageChart data={languages} />
                    </Suspense>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}
