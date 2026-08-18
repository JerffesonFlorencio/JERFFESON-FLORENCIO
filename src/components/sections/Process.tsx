import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Activity, Code2, PenTool, Search, Target, Zap, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { processSteps } from '@/data/site'

const stepIcons: Record<string, LucideIcon> = {
  search: Search,
  target: Target,
  draft: PenTool,
  code: Code2,
  zap: Zap,
  activity: Activity,
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)

  // a linha de destaque se preenche conforme o scroll atravessa a seção
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 55%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section aria-labelledby="processo-titulo" className="section-pad relative">
      <div aria-hidden className="hr-glow container-page mb-24 opacity-40" />

      <div className="container-page">
        <SectionHeading
          eyebrow="Método"
          title={
            <span id="processo-titulo">
              Do problema à <span className="serif-accent text-gradient-brand">automação.</span>
            </span>
          }
          subtitle="Automação boa começa longe do editor de código: começa entendendo como o processo realmente acontece."
        />

        <div ref={containerRef} className="relative mt-16 lg:mt-24">
          {/* linha condutora — horizontal no desktop */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[38px] hidden h-px bg-white/[.07] lg:block"
          >
            <motion.div
              style={{ scaleX: lineScale }}
              className="h-px origin-left bg-gradient-to-r from-brand-700 via-brand-500 to-brand-400 shadow-[0_0_14px_rgba(27,143,168,.7)]"
            />
          </div>

          {/* linha condutora — vertical no mobile */}
          <div
            aria-hidden
            className="absolute bottom-6 left-[19px] top-6 w-px bg-white/[.07] lg:hidden"
          >
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-px origin-top bg-gradient-to-b from-brand-700 via-brand-500 to-brand-400 shadow-[0_0_14px_rgba(27,143,168,.7)]"
            />
          </div>

          <ol className="relative grid gap-8 lg:grid-cols-6 lg:gap-4">
            {processSteps.map((step, index) => {
              const Icon = stepIcons[step.icon] ?? Code2
              return (
                <motion.li
                  key={step.step}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px 0px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex gap-5 pl-0 lg:flex-col lg:gap-0"
                >
                  {/* nó */}
                  <div className="relative z-10 shrink-0">
                    <span className="grid size-10 place-items-center rounded-xl border border-brand-500/30 bg-base transition-all duration-400 group-hover:border-brand-500/70 group-hover:shadow-glow-sm">
                      <Icon className="size-[17px] text-brand-500" strokeWidth={1.7} aria-hidden />
                    </span>
                    <span
                      aria-hidden
                      className="absolute -inset-1.5 -z-10 rounded-2xl bg-brand-500/15 opacity-0 blur-md transition-opacity duration-400 group-hover:opacity-100"
                    />
                  </div>

                  <div className="lg:mt-6 lg:pr-3">
                    <span className="block font-mono text-[11px] tracking-[0.2em] text-brand-500/70">
                      {step.step}
                    </span>
                    <h3 className="mt-2 text-[15.5px] font-semibold leading-snug text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted/85">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
