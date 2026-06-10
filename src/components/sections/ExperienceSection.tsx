'use client'
import { useEffect, useRef } from 'react'

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        ref.current?.querySelectorAll('.xi').forEach((el, i) => {
          setTimeout(() => { (el as HTMLElement).style.opacity = '1'; (el as HTMLElement).style.transform = 'translateY(0)' }, i * 200)
        })
      }
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '80vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Savanna sunset photo */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/img-savanna.jpg')", backgroundSize: 'cover', backgroundPosition: 'center 40%', animation: 'expKen 25s ease-in-out infinite alternate' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />

      <div style={{ position: 'relative', zIndex: 10, padding: '80px 48px', maxWidth: 640 }}>
        <div className="xi" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)', fontSize: 8, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.4)', textTransform: 'uppercase', marginBottom: 20 }}>
          Beyond a Safari
        </div>
        <h2 className="xi" style={{
          opacity: 0, transform: 'translateY(30px)', transition: 'all 1s cubic-bezier(0.25,1,0.5,1)',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 200,
          color: '#F2E6D0', lineHeight: 0.88, marginBottom: 28,
        }}>
          A Life<br /><em style={{ color: '#D4A75F', fontStyle: 'italic' }}>Changing</em><br />Experience.
        </h2>
        <p className="xi" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)', fontSize: 13, lineHeight: 1.8, color: 'rgba(242,230,208,0.45)', maxWidth: 420, marginBottom: 32 }}>
          Every journey is crafted with passion, expertise and deep respect for nature and local cultures. This is more than a trip. This is your story.
        </p>
        <div className="xi" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <span style={{ fontSize: 8, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.6)', textTransform: 'uppercase' }}>Discover Experiences</span>
          <div style={{ height: '0.5px', width: 40, background: 'rgba(212,167,95,0.4)' }} />
        </div>
      </div>
      <style>{`@keyframes expKen{0%{transform:scale(1)}100%{transform:scale(1.05) translate(-1%, 0)}}`}</style>
    </section>
  )
}
