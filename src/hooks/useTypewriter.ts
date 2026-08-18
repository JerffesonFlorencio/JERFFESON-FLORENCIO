import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type Options = {
  charDelay?: number
  lineDelay?: number
  startDelay?: number
}

/**
 * Digita um conjunto de linhas em sequência, com cursor piscando.
 * Respeita prefers-reduced-motion (mostra tudo imediatamente).
 */
export function useTypewriter(lines: readonly string[], options: Options = {}) {
  const { charDelay = 26, lineDelay = 420, startDelay = 600 } = options

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px' })
  const [typed, setTyped] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setTyped([...lines])
      setDone(true)
      return
    }

    let cancelled = false
    const timers: number[] = []

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms))
      })

    const run = async () => {
      await wait(startDelay)
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return
        setTyped((prev) => [...prev, ''])
        for (let c = 1; c <= lines[i].length; c++) {
          if (cancelled) return
          await wait(charDelay)
          setTyped((prev) => {
            const next = [...prev]
            next[i] = lines[i].slice(0, c)
            return next
          })
        }
        await wait(lineDelay)
      }
      if (!cancelled) setDone(true)
    }

    void run()

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [inView, lines, charDelay, lineDelay, startDelay])

  return { ref, typed, done }
}
