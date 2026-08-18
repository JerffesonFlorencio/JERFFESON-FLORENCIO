import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { fadeUp, staggerContainer } from '@/components/common/Reveal'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { projects } from '@/data/site'
import { cn } from '@/lib/utils'

export function Projects() {
  // Carrossel ativo apenas até lg; acima disso vira grid estático.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    breakpoints: { '(min-width: 1024px)': { active: false } },
  })

  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    setSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect).on('reInit', () => {
      setSnaps(emblaApi.scrollSnapList())
      onSelect()
    })
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="section-pad relative">
      <div className="container-page">
        <SectionHeading
          eyebrow="Projetos"
          align="left"
          title={
            <span id="projetos-titulo">
              Projetos que transformam{' '}
              <span className="serif-accent text-gradient-brand">processos reais</span>
            </span>
          }
          subtitle="Algumas das soluções que desenvolvi utilizando automação, integração de sistemas e desenvolvimento Back-End."
        />

        {/* controles do carrossel (apenas mobile/tablet) */}
        <div className="mt-10 flex items-center justify-between lg:hidden">
          <div className="flex gap-1.5" role="tablist" aria-label="Navegação de projetos">
            {snaps.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === selected}
                aria-label={`Ir para o projeto ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  'h-1.5 cursor-pointer rounded-full transition-all duration-300',
                  index === selected
                    ? 'w-7 bg-brand-500 shadow-[0_0_12px_rgba(27,143,168,.6)]'
                    : 'w-1.5 bg-white/15 hover:bg-white/30',
                )}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Projeto anterior"
              className="grid size-10 cursor-pointer place-items-center rounded-xl border border-white/10 bg-white/[.03] text-ink-muted transition-colors hover:border-brand-500/45 hover:text-brand-500"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Próximo projeto"
              className="grid size-10 cursor-pointer place-items-center rounded-xl border border-white/10 bg-white/[.03] text-ink-muted transition-colors hover:border-brand-500/45 hover:text-brand-500"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* trilho: carrossel no mobile, grid no desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-70px 0px' }}
          className="mt-6 overflow-hidden lg:mt-14 lg:overflow-visible"
          ref={emblaRef}
        >
          <div className="flex touch-pan-y lg:grid lg:grid-cols-3 lg:gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                className="min-w-0 flex-[0_0_86%] pl-4 first:pl-0 sm:flex-[0_0_58%] lg:flex-none lg:pl-0"
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="mt-8 text-center font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink-muted/45 lg:hidden">
          arraste para ver mais →
        </p>
      </div>
    </section>
  )
}
