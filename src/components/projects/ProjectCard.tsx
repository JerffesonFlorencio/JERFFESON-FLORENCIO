import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Github, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Project } from '@/data/site'
import { cn } from '@/lib/utils'

const accentGradient: Record<Project['accent'], string> = {
  petrol: 'from-[#1B8FA8]/22 via-[#10697C]/10 to-transparent',
  aqua: 'from-[#2AA6C0]/20 via-[#0B4A57]/12 to-transparent',
  deep: 'from-[#10697C]/22 via-[#06333D]/14 to-transparent',
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <article className="card-surface card-lift group relative flex h-full flex-col overflow-hidden">
      {/* -------------------------- mockup de código ------------------------- */}
      <div className="relative overflow-hidden border-b border-white/[.08]">
        <div className={cn('absolute inset-0 bg-gradient-to-br', accentGradient[project.accent])} />
        <div className="tech-grid absolute inset-0 opacity-40" />

        <div className="relative p-5 sm:p-6">
          <div className="rounded-xl border border-brand-500/25 bg-[#070C0E]/90 shadow-[0_20px_50px_-28px_rgba(0,0,0,.95)] transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-1">
            <div className="flex items-center gap-2 border-b border-white/[.06] px-3.5 py-2">
              <Terminal className="size-3.5 text-brand-500/70" strokeWidth={1.8} aria-hidden />
              <span className="font-mono text-[11px] text-ink-muted">{project.snippet.file}</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-ink-muted/75">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <pre className="overflow-x-auto px-3.5 py-4 font-mono text-[11.5px] leading-[1.75] text-ink-muted">
              <code>
                {project.snippet.lines.map((line) => (
                  <span key={line} className="block whitespace-pre">
                    {line.startsWith('#') || line.startsWith('//') ? (
                      <span className="text-emerald-300/90">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* ------------------------------ conteúdo ---------------------------- */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9ddce9]">
          {project.category}
        </span>

        <h3 className="mt-3 text-[20px] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-[#9ddce9] sm:text-[22px]">
          {project.title}
        </h3>

        <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.75] text-ink-muted">{project.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        {/* detalhes expansíveis */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-6 space-y-2.5 border-l border-brand-500/25 pl-4">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative text-[14px] leading-[1.7] text-ink-muted"
                  >
                    <span
                      aria-hidden
                      className="absolute -left-[21px] top-2 size-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_#1B8FA8]"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ações */}
        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-7">
          {project.repo && (
            <Button asChild variant="dark" size="sm">
              <a href={project.repo} target="_blank" rel="noreferrer noopener">
                <Github />
                GitHub
              </a>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            aria-expanded={open}
            aria-controls={open ? panelId : undefined}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Ocultar' : 'Detalhes'}
            <ChevronDown
              className={cn('transition-transform duration-300', open && 'rotate-180')}
            />
          </Button>
        </div>
      </div>
    </article>
  )
}
