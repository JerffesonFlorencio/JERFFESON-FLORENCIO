import { Quote } from 'lucide-react'
import { Reveal } from '@/components/common/Reveal'
import { about } from '@/data/site'
import { Stats } from './Stats'

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="section-pad relative">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          {/* coluna esquerda: título */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/22 bg-brand-500/[.06] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-400">
                <span className="size-1.5 rounded-full bg-brand-500 shadow-[0_0_10px_#1B8FA8]" />
                Sobre mim
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="sobre-titulo"
                className="mt-6 text-balance text-[2rem] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[2.6rem] lg:text-[2.9rem]"
              >
                Da <span className="serif-accent text-gradient-brand">gestão de processos</span>
                <br className="hidden sm:block" /> para o código.
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="hr-glow mt-8 w-24" />
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {about.focus.map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* coluna direita: texto + citação */}
          <div>
            <div className="space-y-6">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.05 * index}>
                  <p className="max-w-[65ch] text-[15.5px] leading-[1.85] text-ink-muted sm:text-[17px]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* card de citação com linha vertical em azul petróleo */}
            <Reveal delay={0.15}>
              <figure className="card-surface relative mt-10 overflow-hidden p-7 sm:p-9">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-brand-500 via-brand-700 to-transparent"
                />
                <span
                  aria-hidden
                  className="absolute -right-16 -top-16 size-52 rounded-full bg-brand-500/[.07] blur-3xl"
                />

                <Quote className="mb-4 size-7 text-brand-500/45" strokeWidth={1.5} aria-hidden />

                <blockquote className="text-balance text-[18px] font-medium leading-[1.6] text-ink sm:text-[22px]">
                  <span className="serif-accent text-[1.06em] text-brand-400">“</span>
                  {about.quote}
                  <span className="serif-accent text-[1.06em] text-brand-400">”</span>
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted/70">
                  <span className="h-px w-8 bg-brand-500/50" />
                  Jerffeson Florêncio
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* indicadores */}
        <Stats />
      </div>
    </section>
  )
}
