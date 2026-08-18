import { useEffect, useState } from 'react'

export type PerformanceTier = 'high' | 'low' | 'off'

/**
 * Decide o quanto de efeito 3D o dispositivo aguenta.
 * - 'off'  → prefers-reduced-motion, sem WebGL ou hardware muito limitado
 * - 'low'  → telas pequenas / poucos núcleos: menos partículas, sem linhas
 * - 'high' → desktop
 */
export function useDevicePerformance(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('off')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setTier('off')
      return
    }

    // WebGL disponível?
    let hasWebGL = false
    try {
      const canvas = document.createElement('canvas')
      hasWebGL = Boolean(
        canvas.getContext('webgl2') ??
          canvas.getContext('webgl') ??
          canvas.getContext('experimental-webgl'),
      )
    } catch {
      hasWebGL = false
    }

    if (!hasWebGL) {
      setTier('off')
      return
    }

    const cores = navigator.hardwareConcurrency ?? 4
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches

    if (cores <= 2 || memory <= 2) {
      setTier('off')
      return
    }

    setTier(isSmallScreen || coarsePointer || cores <= 4 ? 'low' : 'high')
  }, [])

  return tier
}
