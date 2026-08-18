import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { LanguageSlice } from '@/hooks/useGitHub'

const PALETTE = ['#1B8FA8', '#10697C', '#2AA6C0', '#0B4A57', '#06333D', '#4FBBD1', '#175A69']

type TooltipPayload = {
  active?: boolean
  payload?: { name: string; value: number; payload: { percent: number } }[]
}

function ChartTooltip({ active, payload }: TooltipPayload) {
  if (!active || !payload?.length) return null
  const slice = payload[0]

  return (
    <div className="rounded-xl border border-brand-500/25 bg-[#070C0E]/95 px-3.5 py-2.5 shadow-[0_18px_50px_-25px_rgba(0,0,0,1)] backdrop-blur-sm">
      <p className="text-[13px] font-medium text-ink">{slice.name}</p>
      <p className="mt-0.5 font-mono text-[11.5px] text-brand-400">
        {slice.value} {slice.value === 1 ? 'repositório' : 'repositórios'}
        <span className="ml-1.5 text-ink-muted/70">({slice.payload.percent}%)</span>
      </p>
    </div>
  )
}

export function LanguageChart({ data }: { data: LanguageSlice[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const withPercent = data.map((item) => ({
    ...item,
    percent: Math.round((item.value / total) * 100),
  }))

  return (
    <div className="grid gap-6 sm:grid-cols-[minmax(0,200px)_1fr] sm:items-center">
      <div className="relative mx-auto h-[200px] w-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={withPercent}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={92}
              paddingAngle={3}
              stroke="none"
              startAngle={90}
              endAngle={-270}
              isAnimationActive
              animationDuration={900}
            >
              {withPercent.map((entry, index) => (
                <Cell key={entry.name} fill={PALETTE[index % PALETTE.length]} opacity={0.92} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>

        {/* centro do donut */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <span className="block text-[26px] font-bold leading-none text-gradient-brand">
              {data.length}
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted/70">
              linguagens
            </span>
          </div>
        </div>
      </div>

      {/* legenda */}
      <ul className="space-y-2.5">
        {withPercent.map((entry, index) => (
          <li key={entry.name} className="flex items-center gap-3">
            <span
              className="size-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: PALETTE[index % PALETTE.length] }}
              aria-hidden
            />
            <span className="flex-1 truncate text-[13.5px] text-ink/90">{entry.name}</span>
            <span className="font-mono text-[12px] text-ink-muted/75 tabular-nums">
              {entry.percent}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
