import { motion } from 'framer-motion'
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
  return (
    <section aria-labelledby="processo-titulo" className="section-pad relative">
      <div aria-hidden className="hr-glow container-page mb-14 opacity-40 lg:mb-20" />

      <div className="container-page">
        <SectionHeading
          eyebrow="Método"
          title={
            <span id="processo-titulo">
              Do problema à <span className="serif-accent text-gradient-brand">solução.</span>
            </span>
          }
          subtitle="Software bom começa longe do editor de código: começa entendendo como o processo realmente acontece."
        />

        <div className="relative mt-14 lg:mt-20">
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
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
                  className="card-surface card-lift group relative flex gap-4 p-5 sm:flex-col sm:gap-0 sm:p-6"
                >
                  {/* nó */}
                  <div className="relative z-10 shrink-0">
                    <span className="grid size-10 place-items-center rounded-xl border border-brand-500/35 bg-brand-950/40 transition-all duration-300 group-hover:border-brand-500/70 group-hover:shadow-glow-sm">
                      <Icon className="size-[17px] text-brand-500" strokeWidth={1.7} aria-hidden />
                    </span>
                    <span
                      aria-hidden
                      className="absolute -inset-1.5 -z-10 rounded-2xl bg-brand-500/15 opacity-0 blur-md transition-opacity duration-400 group-hover:opacity-100"
                    />
                  </div>

                  <div className="sm:mt-6">
                    <span className="block font-mono text-[11px] tracking-[0.18em] text-[#9ddce9]">
                      {step.step}
                    </span>
                    <h3 className="mt-2 text-[17px] font-semibold leading-snug text-ink sm:text-[19px]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-ink-muted">
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
