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
          <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-500/30 bg-brand-500/[.08] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#9ddce9]">
            <span className="size-1.5 rounded-full bg-brand-500 shadow-[0_0_10px_#1B8FA8]" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2 className="max-w-[22ch] text-balance text-[2rem] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[2.65rem] lg:text-[3.15rem]">
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              'mt-6 max-w-[60ch] text-[15.5px] leading-[1.75] text-ink-muted sm:text-[17px]',
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
