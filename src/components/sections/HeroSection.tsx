'use client'
import { useGreeting } from '@/components/ui/MobileUX'
import { useEffect, useRef } from 'react'
import { DustParticles } from '@/components/ui/DustParticles'
import { useLang } from '@/context/LanguageContext'

export function HeroSection() {
  const greeting = useGreeting()
  const { t } = useLang()
  const titleRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    setTimeout(() => { el.style.opacity='1'; el.style.transform='translateY(0)' }, 300)
  }, [])
  return (
    <section id="hero" style={{ position:'relative', width:'100%', height:'100svh', minHeight:560, overflow:'hidden', background:'#000' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:"url('/img-lion.jpg')", backgroundSize:'cover', backgroundPosition:'center 25%', animation:'heroKen 20s ease-in-out infinite alternate' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.4) 35%,rgba(0,0,0,0.1) 60%,rgba(0,0,0,0.55) 100%)' }} />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 50%,transparent 25%,rgba(0,0,0,0.75) 100%)' }} />
      <DustParticles />
      <div ref={titleRef} style={{ position:'absolute', inset:0, zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 clamp(16px,5vw,32px)', opacity:0, transform:'translateY(20px)', transition:'all 1.4s cubic-bezier(0.16,1,0.3,1)' }}>
        {greeting && (
          <div style={{
            fontSize:'clamp(9px,1.8vw,11px)',
            letterSpacing:'0.28em',
            color:'#D4A75F',
            textTransform:'uppercase',
            marginBottom:20,
            fontFamily:"'Inter',sans-serif",
            fontWeight:400,
            textShadow:'0 0 12px rgba(0,0,0,1), 0 0 24px rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.9)',
            background:'rgba(0,0,0,0.35)',
            backdropFilter:'blur(4px)',
            WebkitBackdropFilter:'blur(4px)',
            padding:'4px 14px',
            borderRadius:100,
            border:'0.5px solid rgba(212,167,95,0.2)',
          }}>
            {greeting}
          </div>
        )}
        <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(64px,18vw,130px)', fontWeight:200, letterSpacing:'0.1em', color:'#F2E6D0', lineHeight:0.88, marginBottom:8, animation:'rashidGlow 3.5s ease-in-out infinite' }} className='hero-title'>RASHID</h1>
        <div style={{ fontSize:'clamp(9px,2.8vw,16px)', letterSpacing:'0.42em', color:'rgba(212,167,95,0.7)', textTransform:'uppercase', marginBottom:18 }} className='hero-sub'>{t('hero_sub')}</div>
        <div style={{ width:'clamp(24px,4vw,32px)', height:'0.5px', background:'rgba(212,167,95,0.4)', marginBottom:18 }} />
        <div style={{ fontSize:'clamp(8px,1.8vw,12px)', letterSpacing:'0.2em', color:'rgba(242,230,208,0.35)', textTransform:'uppercase' }} className='hero-private'>{t('hero_private')}</div>
      </div>
      <div style={{ position:'absolute', bottom:'clamp(20px,4vh,40px)', left:0, right:0, zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
        <div style={{ width:'0.5px', height:'clamp(32px,5vh,48px)', background:'linear-gradient(180deg,rgba(212,167,95,0.5),transparent)' }} />
        <div style={{ fontSize:7, letterSpacing:'0.22em', color:'rgba(212,167,95,0.35)', textTransform:'uppercase' }}>{t('hero_scroll')}</div>
      </div>
      <style>{`
        @keyframes heroKen{0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.06) translate(-1%,0.5%)}}
        @keyframes rashidGlow{0%{text-shadow:0 0 40px rgba(212,167,95,0.2),0 0 80px rgba(212,167,95,0.08)}50%{text-shadow:0 0 80px rgba(212,167,95,1.0),0 0 160px rgba(212,167,95,0.6),0 0 280px rgba(212,167,95,0.3)}100%{text-shadow:0 0 40px rgba(212,167,95,0.2),0 0 80px rgba(212,167,95,0.08)}}
      `}</style>
    </section>
  )
}
