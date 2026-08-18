import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useDevicePerformance } from '@/hooks/useDevicePerformance'

const BRAND_COLORS = ['#1B8FA8', '#10697C', '#0B4A57'] as const

type Config = {
  count: number
  linkDistance: number
  drawLines: boolean
  dprCap: number
}

const PRESETS: Record<'high' | 'low', Config> = {
  high: { count: 120, linkDistance: 2.6, drawLines: true, dprCap: 2 },
  low: { count: 45, linkDistance: 2.2, drawLines: false, dprCap: 1.5 },
}

/**
 * Detalhe visual do Hero: pontos luminosos em tons de azul petróleo, com linhas
 * conectando vizinhos próximos e reação discreta ao mouse.
 *
 * Performance: contagem e DPR adaptados ao dispositivo, animação pausada
 * quando a aba está oculta ou o Hero sai da tela, e desativado por completo
 * em `prefers-reduced-motion` ou hardware limitado.
 */
export function ParticleField({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tier = useDevicePerformance()

  useEffect(() => {
    const container = containerRef.current
    if (!container || tier === 'off') return

    const config = PRESETS[tier]

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      62,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    )
    camera.position.z = 9

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: tier === 'high' })
    } catch {
      return
    }

    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.dprCap))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    /* ---------------------------- partículas ---------------------------- */
    const { count } = config
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const color = new THREE.Color()

    const SPREAD_X = 15
    const SPREAD_Y = 9
    const SPREAD_Z = 6

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD_X
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z

      // movimento extremamente lento
      velocities[i * 3] = (Math.random() - 0.5) * 0.0032
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0028
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0018

      color.set(BRAND_COLORS[i % BRAND_COLORS.length])
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // textura circular suave gerada em canvas (evita pontos quadrados)
    const sprite = createGlowTexture()

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.13,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    scene.add(points)

    /* ------------------------------ linhas ------------------------------ */
    const maxLineVertices = config.drawLines ? count * 8 : 0
    const linePositions = new Float32Array(maxLineVertices * 3)
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#1B8FA8'),
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    if (config.drawLines) scene.add(lines)

    /* ------------------------------- mouse ------------------------------ */
    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    if (tier === 'high') {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }

    /* ------------------------------ resize ------------------------------ */
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    /* ------------------------------ loop -------------------------------- */
    let frameId = 0
    let running = true
    let visible = true

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 },
    )
    visibilityObserver.observe(container)

    const onVisibilityChange = () => {
      running = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const posAttr = pointsGeometry.getAttribute('position') as THREE.BufferAttribute
    const linkDistanceSq = config.linkDistance * config.linkDistance

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (!running || !visible) return

      const arr = posAttr.array as Float32Array

      for (let i = 0; i < count; i++) {
        const ix = i * 3
        arr[ix] += velocities[ix]
        arr[ix + 1] += velocities[ix + 1]
        arr[ix + 2] += velocities[ix + 2]

        // wrap-around nas bordas
        if (arr[ix] > SPREAD_X / 2) arr[ix] = -SPREAD_X / 2
        else if (arr[ix] < -SPREAD_X / 2) arr[ix] = SPREAD_X / 2
        if (arr[ix + 1] > SPREAD_Y / 2) arr[ix + 1] = -SPREAD_Y / 2
        else if (arr[ix + 1] < -SPREAD_Y / 2) arr[ix + 1] = SPREAD_Y / 2
        if (arr[ix + 2] > SPREAD_Z / 2) arr[ix + 2] = -SPREAD_Z / 2
        else if (arr[ix + 2] < -SPREAD_Z / 2) arr[ix + 2] = SPREAD_Z / 2
      }
      posAttr.needsUpdate = true

      if (config.drawLines) {
        let vertex = 0
        for (let i = 0; i < count && vertex < maxLineVertices - 2; i++) {
          const ax = arr[i * 3]
          const ay = arr[i * 3 + 1]
          const az = arr[i * 3 + 2]

          for (let j = i + 1; j < count && vertex < maxLineVertices - 2; j++) {
            const dx = ax - arr[j * 3]
            const dy = ay - arr[j * 3 + 1]
            const dz = az - arr[j * 3 + 2]
            const distSq = dx * dx + dy * dy + dz * dz

            if (distSq < linkDistanceSq) {
              linePositions[vertex * 3] = ax
              linePositions[vertex * 3 + 1] = ay
              linePositions[vertex * 3 + 2] = az
              vertex++
              linePositions[vertex * 3] = arr[j * 3]
              linePositions[vertex * 3 + 1] = arr[j * 3 + 1]
              linePositions[vertex * 3 + 2] = arr[j * 3 + 2]
              vertex++
            }
          }
        }
        lineGeometry.setDrawRange(0, vertex)
        lineGeometry.attributes.position.needsUpdate = true
      }

      // parallax discreto seguindo o mouse
      pointer.x += (target.x - pointer.x) * 0.025
      pointer.y += (target.y - pointer.y) * 0.025
      points.rotation.y = pointer.x * 0.12
      points.rotation.x = -pointer.y * 0.08
      lines.rotation.copy(points.rotation)

      renderer.render(scene, camera)
    }

    animate()

    /* ----------------------------- cleanup ------------------------------ */
    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pointermove', onPointerMove)

      pointsGeometry.dispose()
      lineGeometry.dispose()
      pointsMaterial.dispose()
      lineMaterial.dispose()
      sprite.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [tier])

  if (tier === 'off') return null

  return <div ref={containerRef} aria-hidden className={className} />
}

/** Textura radial usada como sprite dos pontos. */
function createGlowTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size

  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.35, 'rgba(255,255,255,.55)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
