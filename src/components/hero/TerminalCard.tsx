import { motion } from 'framer-motion'
import { terminalLines } from '@/data/site'
import { useTypewriter } from '@/hooks/useTypewriter'
import { cn } from '@/lib/utils'

const toneClass = {
  muted: 'text-ink-muted',
  brand: 'text-brand-400',
  success: 'text-emerald-400',
} as const

const rawLines = terminalLines.map((line) => line.text)

export function TerminalCard({ className }: { className?: string }) {
  const { ref, typed, done } = useTypewriter(rawLines, {
    charDelay: 24,
    lineDelay: 380,
    startDelay: 900,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn('relative w-full', className)}
    >
      {/* glow atrás do card */}
      <div className="absolute -inset-6 -z-10 rounded-[28px] bg-brand-500/[.13] blur-3xl" />

      <div className="noise-overlay relative overflow-hidden rounded-2xl border border-brand-500/22 bg-[#070C0E]/92 shadow-[0_30px_90px_-40px_rgba(27,143,168,.55),0_0_0_1px_rgba(27,143,168,.06)] backdrop-blur-xl">
        {/* barra de título */}
        <div className="flex items-center gap-3 border-b border-white/[.06] bg-white/[.02] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-[#FF5F57]/85" />
            <span className="size-3 rounded-full bg-[#FEBC2E]/85" />
            <span className="size-3 rounded-full bg-[#28C840]/85" />
          </div>
          <span className="ml-1 font-mono text-[12px] text-ink-muted">automation.py</span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-500/80">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-brand-500" />
            running
          </span>
        </div>

        {/* corpo */}
        <div className="relative min-h-[188px] p-5 font-mono text-[12.5px] leading-[1.85] sm:min-h-[200px] sm:text-[13.5px]">
          {/* linha de varredura sutil */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan-line bg-gradient-to-r from-transparent via-brand-500/25 to-transparent"
          />

          <ul className="space-y-0.5">
            {typed.map((line, index) => {
              const tone = terminalLines[index]?.tone ?? 'muted'
              const isLast = index === typed.length - 1
              return (
                <li key={index} className={cn('break-words', toneClass[tone])}>
                  {line}
                  {isLast && !done && (
                    <span className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] animate-blink bg-brand-500" />
                  )}
                </li>
              )
            })}
          </ul>

          {done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-2 flex items-center gap-2 text-brand-500"
            >
              <span>$</span>
              <span className="inline-block h-[1.05em] w-[7px] animate-blink bg-brand-500" />
            </motion.div>
          )}
        </div>

        {/* rodapé de status */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-white/[.06] bg-white/[.015] px-5 py-2.5 font-mono text-[10.5px] uppercase tracking-wider text-ink-muted/70">
          <span>python 3.12</span>
          <span className="text-brand-500/70">n8n</span>
          <span>postgres</span>
          <span className="ml-auto text-emerald-400/80">exit 0</span>
        </div>
      </div>
    </motion.div>
  )
}
