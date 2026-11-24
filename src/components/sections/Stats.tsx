import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/components/common/Reveal'
import { useCountUp } from '@/hooks/useCountUp'
import { stats, type Stat } from '@/data/site'

function StatValue({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value ?? 0)

  if (stat.value === null) {
    return (
      <span className="block text-[2rem] font-bold leading-none text-gradient-brand sm:text-[2.4rem]">
        {stat.display}
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className="block text-[2rem] font-bold leading-none text-gradient-brand tabular-nums sm:text-[2.4rem]"
    >
      {stat.prefix}
      {value}
      {stat.suffix}
    </span>
  )
}

export function Stats() {
  return (
    <motion.dl
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px 0px' }}
      className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          className="card-surface card-lift group relative p-6 sm:p-7"
        >
          <span
            aria-hidden
            className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <dd>
            <StatValue stat={stat} />
          </dd>

          <dt className="mt-4 text-sm font-medium text-ink">{stat.label}</dt>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{stat.description}</p>
        </motion.div>
      ))}
    </motion.dl>
  )
}
