'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const animate = () => {
      pos.current.rx += (pos.current.mx - pos.current.rx) * 0.12
      pos.current.ry += (pos.current.my - pos.current.ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = pos.current.rx + 'px'
        ringRef.current.style.top  = pos.current.ry + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ transition: 'width 0.2s, height 0.2s' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed w-9 h-9 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{
          border: '1.5px solid rgba(217,164,65,0.7)',
          transition: 'width 0.35s cubic-bezier(0.25,1,0.5,1), height 0.35s cubic-bezier(0.25,1,0.5,1)',
        }}
      />
    </>
  )
}
