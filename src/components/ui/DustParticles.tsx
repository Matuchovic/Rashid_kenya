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
    let lastScroll = 0

    canvas.width = W
    canvas.height = H

    window.addEventListener('resize', () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    })
    window.addEventListener('scroll', () => {
      lastScroll = scrollY
      scrollY = window.scrollY
    }, { passive: true })

    // African savanna dust — very fine, warm, barely visible
    interface Dust {
      x: number
      y: number
      vx: number
      vy: number
      r: number          // radius — tiny
      alpha: number      // current opacity
      alphaMax: number   // max opacity — very low
      alphaDir: number   // breathing direction
      alphaSpeed: number
      depth: number      // 0=far background, 1=foreground
      wobble: number     // wobble phase
      wobbleAmp: number
      wobbleSpeed: number
      color: [number,number,number]
    }

    // Very few, very small particles
    const COUNT = Math.floor(W / 22)  // ~60 on desktop, ~18 on mobile

    const PALETTE: [number,number,number][] = [
      [210, 160, 85],   // warm dust gold
      [195, 148, 72],   // deeper amber dust
      [230, 195, 130],  // light haze
      [215, 175, 100],  // mid dust
    ]

    const make = (randomY = true): Dust => {
      const depth = Math.pow(Math.random(), 1.5)  // bias toward background
      const r = 0.4 + depth * 1.2 + Math.random() * 0.6  // 0.4–2.2px
      // Very low opacity — this IS the key difference from snow/stars
      const alphaMax = 0.04 + depth * 0.08 + Math.random() * 0.05

      return {
        x: Math.random() * W,
        y: randomY ? Math.random() * H : H + r,
        vx: (Math.random() - 0.48) * 0.12 * (0.3 + depth * 0.7),
        vy: -0.03 - Math.random() * 0.06 * depth,  // very slow upward drift
        r,
        alpha: 0,
        alphaMax,
        alphaDir: 1,
        alphaSpeed: 0.0003 + Math.random() * 0.0004,
        depth,
        wobble: Math.random() * Math.PI * 2,
        wobbleAmp: 0.15 + Math.random() * 0.35,
        wobbleSpeed: 0.0004 + Math.random() * 0.0006,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }
    }

    const particles: Dust[] = Array.from({ length: COUNT }, () => {
      const p = make(true)
      p.alpha = Math.random() * p.alphaMax  // staggered start
      return p
    })

    let frame = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      frame++

      ctx.clearRect(0, 0, W, H)

      const scrollDelta = (scrollY - lastScroll) * 0.000015

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Breathing opacity — the organic key
        p.alpha += p.alphaSpeed * p.alphaDir
        if (p.alpha >= p.alphaMax) { p.alpha = p.alphaMax; p.alphaDir = -1 }
        if (p.alpha <= 0) {
          // Respawn from bottom or side
          const np = make(false)
          np.x = Math.random() < 0.15
            ? (Math.random() < 0.5 ? -2 : W + 2)
            : Math.random() * W
          particles[i] = np
          continue
        }

        // Natural wobble drift — no straight lines
        p.wobble += p.wobbleSpeed
        const wx = Math.sin(p.wobble) * p.wobbleAmp
        const wy = Math.cos(p.wobble * 0.7 + 1.2) * p.wobbleAmp * 0.4

        p.x += p.vx + wx * 0.08
        p.y += p.vy + wy * 0.05

        // Scroll pushes particles slightly
        p.y -= scrollDelta * (0.5 + p.depth * 2)

        // Soft blur via shadow — GPU friendly
        const blurR = p.r * (2.5 - p.depth * 1.2)  // far = blurrier
        const [r,g,b] = p.color

        // Outer soft halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, blurR * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha * 0.25})`
        ctx.fill()

        // Inner halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, blurR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha * 0.6})`
        ctx.fill()

        // Tiny bright core — only for closest particles
        if (p.depth > 0.7 && p.alpha > 0.05) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 0.35, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha * 0.9})`
          ctx.fill()
        }

        // Wrap horizontally
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
      }

      lastScroll = scrollY
    }

    tick()

    return () => {
      cancelAnimationFrame(raf)
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
        zIndex: 2,
      }}
    />
  )
}
