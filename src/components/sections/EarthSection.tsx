'use client'
import { useEffect, useRef } from 'react'

export function EarthSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        ref.current?.querySelectorAll('.ei').forEach((el, i) => {
          setTimeout(() => { (el as HTMLElement).style.opacity = '1'; (el as HTMLElement).style.transform = 'translateY(0)' }, i * 180)
        })
      }
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100svh', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

      {/* Earth photo fullscreen */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/img-earth-kenya.jpg')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        animation: 'earthKen 30s ease-in-out infinite alternate',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.85) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 40%)' }} />

      {/* Right content */}
      <div style={{ position: 'relative', zIndex: 10, marginLeft: 'auto', padding: '80px 60px 80px 40px', maxWidth: 480 }}>
        <div className="ei" style={{ opacity: 0, transform: 'translateY(24px)', transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)', fontSize: 8, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.5)', textTransform: 'uppercase', marginBottom: 16 }}>
          Our Home
        </div>
        <h2 className="ei" style={{
          opacity: 0, transform: 'translateY(30px)', transition: 'all 0.9s cubic-bezier(0.25,1,0.5,1)',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200,
          color: '#F2E6D0', lineHeight: 0.92, marginBottom: 24,
        }}>
          Rooted in<br />
          <em style={{ color: '#D4A75F', fontStyle: 'italic' }}>Kenya.</em>
        </h2>

        <div className="ei" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)', width: 40, height: '0.5px', background: 'linear-gradient(90deg, #D4A75F, transparent)', marginBottom: 24 }} />

        <p className="ei" style={{
          opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)',
          fontSize: 13, lineHeight: 1.8, color: 'rgba(242,230,208,0.45)', marginBottom: 32,
        }}>
          From the vast savannahs of the Maasai Mara to the foot of Kilimanjaro. We take you to the most iconic and untouched places on earth.
        </p>

        {/* Drill-down nav */}
        <div className="ei" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[['Earth', false], ['Africa', false], ['Kenya', true], ['Maasai Mara', false]].map(([label, active]) => (
            <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: active ? '#D4A75F' : 'rgba(212,167,95,0.2)', boxShadow: active ? '0 0 8px rgba(212,167,95,0.6)' : 'none', transition: 'all 0.3s' }} />
              <span style={{ fontSize: 8, letterSpacing: '0.18em', color: active ? 'rgba(212,167,95,0.8)' : 'rgba(242,230,208,0.2)', textTransform: 'uppercase' }}>{label as string}</span>
            </div>
          ))}
        </div>

        <div className="ei" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)', marginTop: 32, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <span style={{ fontSize: 8, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.5)', textTransform: 'uppercase' }}>Begin Journey</span>
          <div style={{ height: '0.5px', width: 32, background: 'rgba(212,167,95,0.4)' }} />
        </div>
      </div>

      <style>{`@keyframes earthKen{0%{transform:scale(1)}100%{transform:scale(1.04) translate(-0.5%, 0.5%)}}`}</style>
    </section>
  )
}
