import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { footer, navigation, profile } from '@/data/site'

const socials = [
  { label: 'GitHub', href: profile.links.github, Icon: Github },
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: Linkedin },
  { label: 'Email', href: profile.links.email, Icon: Mail },
]

export function Footer() {
  return (
    <footer className="relative border-t border-brand-500/12 bg-base-soft/40">
      <div aria-hidden className="tech-grid absolute inset-0 opacity-30" />

      <div className="container-page relative py-14 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* identidade */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl border border-brand-500/35 bg-brand-500/[.08] font-bold tracking-tight text-brand-500">
                {profile.initials}
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-ink">
                {profile.name}
              </span>
            </div>

            <p className="mt-4 font-mono text-[12.5px] tracking-[0.1em] text-brand-500/80">
              {profile.role}
            </p>

            <p className="mt-4 text-[13.5px] leading-relaxed text-ink-muted/85">
              Automações, integrações e sistemas que transformam processos manuais em operações
              escaláveis.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  aria-label={label}
                  title={label}
                  className="grid size-10 cursor-pointer place-items-center rounded-xl border border-white/10 bg-white/[.03] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/45 hover:text-brand-500"
                >
                  <Icon className="size-[17px]" strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </div>

          {/* navegação */}
          <nav aria-label="Navegação do rodapé">
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted/60">
              Navegação
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-[13.5px] text-ink-muted transition-colors hover:text-brand-500"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* voltar ao topo */}
          <a
            href="#inicio"
            className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[.03] px-5 py-3 text-[13px] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/45 hover:text-brand-500"
          >
            Voltar ao topo
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div aria-hidden className="hr-glow my-10 opacity-35" />

        <p className="text-center text-[12.5px] text-ink-muted/70">{footer.copyright}</p>
      </div>
    </footer>
  )
}
