import {
  Atom,
  Braces,
  Code2,
  Container,
  Database,
  FileCode2,
  FileType2,
  GitBranch,
  Github,
  MousePointerClick,
  Network,
  Plug,
  Repeat,
  Table2,
  Terminal,
  Wind,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  python: FileCode2,
  api: Network,
  fastapi: Zap,
  javascript: Braces,
  typescript: FileType2,
  react: Atom,
  html: Code2,
  tailwind: Wind,
  n8n: Workflow,
  selenium: MousePointerClick,
  workflow: Repeat,
  plug: Plug,
  postgres: Database,
  sql: Table2,
  docker: Container,
  git: GitBranch,
  github: Github,
  linux: Terminal,
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Code2
  return <Icon className={className} strokeWidth={1.6} aria-hidden />
}
