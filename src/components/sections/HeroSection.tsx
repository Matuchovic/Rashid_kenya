'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2
      if (contentRef.current)
        contentRef.current.style.transform = `translate(${cx * 8}px, ${cy * 5}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const pc = particlesRef.current
    if (!pc) return
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div')
      const s = Math.random() * 3 + 0.8
      Object.assign(p.style, {
        position: 'absolute',
        width: s + 'px', height: s + 'px',
        borderRadius: '50%',
        background: 'rgba(255,200,80,0.8)',
        left: Math.random() * 100 + '%',
        bottom: Math.random() * 50 + 5 + '%',
        animation: `particleDrift ${Math.random() * 10 + 8}s linear ${Math.random() * 12}s infinite`,
        opacity: (Math.random() * 0.5 + 0.2).toString(),
      })
      pc.appendChild(p)
    }
    return () => { if (pc) pc.innerHTML = '' }
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden flex items-end justify-between"
      style={{ height: '100svh', minHeight: 600 }}
    >
      {/* Hero photo with Ken Burns */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          animation: 'kenBurns 24s ease-in-out infinite alternate',
        }}
      />

      {/* Cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 52% 18%, rgba(255,170,30,0.45) 0%, rgba(220,100,10,0.25) 35%, transparent 65%),
            linear-gradient(0deg, #050505 0%, rgba(5,5,5,0.72) 28%, rgba(5,5,5,0.08) 55%, rgba(15,8,0,0.28) 100%),
            linear-gradient(90deg, rgba(5,5,5,0.40) 0%, transparent 55%, rgba(5,5,5,0.15) 100%)
          `,
        }}
      />

      {/* Sun orb */}
      <div
        className="absolute left-1/2 sun-orb pointer-events-none"
        style={{
          top: '10%',
          width: 100, height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFEF99 0%, #FFD040 28%, rgba(255,160,20,0.35) 60%, transparent 100%)',
          boxShadow: '0 0 60px 30px rgba(255,180,40,0.30), 0 0 180px 80px rgba(255,130,0,0.18), 0 0 400px 150px rgba(200,80,0,0.10)',
        }}
      />

      {/* Light rays */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '100%', height: '65%', opacity: 0.20 }}
        viewBox="0 0 1400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB828" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF7000" stopOpacity="0" />
          </linearGradient>
        </defs>
        {([
          [0, 50, 0.25], [200, 70, 0.20], [420, 90, 0.18],
          [660, 100, 0.16], [860, 80, 0.18], [1100, 60, 0.22], [1400, 40, 0.28],
        ] as number[][]).map(([x, w, op], i) => (
          <line key={i} x1="700" y1="0" x2={x} y2="500"
            stroke="url(#rg1)" strokeWidth={w} opacity={op} />
        ))}
      </svg>

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex items-end justify-between w-full gap-10 hero-content"
        style={{ transition: 'transform 0.05s linear', willChange: 'transform' }}
      >
        <div className="hero-text">
          <div className="eyebrow mb-[18px] reveal visible">Kenya · East Africa · Since 1997</div>
          <h1
            className="text-white reveal visible"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(44px, 7vw, 90px)',
              fontWeight: 300,
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
            }}
          >
            A Journey<br />
            <em style={{ color: '#D9A441', fontStyle: 'italic' }}>Beyond</em>
            <span className="block text-white/75" style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.0 }}>
              The Known
            </span>
          </h1>
          <p className="mt-[22px] text-sm leading-[1.75] text-muted hero-desc reveal visible">
            We craft intimate luxury safaris across Kenya's most extraordinary wilderness —
            from the endless plains of Masai Mara to the ice-capped peaks of Mount Kenya.
          </p>
          <div className="flex gap-3 mt-8 flex-wrap reveal visible">
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

      {/* Mobile stat pills */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-3 px-5 xl:hidden z-10">
        {[
          { icon: '⭐', value: '4.97★' },
          { icon: '🦁', value: '10K+ Guests' },
          { icon: '🌍', value: '58 Parks' },
        ].map(s => (
          <div key={s.value} className="glass rounded-full px-4 py-2 flex items-center gap-2">
            <span className="text-sm">{s.icon}</span>
            <span className="text-xs text-white/70 font-medium">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div style={{ width: 1, height: 44, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
        <span className="text-[9px] text-dim tracking-[0.18em] uppercase">Scroll</span>
      </div>

      <style>{`
        .hero-content {
          padding: 0 24px 100px;
        }
        .hero-text {
          max-width: 600px;
          width: 100%;
        }
        .hero-desc {
          max-width: 380px;
        }
        @media (min-width: 768px) {
          .hero-content {
            padding: 0 48px 88px;
          }
        }
        @media (min-width: 1280px) {
          .hero-content {
            padding: 0 72px 88px;
          }
        }
        @keyframes kenBurns {
          0%   { transform: scale(1.0) translateX(0px) translateY(0px); }
          100% { transform: scale(1.08) translateX(-20px) translateY(-10px); }
        }
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
