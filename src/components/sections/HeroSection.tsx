'use client'
import { useEffect, useRef } from 'react'

export function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, 300)
  }, [])

  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', minHeight: 600, overflow: 'hidden', background: '#000' }}>

      {/* Lion fullscreen */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/img-lion.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 25%',
        animation: 'heroKen 20s ease-in-out infinite alternate',
      }} />

      {/* Deep cinematic overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.6) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />

      {/* Top nav area — R logo */}
      <div style={{ position: 'absolute', top: 32, left: 40, zIndex: 20, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 44, fontWeight: 200, color: '#D4A75F', lineHeight: 1 }}>R</div>
        <div style={{ paddingBottom: 6 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.24em', color: '#F2E6D0', textTransform: 'uppercase' }}>Rashid</div>
          <div style={{ fontSize: 7, letterSpacing: '0.18em', color: 'rgba(212,167,95,0.5)', textTransform: 'uppercase' }}>Kenya Adventures</div>
        </div>
      </div>

      {/* Center content */}
      <div ref={titleRef} style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px',
        opacity: 0, transform: 'translateY(20px)',
        transition: 'all 1.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(212,167,95,0.5)', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'block', width: 32, height: '0.5px', background: 'rgba(212,167,95,0.4)' }}></span>
          Est. 1997 · Private Luxury Safaris
          <span style={{ display: 'block', width: 32, height: '0.5px', background: 'rgba(212,167,95,0.4)' }}></span>
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(52px, 10vw, 120px)',
          fontWeight: 200, letterSpacing: '0.1em',
          color: '#F2E6D0', lineHeight: 0.88,
          marginBottom: 8,
        }}>RASHID</h1>

        <div style={{
          fontSize: 'clamp(11px, 2vw, 16px)',
          letterSpacing: '0.45em',
          color: 'rgba(212,167,95,0.7)',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}>KENYA ADVENTURES</div>

        <div style={{ width: 32, height: '0.5px', background: 'rgba(212,167,95,0.4)', marginBottom: 20 }} />

        <div style={{
          fontSize: 'clamp(9px, 1.2vw, 12px)',
          letterSpacing: '0.22em',
          color: 'rgba(242,230,208,0.45)',
          textTransform: 'uppercase',
        }}>Private Luxury Safaris Across East Africa</div>
      </div>

      {/* Scroll to begin */}
      <div style={{ position: 'absolute', bottom: 40, left: 40, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 7, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.35)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll to begin</div>
        <div style={{ width: '0.5px', height: 48, background: 'linear-gradient(180deg, rgba(212,167,95,0.4), transparent)' }} />
      </div>

      {/* Experience Rashid — right */}
      <div style={{ position: 'absolute', bottom: 40, right: 40, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', border: '0.5px solid rgba(212,167,95,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'rgba(212,167,95,0.6)', fontSize: 14 }}>▶</span>
        </div>
        <div>
          <div style={{ fontSize: 7, letterSpacing: '0.2em', color: 'rgba(212,167,95,0.4)', textTransform: 'uppercase' }}>Experience</div>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', color: 'rgba(242,230,208,0.5)', textTransform: 'uppercase' }}>Rashid</div>
        </div>
      </div>

      <style>{`
        @keyframes heroKen {
          0% { transform: scale(1) translate(0,0); }
          100% { transform: scale(1.06) translate(-1%, 0.5%); }
        }
      `}</style>
    </section>
  )
}
