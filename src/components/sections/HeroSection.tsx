'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export function HeroSection() {
  const heroRef   = useRef<HTMLDivElement>(null)
  const bgRef     = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  // Parallax on mouse move
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth  - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2
      if (contentRef.current)
        contentRef.current.style.transform = `translate(${cx * 8}px, ${cy * 5}px)`
      if (bgRef.current)
        bgRef.current.style.transform = `translate(${cx * -12}px, ${cy * -8}px) scale(1.04)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Generate dust particles
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
      ref={heroRef}
      className="relative w-full overflow-hidden flex items-end justify-between"
      style={{ height: '100vh', minHeight: 680 }}
    >
      {/* Background photo layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-transform duration-[50ms] ease-linear"
        style={{ willChange: 'transform' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=2000&q=85&auto=format&fit=crop')",
            opacity: 0.82,
          }}
        />
        {/* Cinematic colour grade overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 52% 18%, rgba(255,170,30,0.50) 0%, rgba(220,100,10,0.28) 35%, transparent 65%),
              linear-gradient(0deg, #050505 0%, rgba(5,5,5,0.70) 28%, rgba(5,5,5,0.12) 55%, rgba(15,8,0,0.35) 100%),
              linear-gradient(90deg, rgba(5,5,5,0.38) 0%, transparent 50%, rgba(5,5,5,0.18) 100%)
            `,
          }}
        />
      </div>

      {/* Sun */}
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
        style={{ width: '100%', height: '65%', opacity: 0.22 }}
        viewBox="0 0 1400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#FFB828" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF7000" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          [0, 50, 0.25], [200, 70, 0.20], [420, 90, 0.18],
          [660, 100, 0.16], [860, 80, 0.18], [1100, 60, 0.22], [1400, 40, 0.28],
        ].map(([x, w, op], i) => (
          <line key={i} x1="700" y1="0" x2={x} y2="500"
            stroke="url(#rg1)" strokeWidth={w} opacity={op} />
        ))}
      </svg>

      {/* Savanna terrain SVG */}
      <svg
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '60%', width: '100%' }}
        viewBox="0 0 1400 600"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1f0e00" stopOpacity="0.0"/>
            <stop offset="40%"  stopColor="#1f0e00" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#050505" stopOpacity="1.0"/>
          </linearGradient>
        </defs>
        {/* Ground */}
        <path d="M0,280 Q180,250 360,275 Q540,300 700,270 Q860,240 1050,268 Q1220,295 1400,265 L1400,600 L0,600Z" fill="url(#tg)"/>
        <path d="M0,350 Q200,325 400,345 Q600,365 800,340 Q1000,315 1200,345 Q1300,360 1400,340 L1400,600 L0,600Z" fill="#050505" opacity="0.6"/>
        {/* Grass tufts */}
        <g fill="#0d0600" opacity="0.9">
          <path d="M40,360 Q43,332 46,360 Q49,332 54,360Z"/>
          <path d="M100,355 Q104,324 108,355 Q112,324 118,355Z"/>
          <path d="M600,348 Q604,316 608,348 Q612,316 618,348Z"/>
          <path d="M660,352 Q664,320 668,352Z"/>
          <path d="M1200,350 Q1204,318 1208,350 Q1212,318 1218,350Z"/>
          <path d="M1280,355 Q1284,323 1288,355Z"/>
        </g>
        {/* Left acacia */}
        <g fill="#090400" opacity="0.92">
          <rect x="95" y="155" width="11" height="115" rx="3"/>
          <path d="M100,200 Q80,190 65,195" stroke="#090400" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <ellipse cx="100" cy="140" rx="68" ry="28"/>
          <ellipse cx="68"  cy="150" rx="48" ry="22"/>
          <ellipse cx="134" cy="145" rx="52" ry="24"/>
          <ellipse cx="100" cy="132" rx="42" ry="18"/>
        </g>
        {/* Right acacia large */}
        <g fill="#060300" opacity="0.95">
          <rect x="1240" y="100" width="14" height="160" rx="4"/>
          <path d="M1247,155 Q1220,142 1200,150" stroke="#060300" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <ellipse cx="1247" cy="82"  rx="88" ry="34"/>
          <ellipse cx="1200" cy="95"  rx="58" ry="26"/>
          <ellipse cx="1296" cy="88"  rx="65" ry="30"/>
        </g>
        {/* Elephant */}
        <g fill="#0d0600" opacity="0.88" transform="translate(310,215)">
          <ellipse cx="70" cy="65" rx="68" ry="50"/>
          <ellipse cx="15" cy="45" rx="34" ry="28"/>
          <path d="M-6,60 Q-22,75 -18,100 Q-14,90 -10,100 Q-6,88 -2,70 Q0,60 2,58Z"/>
          <path d="M0,55 Q-15,62 -20,72" stroke="#1a1208" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <ellipse cx="-5" cy="38" rx="22" ry="30" fill="#0a0400"/>
          <rect x="28" y="108" width="16" height="42" rx="6"/>
          <rect x="52" y="108" width="16" height="44" rx="6"/>
          <rect x="76" y="108" width="16" height="42" rx="6"/>
          <rect x="98" y="108" width="16" height="40" rx="6"/>
        </g>
        {/* Giraffe */}
        <g fill="#0a0500" opacity="0.80" transform="translate(850,148)">
          <path d="M28,0 L20,80 L36,80 L32,0Z"/>
          <ellipse cx="30" cy="0" rx="12" ry="9"/>
          <rect x="24" y="-12" width="3" height="12" rx="1"/>
          <rect x="33" y="-10" width="3" height="10" rx="1"/>
          <path d="M14,78 L6,152 L54,152 L46,78Z"/>
          <rect x="8"  y="148" width="9" height="52" rx="4"/>
          <rect x="22" y="148" width="9" height="54" rx="4"/>
          <rect x="34" y="148" width="9" height="52" rx="4"/>
          <rect x="48" y="148" width="9" height="50" rx="4"/>
        </g>
        {/* Maasai figures */}
        <g fill="#140800" opacity="0.82" transform="translate(730,258)">
          <ellipse cx="15" cy="8" rx="7" ry="7"/>
          <rect x="10" y="14" width="10" height="40" rx="2"/>
          <path d="M10,20 L0,38" stroke="#140800" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <line x1="12" y1="54" x2="10" y2="78" stroke="#140800" strokeWidth="4" strokeLinecap="round"/>
          <line x1="18" y1="54" x2="20" y2="78" stroke="#140800" strokeWidth="4" strokeLinecap="round"/>
          <line x1="30" y1="2" x2="30" y2="75" stroke="#0f0600" strokeWidth="2.5" strokeLinecap="round"/>
          <ellipse cx="55" cy="8" rx="7" ry="7"/>
          <rect x="50" y="14" width="10" height="38" rx="2"/>
          <path d="M50,22 L40,36" stroke="#140800" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <line x1="52" y1="52" x2="50" y2="76" stroke="#140800" strokeWidth="4" strokeLinecap="round"/>
          <line x1="58" y1="52" x2="60" y2="76" stroke="#140800" strokeWidth="4" strokeLinecap="round"/>
          <line x1="72" y1="2" x2="72" y2="72" stroke="#0f0600" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        {/* Birds */}
        <g stroke="#0a0500" strokeWidth="1.5" fill="none" opacity="0.45">
          <path d="M380,80 Q385,75 390,80"/>
          <path d="M400,70 Q406,65 412,70"/>
          <path d="M820,65 Q826,60 832,65"/>
          <path d="M850,75 Q855,70 860,75"/>
        </g>
      </svg>

      {/* Dust particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Hero content */}
      <div
        ref={contentRef}
        className="relative z-10 flex items-end justify-between w-full gap-10"
        style={{ padding: '0 72px 88px', transition: 'transform 0.05s linear', willChange: 'transform' }}
      >
        {/* Left: headline */}
        <div className="max-w-[600px]">
          <div className="eyebrow mb-[18px] reveal visible">Kenya · East Africa · Since 1997</div>
          <h1
            className="text-white reveal visible"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(56px, 7vw, 90px)',
              fontWeight: 300,
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
            }}
          >
            A Journey<br />
            <em style={{ color: '#D9A441', fontStyle: 'italic' }}>Beyond</em>
            <span
              className="block text-white/75"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.0 }}
            >
              The Known
            </span>
          </h1>
          <p className="mt-[22px] text-sm leading-[1.75] text-muted max-w-[380px] reveal visible">
            We craft intimate luxury safaris across Kenya's most extraordinary wilderness —
            from the endless plains of Masai Mara to the ice-capped peaks of Mount Kenya.
            Witness nature\'s greatest theatre, guided by people who know every trail.
          </p>
          <div className="flex gap-3.5 mt-9 reveal visible">
            <Link href="/safaris" className="btn-primary">
              Explore Safaris
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs"
                style={{ background: 'rgba(0,0,0,0.2)' }}
              >→</span>
            </Link>
            <button className="btn-ghost">▶ Watch Film</button>
          </div>
        </div>

        {/* Right: stat glass cards */}
        <div className="hidden xl:flex flex-col gap-3 flex-shrink-0">
          {[
            { icon: '🌍', label: 'National Parks',      value: '58 Destinations' },
            { icon: '⭐', label: 'Guest Rating',        value: '4.97 / 5.0' },
            { icon: '🦁', label: 'Wildlife Encounters', value: '10,000+ Guests' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-[18px] flex items-center gap-3.5 px-[22px] py-4" style={{ minWidth: 228 }}>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: 'rgba(217,164,65,0.14)' }}
              >
                {stat.icon}
              </div>
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
        <div
          className="scroll-bar"
          style={{ width: 1, height: 44, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.4), transparent)' }}
        />
        <span className="text-[9px] text-dim tracking-[0.18em] uppercase">Scroll</span>
      </div>

      {/* Particle drift keyframes injected once */}
      <style>{`
        @keyframes particleDrift {
          0%   { transform:translateY(0) translateX(0); opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:0.4; }
          100% { transform:translateY(-140px) translateX(40px); opacity:0; }
        }
      `}</style>
    </section>
  )
}
