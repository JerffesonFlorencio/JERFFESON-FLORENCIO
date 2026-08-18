import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionHeading } from '@/components/common/SectionHeading'
import { experience } from '@/data/site'
import { cn } from '@/lib/utils'

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 78%', 'end 60%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experiencia" aria-labelledby="experiencia-titulo" className="section-pad relative">
      <div aria-hidden className="hr-glow container-page mb-24 opacity-40" />

      <div className="container-page">
        <SectionHeading
          eyebrow="Trajetória"
          title={
            <span id="experiencia-titulo">
              Uma carreira construída <span className="serif-accent text-gradient-brand">em camadas</span>
            </span>
          }
          subtitle="Do chão de fábrica ao código: cada etapa somou uma peça na forma como resolvo problemas hoje."
        />

        <div ref={timelineRef} className="relative mx-auto mt-16 max-w-3xl lg:mt-24">
          {/* linha vertical */}
          <div
            aria-hidden
            className="absolute bottom-4 left-[13px] top-3 w-px bg-white/[.07] sm:left-[15px]"
          >
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-px origin-top bg-gradient-to-b from-brand-700 via-brand-500 to-brand-400 shadow-[0_0_16px_rgba(27,143,168,.65)]"
            />
          </div>

          <ol className="space-y-10 sm:space-y-12">
            {experience.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px 0px' }}
                transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative pl-12 sm:pl-16"
              >
                {/* ponto luminoso */}
                <span className="absolute left-0 top-1.5 z-10 grid size-7 place-items-center rounded-full border border-brand-500/30 bg-base sm:size-8">
                  <span
                    className={cn(
                      'size-2 rounded-full transition-all duration-300',
                      item.current
                        ? 'animate-pulse-dot bg-brand-500 shadow-[0_0_14px_#1B8FA8]'
                        : 'bg-brand-700 shadow-[0_0_8px_rgba(16,105,124,.7)] group-hover:bg-brand-500 group-hover:shadow-[0_0_14px_#1B8FA8]',
                    )}
                  />
                </span>

                <article className="card-surface p-6 sm:p-7">
                  <header className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-brand-500/25 bg-brand-500/[.08] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-400">
                      {item.period}
                    </span>
                    {item.current && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-emerald-400/85">
                        <span className="size-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
                        em andamento
                      </span>
                    )}
                  </header>

                  <h3 className="mt-4 text-[17px] font-semibold leading-snug text-ink sm:text-[19px]">
                    {item.title}
                  </h3>

                  {item.org && (
                    <p className="mt-1 text-[13.5px] font-medium text-brand-500/85">{item.org}</p>
                  )}

                  <p className="mt-3 text-[14.5px] leading-[1.72] text-ink-muted">
                    {item.description}
                  </p>

                  {item.tags && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
