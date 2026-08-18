import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/common/Reveal'
import { ContactForm } from '@/components/contact/ContactForm'
import { contact, profile } from '@/data/site'

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: profile.links.email,
    Icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: 'Jerffeson Florêncio',
    href: profile.links.linkedin,
    Icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: '@jerffesonflorencio',
    href: profile.links.github,
    Icon: Github,
  },
]

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="relative overflow-hidden py-28 lg:py-36">
      {/* iluminação da seção */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/35 to-transparent" />
        <div className="glow-soft absolute left-1/2 top-0 size-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-70" />
        <div className="tech-grid absolute inset-0 opacity-50" />
      </div>

      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/22 bg-brand-500/[.06] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-400">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-brand-500 shadow-[0_0_10px_#1B8FA8]" />
              Contato
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="contato-titulo"
              className="mt-6 text-balance text-[2.1rem] font-bold leading-[1.06] sm:text-[2.9rem] lg:text-[3.4rem]"
            >
              Tem um processo que poderia ser{' '}
              <span className="serif-accent text-gradient-brand">automatizado?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted sm:text-[17.5px]">
              {contact.subheadline}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-9 flex justify-center">
              <Button asChild size="lg" className="group">
                <a href={profile.links.email}>
                  {contact.cta}
                  <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* canais + formulário */}
        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-6">
          <Reveal className="h-full">
            <div className="flex h-full flex-col gap-3">
              {channels.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  className="card-surface card-lift group flex items-center gap-4 p-5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand-500/20 bg-brand-950/25 text-brand-500 transition-all duration-300 group-hover:border-brand-500/55 group-hover:shadow-glow-sm">
                    <Icon className="size-[18px]" strokeWidth={1.7} aria-hidden />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-muted/65">
                      {label}
                    </span>
                    <span className="mt-1 block truncate text-[14px] text-ink transition-colors group-hover:text-brand-400">
                      {value}
                    </span>
                  </span>

                  <ArrowUpRight className="size-4 shrink-0 text-ink-muted/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </a>
              ))}

              <div className="card-surface mt-auto hidden p-5 lg:block">
                <p className="text-[13.5px] leading-relaxed text-ink-muted">
                  Respondo normalmente em até{' '}
                  <span className="text-brand-400">24 horas</span> nos dias úteis.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
