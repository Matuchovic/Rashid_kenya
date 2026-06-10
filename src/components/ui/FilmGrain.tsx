'use client'
import { useEffect, useRef } from 'react'

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let frame = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      raf = requestAnimationFrame(render)
      frame++

      // Only update grain every 2 frames for performance
      if (frame % 2 !== 0) return

      const w = canvas.width
      const h = canvas.height
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() * 2 - 1) * 18
        data[i]     = 128 + noise
        data[i + 1] = 128 + noise
        data[i + 2] = 128 + noise
        data[i + 3] = Math.random() * 10 + 4  // very low opacity
      }

      ctx.putImageData(imageData, 0, 0)
    }

    render()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* Film grain canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'overlay',
          opacity: 0.55,
        }}
      />

      {/* Vignette overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none',
        zIndex: 9997,
        background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* Cinematic letterbox lines — subtle */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(212,167,95,0.03), transparent)',
        pointerEvents: 'none', zIndex: 9999,
      }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(212,167,95,0.03), transparent)',
        pointerEvents: 'none', zIndex: 9999,
      }} />
    </>
  )
}
