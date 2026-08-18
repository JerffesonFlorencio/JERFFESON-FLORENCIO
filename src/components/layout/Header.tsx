import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navigation, profile } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'

const sectionIds = navigation.map((item) => item.id)

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // trava o scroll enquanto o menu mobile estiver aberto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-brand-500/12 bg-base/72 py-2.5 shadow-[0_8px_40px_-24px_rgba(0,0,0,.9)] backdrop-blur-[16px]'
          : 'border-b border-transparent py-4',
      )}
    >
      <div className="container-page flex items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#inicio"
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name} — início`}
        >
          <span className="relative grid size-9 place-items-center rounded-xl border border-brand-500/35 bg-brand-500/[.08] font-bold tracking-tight text-brand-500 transition-all duration-300 group-hover:border-brand-500/70 group-hover:shadow-glow-sm">
            {profile.initials}
            <span className="absolute -inset-px rounded-xl bg-brand-500/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
          </span>
          <span className="hidden text-[15px] font-semibold tracking-tight text-ink sm:block">
            Jerffeson<span className="text-brand-500">.dev</span>
          </span>
        </a>

        {/* Menu desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-full px-4 py-2 text-sm transition-colors duration-300',
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full border border-brand-500/25 bg-brand-500/[.09]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA + hamburguer */}
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href="#contato">
              Vamos conversar
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="grid size-10 cursor-pointer place-items-center rounded-xl border border-white/10 bg-white/[.03] text-ink transition-colors duration-300 hover:border-brand-500/45 hover:text-brand-500 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Navegação mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full mx-4 mt-3 overflow-hidden rounded-2xl border border-brand-500/18 bg-base-soft/95 p-3 shadow-[0_24px_80px_-30px_rgba(0,0,0,1)] backdrop-blur-[16px] lg:hidden"
          >
            <ul className="flex flex-col">
              {navigation.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.3 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] transition-colors duration-200',
                      active === item.id
                        ? 'bg-brand-500/[.10] text-brand-400'
                        : 'text-ink-muted hover:bg-white/[.04] hover:text-ink',
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'size-1.5 rounded-full transition-all',
                        active === item.id ? 'bg-brand-500 shadow-[0_0_10px_#1B8FA8]' : 'bg-white/10',
                      )}
                    />
                  </a>
                </motion.li>
              ))}
            </ul>

            <Button asChild variant="primary" className="mt-3 w-full">
              <a href="#contato" onClick={() => setOpen(false)}>
                Vamos conversar
                <ArrowRight />
              </a>
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
