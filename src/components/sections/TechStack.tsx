import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/common/SectionHeading'
import { TechIcon } from '@/components/common/TechIcon'
import { fadeUp, staggerContainer } from '@/components/common/Reveal'
import { techStack } from '@/data/site'

export function TechStack() {
  return (
    <section id="tecnologias" aria-labelledby="tecnologias-titulo" className="section-pad relative">
      {/* separador luminoso */}
      <div aria-hidden className="hr-glow container-page mb-14 opacity-40 lg:mb-20" />

      <div className="container-page">
        <SectionHeading
          eyebrow="Stack"
          title={
            <span id="tecnologias-titulo">
              Tecnologias que <span className="serif-accent text-gradient-brand">utilizo</span>
            </span>
          }
          subtitle="Ferramentas que uso para construir aplicações full stack, conectar sistemas e colocar processos para rodarem sozinhos."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-70px 0px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
        >
          {techStack.map((category, index) => (
            <motion.article
              key={category.id}
              variants={fadeUp}
              className={
                'card-surface card-lift group relative overflow-hidden p-6 sm:p-8 ' +
                // as duas primeiras categorias ganham destaque no desktop
                (index === 0 ? 'lg:col-span-2' : '')
              }
            >
              <span
                aria-hidden
                className="absolute -right-20 -top-20 size-48 rounded-full bg-brand-500/[.06] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <header className="flex items-baseline justify-between gap-4">
                <h3 className="text-[19px] font-semibold text-ink sm:text-[21px]">{category.title}</h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </header>

              <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{category.hint}</p>

              <ul
                className={
                  'mt-7 grid gap-2.5 ' + (index === 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')
                }
              >
                {category.items.map((tech) => (
                  <li key={tech.name}>
                    <div className="flex items-center gap-3 rounded-xl border border-white/[.09] bg-white/[.035] px-3.5 py-3 transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:border-brand-500/45 hover:bg-brand-500/[.08]">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-brand-500/18 bg-brand-950/25 text-brand-500 transition-all duration-300 group-hover:border-brand-500/30">
                        <TechIcon name={tech.icon} className="size-[18px]" />
                      </span>
                      <span className="text-[14px] font-medium leading-snug text-ink">
                        {tech.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
