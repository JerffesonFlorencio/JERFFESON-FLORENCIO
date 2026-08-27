import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, MousePointer2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TerminalCard } from '@/components/hero/TerminalCard'
import { ParticleField } from '@/components/three/ParticleField'
import { profile } from '@/data/site'

const EASE = [0.16, 1, 0.3, 1] as const

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

const socials = [
  { label: 'GitHub', href: profile.links.github, Icon: Github },
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: Linkedin },
  { label: 'Email', href: profile.links.email, Icon: Mail },
]

export function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Apresentação"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-20 lg:pt-32"
    >
      {/* fundo: radial em azul petróleo + grade + partículas */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="hero-radial absolute inset-0" />
        <div className="tech-grid tech-grid-fade absolute inset-0" />
        <ParticleField className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />
      </div>

      <div className="container-page">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 xl:gap-20"
        >
          {/* ------------------------- coluna de texto ------------------------ */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/25 bg-brand-500/[.07] px-4 py-2 text-[12.5px] text-brand-400 backdrop-blur-sm sm:text-[13px]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
                </span>
                {profile.availability}
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-7 font-mono text-[12px] uppercase tracking-[0.32em] text-ink-muted/80 sm:text-[13px]"
            >
              {profile.name}
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-4 max-w-[16ch] text-balance text-[2.4rem] font-bold leading-[1.03] tracking-[-0.035em] sm:text-[3.2rem] lg:max-w-none lg:text-[3.6rem] xl:text-[4.1rem]"
            >
              {profile.headline.lead}{' '}
              <span className="serif-accent text-gradient-brand">{profile.headline.accent}</span>{' '}
              <span className="text-ink">{profile.headline.tail}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 font-mono text-[12.5px] tracking-[0.16em] text-brand-500/85 sm:text-sm"
            >
              {profile.role}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-5 max-w-[54ch] text-[15px] leading-[1.75] text-ink-muted sm:text-[16.5px]"
            >
              {profile.description}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              {/* CTA de Projetos desativado temporariamente (seção off)
              <Button asChild size="lg" variant="primary" className="group w-full sm:w-auto">
                <a href="#projetos">
                  Conhecer meus projetos
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
              */}
              <Button asChild size="lg" variant="primary" className="group w-full sm:w-auto">
                <a href="#contato">
                  Entrar em contato
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-9 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  aria-label={label}
                  title={label}
                  className="group grid size-11 cursor-pointer place-items-center rounded-xl border border-white/10 bg-white/[.03] text-ink-muted transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/50 hover:bg-brand-500/[.08] hover:text-brand-500 hover:shadow-glow-sm"
                >
                  <Icon className="size-[18px]" strokeWidth={1.7} />
                </a>
              ))}
              <span className="ml-1 hidden font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted/50 sm:block">
                conecte-se
              </span>
            </motion.div>
          </div>

          {/* ------------------------ coluna visual --------------------------- */}
          <motion.div variants={item} className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div className="relative flex flex-col">
              {/* retrato */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                className="relative z-10 mx-auto w-[78%] max-w-[380px] sm:w-[68%] lg:mx-0 lg:ml-auto lg:w-[76%]"
              >
                <div className="absolute -inset-8 -z-10 rounded-full bg-brand-500/[.16] blur-[70px]" />

                {/* moldura */}
                <div className="relative overflow-hidden rounded-[22px] border border-brand-500/25 bg-base-card/60 p-1.5 shadow-[0_40px_120px_-45px_rgba(27,143,168,.65)]">
                  <img
                    src={profile.photo}
                    alt={`Retrato de ${profile.name}, desenvolvedor Full Stack e de automações`}
                    width={640}
                    height={640}
                    loading="eager"
                    decoding="async"
                    className="aspect-square w-full rounded-[16px] object-cover object-top"
                  />
                  {/* gradiente inferior para fundir com o fundo */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-1.5 bottom-1.5 h-1/3 rounded-b-[16px] bg-gradient-to-t from-[#141414] via-[#141414]/45 to-transparent"
                  />
                  {/* brilho de borda */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/[.06]"
                  />
                </div>

                {/* cantos técnicos */}
                <span
                  aria-hidden
                  className="absolute -left-2 -top-2 size-6 rounded-tl-lg border-l-2 border-t-2 border-brand-500/55"
                />
                <span
                  aria-hidden
                  className="absolute -right-2 -top-2 size-6 rounded-tr-lg border-r-2 border-t-2 border-brand-500/55"
                />
              </motion.div>

              {/* terminal: empilhado abaixo do retrato, sem sobreposição */}
              <TerminalCard className="mt-6 lg:mt-8 lg:mr-auto lg:w-[94%] xl:w-[88%]" />
            </div>
          </motion.div>
        </motion.div>

        {/* indicador de scroll */}
        <motion.a
          href="#sobre"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mx-auto mt-16 hidden w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted/55 transition-colors hover:text-brand-500 lg:mt-12 lg:flex"
        >
          <MousePointer2 className="size-3.5 animate-float" />
          role para explorar
        </motion.a>
      </div>

      {/* marcador decorativo lateral */}
      <a
        href={profile.links.github}
        target="_blank"
        rel="noreferrer noopener"
        className="absolute bottom-10 right-6 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted/40 transition-colors hover:text-brand-500 xl:flex"
      >
        github
        <ArrowUpRight className="size-3.5" />
      </a>
    </section>
  )
}
