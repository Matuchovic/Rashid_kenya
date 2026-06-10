'use client'

import { useEffect, useRef } from 'react'

export function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    let scrollY = 0
    let raf: number

    canvas.width = W
    canvas.height = H

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Particle factory — African dust feel
    const COLORS = [
      [212, 167, 95],   // warm gold
      [242, 230, 208],  // pale cream
      [255, 220, 160],  // warm amber
      [200, 150, 80],   // deep gold
      [230, 200, 140],  // mid gold
    ]

    interface Particle {
      x: number
      y: number
      baseY: number
      vx: number
      vy: number
      size: number
      opacity: number
      opacityTarget: number
      opacitySpeed: number
      blur: number
      depth: number       // 0=far, 1=close
      color: number[]
      wobbleX: number
      wobbleY: number
      wobbleSpeedX: number
      wobbleSpeedY: number
      wobbleAmpX: number
      wobbleAmpY: number
      life: number
      maxLife: number
      phase: number
    }

    const COUNT = Math.min(120, Math.floor(W * H / 8000))
    const particles: Particle[] = []

    const createParticle = (x?: number, y?: number): Particle => {
      const depth = Math.random()
      const size = depth * 3.5 + 0.8 + Math.random() * 2.0
      const baseOpacity = depth * 0.35 + 0.08 + Math.random() * 0.15
      const col = COLORS[Math.floor(Math.random() * COLORS.length)]
      const life = Math.random() * 600 + 400

      return {
        x: x ?? Math.random() * W,
        y: y ?? Math.random() * H,
        baseY: y ?? Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18 * (depth * 0.8 + 0.2),
        vy: (Math.random() - 0.5) * 0.08 - 0.04 * depth,
        size,
        opacity: 0,
        opacityTarget: baseOpacity,
        opacitySpeed: 0.0008 + Math.random() * 0.001,
        blur: (1 - depth) * 2.5 + 0.2,
        depth,
        color: col,
        wobbleX: 0,
        wobbleY: 0,
        wobbleSpeedX: 0.0003 + Math.random() * 0.0005,
        wobbleSpeedY: 0.0002 + Math.random() * 0.0004,
        wobbleAmpX: 0.4 + Math.random() * 0.8,
        wobbleAmpY: 0.2 + Math.random() * 0.4,
        life: 0,
        maxLife: life,
        phase: Math.random() * Math.PI * 2,
      }
    }

    for (let i = 0; i < COUNT; i++) {
      const p = createParticle()
      p.life = Math.random() * p.maxLife  // stagger start
      p.opacity = p.opacityTarget * (p.life / p.maxLife)
      particles.push(p)
    }

    let frame = 0
    const draw = () => {
      raf = requestAnimationFrame(draw)
      frame++

      ctx.clearRect(0, 0, W, H)

      // Sort by depth (far first)
      particles.sort((a, b) => a.depth - b.depth)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life++

        // Fade in
        if (p.life < 80) {
          p.opacity = Math.min(p.opacityTarget, p.opacity + p.opacitySpeed * 2)
        }
        // Fade out near end
        else if (p.life > p.maxLife - 120) {
          p.opacity = Math.max(0, p.opacity - p.opacitySpeed * 1.5)
        }
        // Gentle opacity breathing
        else {
          const breath = Math.sin(p.phase + frame * 0.003) * 0.015
          p.opacity = Math.max(0, Math.min(p.opacityTarget + breath, 0.5))
        }

        // Wobble motion — organic, non-repeating feel
        p.wobbleX += p.wobbleSpeedX
        p.wobbleY += p.wobbleSpeedY
        const wx = Math.sin(p.wobbleX + p.phase) * p.wobbleAmpX
        const wy = Math.cos(p.wobbleY + p.phase * 0.7) * p.wobbleAmpY

        // Apply movement
        p.x += p.vx + wx * 0.012
        p.y += p.vy + wy * 0.008

        // Scroll parallax — closer particles move less with scroll
        const scrollOffset = (scrollY - 0) * (0.02 + p.depth * 0.04)
        const renderY = p.y - scrollOffset

        // Respawn if off screen or life ended
        if (p.life >= p.maxLife || p.x < -20 || p.x > W + 20 || renderY < -20 || renderY > H + 20) {
          const np = createParticle(
            Math.random() < 0.3 ? (Math.random() < 0.5 ? -5 : W + 5) : Math.random() * W,
            Math.random() * H
          )
          particles[i] = np
          continue
        }

        if (p.opacity <= 0.001) continue

        // Draw particle with soft radial gradient
        const [r, g, b] = p.color
        const gradient = ctx.createRadialGradient(
          p.x, renderY, 0,
          p.x, renderY, p.size * (p.blur + 1)
        )
        gradient.addColorStop(0, `rgba(${r},${g},${b},${p.opacity})`)
        gradient.addColorStop(0.4, `rgba(${r},${g},${b},${p.opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)

        ctx.beginPath()
        ctx.arc(p.x, renderY, p.size * (p.blur + 1), 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Extra tiny bright core for close particles
        if (p.depth > 0.65 && p.opacity > 0.04) {
          ctx.beginPath()
          ctx.arc(p.x, renderY, p.size * 0.3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity * 0.6})`
          ctx.fill()
        }
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        
      }}
    />
  )
}
