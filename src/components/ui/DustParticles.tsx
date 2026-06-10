'use client'

import { useEffect, useRef } from 'react'

export function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement
    if (!parent) return

    let W = parent.offsetWidth || window.innerWidth
    let H = parent.offsetHeight || window.innerHeight
    let raf: number

    canvas.width = W
    canvas.height = H

    const onResize = () => {
      W = parent.offsetWidth || window.innerWidth
      H = parent.offsetHeight || window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    interface Dust {
      x: number; y: number
      vx: number; vy: number
      r: number
      alpha: number; alphaMax: number; alphaDir: number; alphaSpeed: number
      depth: number
      wobble: number; wobbleAmp: number; wobbleSpeed: number
      color: [number,number,number]
    }

    const COUNT = Math.max(30, Math.floor(W / 18))

    const PALETTE: [number,number,number][] = [
      [210,160,85], [195,148,72], [230,195,130], [215,175,100],
    ]

    const make = (randomY = true): Dust => {
      const depth = Math.pow(Math.random(), 1.4)
      const r = 0.5 + depth * 1.4 + Math.random() * 0.8
      const alphaMax = 0.06 + depth * 0.12 + Math.random() * 0.06
      return {
        x: Math.random() * W,
        y: randomY ? Math.random() * H : H + r * 3,
        vx: (Math.random() - 0.48) * 0.15 * (0.3 + depth * 0.7),
        vy: -0.02 - Math.random() * 0.08 * depth,
        r, alpha: 0, alphaMax, alphaDir: 1,
        alphaSpeed: 0.0004 + Math.random() * 0.0005,
        depth,
        wobble: Math.random() * Math.PI * 2,
        wobbleAmp: 0.2 + Math.random() * 0.5,
        wobbleSpeed: 0.0005 + Math.random() * 0.0007,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }
    }

    const particles: Dust[] = Array.from({ length: COUNT }, () => {
      const p = make(true)
      p.alpha = Math.random() * p.alphaMax
      return p
    })

    const tick = () => {
      raf = requestAnimationFrame(tick)
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.alpha += p.alphaSpeed * p.alphaDir
        if (p.alpha >= p.alphaMax) { p.alpha = p.alphaMax; p.alphaDir = -1 }
        if (p.alpha <= 0) { particles[i] = make(false); continue }

        p.wobble += p.wobbleSpeed
        p.x += p.vx + Math.sin(p.wobble) * p.wobbleAmp * 0.09
        p.y += p.vy + Math.cos(p.wobble * 0.7) * p.wobbleAmp * 0.04

        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -10) { particles[i] = make(false); continue }

        const [r,g,b] = p.color
        const blurR = p.r * (2.8 - p.depth * 1.5)

        ctx.beginPath()
        ctx.arc(p.x, p.y, blurR * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha * 0.2})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, blurR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha * 0.55})`
        ctx.fill()

        if (p.depth > 0.6) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha * 0.85})`
          ctx.fill()
        }
      }
    }

    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  )
}
