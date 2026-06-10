'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.play().catch(() => {})
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2
      if (contentRef.current)
        contentRef.current.style.transform = `translate(${cx * 6}px, ${cy * 4}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const pc = particlesRef.current
    if (!pc) return
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div')
      const s = Math.random() * 2.5 + 0.8
      Object.assign(p.style, {
        position: 'absolute',
        width: s + 'px', height: s + 'px',
        borderRadius: '50%',
        background: 'rgba(255,200,80,0.7)',
        left: Math.random() * 100 + '%',
        bottom: Math.random() * 35 + 5 + '%',
        animation: `particleDrift ${Math.random() * 9 + 7}s linear ${Math.random() * 10}s infinite`,
        opacity: (Math.random() * 0.45 + 0.15).toString(),
      })
      pc.appendChild(p)
    }
    return () => { if (pc) pc.innerHTML = '' }
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden flex items-end justify-between"
      style={{ height: '100vh', minHeight: 680 }}
    >
      {/* Photo fallback — always visible */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
        }}
      />

      {/* Video — plays on Chrome, overlays photo on Safari when allowed */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, #050505 0%, rgba(5,5,5,0.72) 28%, rgba(5,5,5,0.10) 55%, rgba(15,8,0,0.30) 100%), linear-gradient(90deg, rgba(5,5,5,0.40) 0%, transparent 55%, rgba(5,5,5,0.15) 100%)` }} />

      {/* Sun */}
      <div className="absolute left-1/2 sun-orb pointer-events-none" style={{ top: '10%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, #FFEF99 0%, #FFD040 28%, rgba(255,160,20,0.35) 60%, transparent 100%)', boxShadow: '0 0 60px 30px rgba(255,180,40,0.30), 0 0 180px 80px rgba(255,130,0,0.18)' }} />

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex items-end justify-between w-full gap-10" style={{ padding: '0 72px 88px', transition: 'transform 0.05s linear' }}>
        <div className="max-w-[600px]">
          <div className="eyebrow mb-[18px] reveal visible">Kenya · East Africa · Since 1997</div>
          <h1 className="text-white reveal visible" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(56px, 7vw, 90px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-0.01em' }}>
            A Journey<br />
            <em style={{ color: '#D9A441', fontStyle: 'italic' }}>Beyond</em>
            <span className="block text-white/75" style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.0 }}>The Known</span>
          </h1>
          <p className="mt-[22px] text-sm leading-[1.75] text-muted max-w-[380px] reveal visible">
            We craft intimate luxury safaris across Kenya\'s most extraordinary wilderness —
            from the endless plains of Masai Mara to the ice-capped peaks of Mount Kenya.
            Witness nature\'s greatest theatre, guided by people who know every trail.
          </p>
          <div className="flex gap-3.5 mt-9 reveal visible">
            <Link href="/safaris" className="btn-primary">
              Explore Safaris
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs" style={{ background: 'rgba(0,0,0,0.2)' }}>→</span>
            </Link>
            <button className="btn-ghost">▶ Watch Film</button>
          </div>
        </div>
        <div className="hidden xl:flex flex-col gap-3 flex-shrink-0">
          {[
            { icon: '🌍', label: 'National Parks', value: '58 Destinations' },
            { icon: '⭐', label: 'Guest Rating', value: '4.97 / 5.0' },
            { icon: '🦁', label: 'Wildlife Encounters', value: '10,000+ Guests' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-[18px] flex items-center gap-3.5 px-[22px] py-4" style={{ minWidth: 228 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'rgba(217,164,65,0.14)' }}>{stat.icon}</div>
              <div>
                <p className="text-[10px] text-dim tracking-[0.10em] uppercase mb-[3px]">{stat.label}</p>
                <p className="text-[15px] font-medium text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div style={{ width: 1, height: 44, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
        <span className="text-[9px] text-dim tracking-[0.18em] uppercase">Scroll</span>
      </div>

      <style>{`
        @keyframes particleDrift {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-140px) translateX(40px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
