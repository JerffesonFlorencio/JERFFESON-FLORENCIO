import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: Props) {
  const centered = align === 'center'

  return (
    <div className={cn('flex flex-col', centered ? 'items-center text-center' : 'items-start', className)}>
      {eyebrow && (
        <Reveal delay={0.02}>
          <span className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-brand-500/22 bg-brand-500/[.06] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-400">
            <span className="size-1.5 rounded-full bg-brand-500 shadow-[0_0_10px_#1B8FA8]" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2 className="text-balance text-[2rem] font-bold leading-[1.08] sm:text-[2.6rem] lg:text-[3.1rem]">
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              'mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-base',
              centered && 'mx-auto',
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
