'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { DustParticles } from '@/components/ui/DustParticles'

export function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, 300)
  }, [])

  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', minHeight: 600, overflow: 'hidden', background: '#000' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/img-lion.jpg')", backgroundSize: 'cover', backgroundPosition: 'center 25%', animation: 'heroKen 20s ease-in-out infinite alternate' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.55) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 25%, rgba(0,0,0,0.75) 100%)' }} />

      <div ref={titleRef} style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 20px',
        opacity: 0, transform: 'translateY(20px)',
        transition: 'all 1.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ fontSize: 'clamp(7px,1.8vw,9px)', letterSpacing: '0.28em', color: 'rgba(212,167,95,0.5)', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'block', width: 24, height: '0.5px', background: 'rgba(212,167,95,0.4)' }}></span>
          Est. 1997 · Private Luxury Safaris
          <span style={{ display: 'block', width: 24, height: '0.5px', background: 'rgba(212,167,95,0.4)' }}></span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(56px, 16vw, 130px)', fontWeight: 200, letterSpacing: '0.1em', color: '#F2E6D0', lineHeight: 0.88, marginBottom: 8, animation: 'rashidGlow 3.5s ease-in-out infinite' }}>RASHID</h1>
        <div style={{ fontSize: 'clamp(9px, 2.5vw, 16px)', letterSpacing: '0.42em', color: 'rgba(212,167,95,0.7)', textTransform: 'uppercase', marginBottom: 18 }}>KENYA ADVENTURES</div>
        <div style={{ width: 28, height: '0.5px', background: 'rgba(212,167,95,0.4)', marginBottom: 18 }} />
        <div style={{ fontSize: 'clamp(8px, 1.8vw, 12px)', letterSpacing: '0.2em', color: 'rgba(242,230,208,0.4)', textTransform: 'uppercase' }}>Private Luxury Safaris Across East Africa</div>
      </div>

      <div style={{ position: 'absolute', bottom: 'clamp(24px,5vh,44px)', left: 0, right: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ width: '0.5px', height: 'clamp(32px,5vh,48px)', background: 'linear-gradient(180deg, rgba(212,167,95,0.5), transparent)' }} />
        <div style={{ fontSize: 7, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.35)', textTransform: 'uppercase' }}>Scroll to begin</div>
      </div>

      <style>{`@keyframes heroKen{0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.06) translate(-1%,0.5%)}}
        @keyframes rashidGlow{
          0%,100%{text-shadow:0 0 30px rgba(212,167,95,0.0),0 0 0px rgba(212,167,95,0.0)}
          50%{text-shadow:0 0 60px rgba(212,167,95,0.5),0 0 120px rgba(212,167,95,0.2),0 0 200px rgba(212,167,95,0.08)}
        }`}</style>
    </section>
  )
}
