import * as React from 'react'
import { cn } from '@/lib/utils'

const fieldClasses =
  'w-full rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/55 transition-all duration-300 hover:border-brand-500/25 focus:border-brand-500/60 focus:bg-brand-500/[.04] focus:outline-none focus:ring-2 focus:ring-brand-500/25 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-500/60 aria-[invalid=true]:ring-red-500/20'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input ref={ref} type={type} className={cn(fieldClasses, className)} {...props} />
  ),
)
Input.displayName = 'Input'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldClasses, 'min-h-[140px] resize-y', className)} {...props} />
))
Textarea.displayName = 'Textarea'

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('mb-2 block text-xs font-medium uppercase tracking-wider text-ink-muted', className)}
      {...props}
    />
  ),
)
Label.displayName = 'Label'

export { Input, Textarea, Label }
