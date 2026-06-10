'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLang } from '@/context/LanguageContext'
import { Lang } from '@/lib/translations'

export function Navigation() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const LINKS = [
    { key: 'nav_safaris',    href: '#safaris' },
    { key: 'nav_bigfive',    href: '#bigfive' },
    { key: 'nav_packages',   href: '#packages' },
    { key: 'nav_experience', href: '#experience' },
    { key: 'nav_contact',    href: '#contact' },
  ] as const

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const langs: Lang[] = ['en', 'cs', 'de']

  return (
    <>
      <nav style={{
        position: 'fixed', top: 'clamp(10px,2vw,16px)',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'calc(100% - clamp(12px,4vw,32px))',
        maxWidth: 1180,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', verticalAlign: 'middle',
        padding: 'clamp(10px,3vw,14px) clamp(14px,4vw,24px)',
        borderRadius: 100,
        background: scrolled ? 'rgba(5,5,5,0.95)' : 'rgba(5,5,5,0.6)',
        backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
        border: '0.5px solid rgba(212,167,95,0.1)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 8px 60px rgba(0,0,0,0.6)' : 'none',
        overflow: 'hidden',
      }}>
        {/* Heartbeat line */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(212,167,95,0.06),transparent)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', height:1.5, width:0, background:'linear-gradient(90deg,transparent 0%,rgba(212,167,95,0.4) 10%,rgba(248,224,120,0.95) 50%,rgba(212,167,95,0.4) 90%,transparent 100%)', boxShadow:'0 0 10px rgba(212,167,95,0.6)', animation:'navHeartbeat 3.5s cubic-bezier(0.16,1,0.3,1) infinite', pointerEvents:'none' }} />

        {/* Logo */}
        <a href="#hero" onClick={e=>{e.preventDefault();scrollTo('#hero')}} style={{ display:'flex', alignItems:'flex-end', gap:8, textDecoration:'none', flexShrink:0, zIndex:2 }}>
          <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(22px,4vw,28px)', fontWeight:200, color:'#D4A75F', lineHeight:1 }}>R</div>
          <div style={{ paddingBottom:3 }}>
            <div style={{ fontSize:'clamp(7px,1.2vw,8px)', letterSpacing:'0.22em', color:'#F2E6D0', textTransform:'uppercase', lineHeight:1 }}>Rashid</div>
            <div style={{ fontSize:'clamp(5px,1vw,6px)', letterSpacing:'0.16em', color:'rgba(212,167,95,0.45)', textTransform:'uppercase' }}>Kenya Adventures</div>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="nav-desktop" style={{ display:'none', gap:24, listStyle:'none', margin:0, padding:0, zIndex:2 }}>
          {LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e=>{e.preventDefault();scrollTo(l.href)}}
                style={{ fontSize:10, letterSpacing:'0.08em', color:'rgba(242,230,208,0.5)', textDecoration:'none', textTransform:'uppercase', transition:'color 0.2s', cursor:'pointer' }}
                onMouseEnter={e=>(e.currentTarget.style.color='rgba(212,167,95,0.9)')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(242,230,208,0.5)')}
              >{t(l.key)}</a>
            </li>
          ))}
        </ul>

        {/* Right: lang switcher + CTA */}
        <div style={{ display:'flex', alignItems:'center', gap:12, zIndex:2 }}>
          {/* Lang switcher */}
          <div className="nav-desktop" style={{ display:'none', alignItems:'center', gap:4 }}>
            {langs.map((l, i) => (
              <button key={l} onClick={() => setLang(l)} style={{
                fontSize:9, letterSpacing:'0.12em', fontWeight:500,
                color: lang===l ? '#D4A75F' : 'rgba(242,230,208,0.3)',
                background:'none', border:'none', cursor:'pointer',
                padding:'4px 6px', transition:'color 0.2s',
                borderRight: i < langs.length-1 ? '0.5px solid rgba(212,167,95,0.2)' : 'none',
                textTransform:'uppercase',
              }}>{l.toUpperCase()}</button>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer"
            className="nav-cta-desktop"
            style={{ display:'none', fontSize:9, letterSpacing:'0.14em', color:'#050505', background:'#D4A75F', padding:'9px 18px', borderRadius:100, textDecoration:'none', textTransform:'uppercase', fontWeight:500, transition:'all 0.2s' }}
          >{t('nav_book')}</a>

          {/* Mobile burger */}
          <button onClick={() => setOpen(o => !o)}
            className="nav-burger"
            style={{ background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', gap:5, padding:'8px 4px', alignSelf:'center' }}
            aria-label="Menu"
          >
            <span style={{ display:'block', width:22, height:'0.5px', background:'#D4A75F', transform:open?'rotate(45deg) translate(3.5px,3.5px)':'none', transition:'all 0.3s' }} />
            <span style={{ display:'block', width:14, height:'0.5px', background:'rgba(212,167,95,0.6)', opacity:open?0:1, transition:'all 0.3s', marginLeft:'auto' }} />
            <span style={{ display:'block', width:22, height:'0.5px', background:'#D4A75F', transform:open?'rotate(-45deg) translate(3.5px,-3.5px)':'none', transition:'all 0.3s' }} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div style={{
        position:'fixed', inset:0, zIndex:999,
        background:'rgba(3,2,1,0.98)', backdropFilter:'blur(40px)', overflowY:'auto',
        display:'flex', flexDirection:'column', justifyContent:'flex-start', paddingTop:'clamp(80px,15vh,120px)',
        padding:'0 clamp(28px,8vw,48px) clamp(40px,8vh,72px)',
        opacity:open?1:0, pointerEvents:open?'all':'none',
        transition:'opacity 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column' }}>
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ borderBottom:'0.5px solid rgba(212,167,95,0.07)' }}>
              <a href={l.href} onClick={e=>{e.preventDefault();setOpen(false);setTimeout(()=>scrollTo(l.href),300)}} style={{
                display:'block', padding:'clamp(16px,4vh,24px) 0',
                fontFamily:"'Cormorant Garamond',Georgia,serif",
                fontSize:'clamp(36px,10vw,56px)', fontWeight:200,
                color:'#F2E6D0', textDecoration:'none', lineHeight:1,
                opacity:open?1:0, transform:open?'translateX(0)':'translateX(-20px)',
                transition:`all 0.5s cubic-bezier(0.16,1,0.3,1) ${i*0.06+0.1}s`,
              }}>{t(l.key)}</a>
            </li>
          ))}
        </ul>

        {/* Mobile lang switcher */}
        <div style={{ display:'flex', gap:12, marginTop:28, opacity:open?1:0, transition:'opacity 0.5s ease 0.4s' }}>
          {langs.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              fontSize:11, letterSpacing:'0.14em', fontWeight:500,
              color: lang===l ? '#D4A75F' : 'rgba(242,230,208,0.3)',
              background: lang===l ? 'rgba(212,167,95,0.1)' : 'none',
              border: lang===l ? '0.5px solid rgba(212,167,95,0.4)' : '0.5px solid rgba(255,255,255,0.1)',
              cursor:'pointer', padding:'8px 16px', borderRadius:100,
              textTransform:'uppercase', transition:'all 0.2s',
            }}>{l.toUpperCase()}</button>
          ))}
        </div>

        <a href="https://wa.me/254700000000" onClick={() => setOpen(false)} target="_blank" rel="noopener noreferrer" style={{
          marginTop:'clamp(20px,4vh,32px)',
          display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
          fontSize:10, letterSpacing:'0.22em', color:'#050505',
          background:'#D4A75F', padding:'16px 32px', borderRadius:100,
          textDecoration:'none', textTransform:'uppercase', fontWeight:500,
          opacity:open?1:0, transform:open?'translateY(0)':'translateY(16px)',
          transition:'all 0.5s cubic-bezier(0.16,1,0.3,1) 0.45s',
        }}>{t('nav_book')} →</a>

        <div style={{ position:'absolute', bottom:'clamp(24px,5vh,40px)', left:'clamp(28px,8vw,48px)', right:'clamp(28px,8vw,48px)', display:'flex', justifyContent:'space-between' }}>
          {['WhatsApp', 'Instagram', 'Email'].map(s => (
            <span key={s} style={{ fontSize:8, letterSpacing:'0.18em', color:'rgba(212,167,95,0.3)', textTransform:'uppercase' }}>{s}</span>
          ))}
        </div>
      </div>

      <style>{`
        @media(min-width:1024px){
          .nav-desktop{display:flex!important}
          .nav-cta-desktop{display:inline-flex!important}
          .nav-burger{display:none!important}
        }
        @keyframes navHeartbeat{
          0%{width:0;opacity:0}8%{opacity:1}30%{width:70%;opacity:0.9}
          55%{width:88%;opacity:0.7}75%{width:92%;opacity:0.5}
          90%{width:94%;opacity:0.2}100%{width:96%;opacity:0}
        }
      `}</style>
    </>
  )
}
