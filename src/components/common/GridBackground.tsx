/**
 * Camada de fundo global: grade tecnológica sutil + brilhos radiais em azul petróleo
 * espalhados ao longo da página. Puramente decorativa.
 */
export function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-base" />
      <div className="tech-grid absolute inset-0 opacity-70" />

      {/* halos ambientes */}
      <div className="glow-soft absolute -top-40 left-1/2 size-[900px] -translate-x-1/2 rounded-full opacity-60" />
      <div className="glow-soft absolute left-[-14rem] top-[38%] size-[620px] rounded-full opacity-30" />
      <div className="glow-soft absolute right-[-16rem] top-[68%] size-[680px] rounded-full opacity-25" />

      {/* vinheta */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_45%,rgba(0,0,0,.55)_100%)]" />
    </div>
  )
}
