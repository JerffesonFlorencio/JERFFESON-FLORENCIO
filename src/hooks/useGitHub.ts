import { useEffect, useState } from 'react'

export type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics?: string[]
  fork: boolean
}

export type GitHubUser = {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  bio: string | null
}

export type LanguageSlice = { name: string; value: number }

type State = {
  status: 'loading' | 'success' | 'error'
  user: GitHubUser | null
  repos: GitHubRepo[]
  languages: LanguageSlice[]
  error: string | null
}

const initialState: State = {
  status: 'loading',
  user: null,
  repos: [],
  languages: [],
  error: null,
}

/**
 * Busca dados públicos reais da API do GitHub.
 * Nada é inventado: se a requisição falhar (ou o rate limit estourar),
 * a seção exibe um estado de erro em vez de números fictícios.
 */
export function useGitHub(username: string) {
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setState(initialState)
      try {
        const headers = { Accept: 'application/vnd.github+json' }

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            headers,
            signal: controller.signal,
          }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
            headers,
            signal: controller.signal,
          }),
        ])

        if (!userRes.ok || !reposRes.ok) {
          throw new Error(
            userRes.status === 403 || reposRes.status === 403
              ? 'Limite de requisições da API do GitHub atingido. Tente novamente em alguns minutos.'
              : 'Não foi possível carregar os dados do GitHub agora.',
          )
        }

        const user: GitHubUser = await userRes.json()
        const allRepos: GitHubRepo[] = await reposRes.json()

        const repos = allRepos
          .filter((repo) => !repo.fork)
          .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))

        const counts = new Map<string, number>()
        for (const repo of repos) {
          if (!repo.language) continue
          counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
        }

        const languages = [...counts.entries()]
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)

        setState({ status: 'success', user, repos, languages, error: null })
      } catch (err) {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          user: null,
          repos: [],
          languages: [],
          error: err instanceof Error ? err.message : 'Erro desconhecido.',
        })
      }
    }

    void load()
    return () => controller.abort()
  }, [username])

  return state
}
