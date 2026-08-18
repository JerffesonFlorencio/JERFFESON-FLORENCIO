import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-brand-500/25 bg-brand-500/[.08] text-brand-400',
        muted: 'border-white/10 bg-white/[.04] text-ink-muted',
        solid: 'border-transparent bg-brand-500 text-[#02171C]',
        mono: 'border-brand-500/20 bg-brand-950/30 font-mono text-[11px] text-[#8FD6E6]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
