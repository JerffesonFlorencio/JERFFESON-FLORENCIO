import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-500 text-[#02171C] font-semibold shadow-[0_10px_40px_-10px_rgba(27,143,168,.7)] hover:bg-brand-400 hover:shadow-[0_14px_48px_-8px_rgba(27,143,168,.85)] hover:-translate-y-0.5 active:translate-y-0',
        outline:
          'border border-brand-500/30 bg-brand-500/[.06] text-ink hover:border-brand-500/70 hover:bg-brand-500/[.12] hover:shadow-glow-sm hover:-translate-y-0.5 active:translate-y-0',
        dark: 'border border-white/10 bg-white/[.03] text-ink hover:border-brand-500/45 hover:bg-brand-500/[.08] hover:-translate-y-0.5 active:translate-y-0',
        ghost: 'text-ink-muted hover:text-brand-500 hover:bg-brand-500/[.08]',
        link: 'text-brand-500 underline-offset-4 hover:underline hover:text-brand-400 rounded-sm',
      },
      size: {
        sm: 'h-9 px-4 text-[13px]',
        md: 'h-11 px-6',
        lg: 'h-[52px] px-8 text-[15px]',
        icon: 'size-11 rounded-full',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
