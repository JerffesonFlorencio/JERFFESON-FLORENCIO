import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'header' | 'footer'
}

/** Entrada suave: opacity 0→1 e translateY 30px→0 quando entra na viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 30,
  as = 'div',
}: RevealProps) {
  const Component = motion[as]
  const reduceMotion = useReducedMotion()

  return (
    <Component
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px 0px -80px 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Component>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  delay?: number
}

/** Container que aplica stagger nos filhos que usarem `fadeUp`. */
export function Stagger({ children, className, delay = 0 }: StaggerProps) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-70px 0px' }}
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  )
}

export const MotionItem = motion.div
