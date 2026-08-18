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
    <article className="card-surface card-lift group flex h-full flex-col">
      {/* -------------------------- mockup de código ------------------------- */}
      <div className="relative overflow-hidden rounded-t-[16px] border-b border-white/[.06]">
        <div className={cn('absolute inset-0 bg-gradient-to-br', accentGradient[project.accent])} />
        <div className="tech-grid absolute inset-0 opacity-40" />

        <div className="relative p-5">
          <div className="rounded-xl border border-brand-500/18 bg-[#070C0E]/85 shadow-[0_18px_50px_-30px_rgba(0,0,0,1)] backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-white/[.06] px-3.5 py-2">
              <Terminal className="size-3.5 text-brand-500/70" strokeWidth={1.8} aria-hidden />
              <span className="font-mono text-[11px] text-ink-muted/85">{project.snippet.file}</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-ink-muted/40">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <pre className="overflow-x-auto px-3.5 py-3 font-mono text-[11.5px] leading-[1.75] text-ink-muted/85">
              <code>
                {project.snippet.lines.map((line) => (
                  <span key={line} className="block whitespace-pre">
                    {line.startsWith('#') || line.startsWith('//') ? (
                      <span className="text-emerald-400/70">{line}</span>
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
      <div className="flex flex-1 flex-col p-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-500/85">
          {project.category}
        </span>

        <h3 className="mt-2.5 text-[19px] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-brand-400">
          {project.title}
        </h3>

        <p className="mt-3 text-[14.5px] leading-[1.72] text-ink-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
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
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-6 space-y-2.5 border-l border-brand-500/25 pl-4">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative text-[13.5px] leading-relaxed text-ink-muted"
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
            aria-controls={panelId}
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
