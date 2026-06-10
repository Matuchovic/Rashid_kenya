'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const LINKS = [
  { label: 'Safaris',      href: '/safaris' },
  { label: 'Big Five',     href: '/#bigfive' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'About',        href: '/about' },
  { label: 'Contact',      href: '/contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000, width: 'calc(100% - 32px)', maxWidth: 1180,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px', borderRadius: 100,
        background: scrolled ? 'rgba(5,5,5,0.92)' : 'rgba(5,5,5,0.55)',
        backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
        border: '0.5px solid rgba(212,167,95,0.1)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 8px 60px rgba(0,0,0,0.6)' : 'none',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'flex-end', gap: 8, textDecoration: 'none' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 200, color: '#D4A75F', lineHeight: 1 }}>R</div>
          <div style={{ paddingBottom: 3 }}>
            <div style={{ fontSize: 8, letterSpacing: '0.22em', color: '#F2E6D0', textTransform: 'uppercase', lineHeight: 1 }}>Rashid</div>
            <div style={{ fontSize: 6, letterSpacing: '0.16em', color: 'rgba(212,167,95,0.45)', textTransform: 'uppercase' }}>Kenya Adventures</div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'none', gap: 32, listStyle: 'none', margin: 0, padding: 0 }} className="nav-desktop">
          {LINKS.map(l => (
            <li key={l.href}>
              <Link href={l.href} style={{ fontSize: 10, letterSpacing: '0.08em', color: 'rgba(242,230,208,0.55)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F2E6D0')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,230,208,0.55)')}
              >{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link href="/booking" className="nav-cta-desktop" style={{
          display: 'none', fontSize: 9, letterSpacing: '0.14em', color: '#050505',
          background: '#D4A75F', padding: '10px 20px', borderRadius: 100,
          textDecoration: 'none', textTransform: 'uppercase', fontWeight: 500,
          transition: 'all 0.2s',
        }}>Book Safari</Link>

        {/* Mobile burger */}
        <button onClick={() => setOpen(o => !o)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', gap: 5, padding: 8,
        }} className="nav-burger" aria-label="Menu">
          <span style={{ display: 'block', width: open ? 20 : 20, height: '0.5px', background: '#D4A75F', transform: open ? 'rotate(45deg) translate(3px,3px)' : 'none', transition: 'all 0.3s', transformOrigin: 'center' }} />
          <span style={{ display: 'block', width: open ? 0 : 14, height: '0.5px', background: 'rgba(212,167,95,0.6)', transition: 'all 0.3s', marginLeft: 'auto' }} />
          <span style={{ display: 'block', width: open ? 20 : 20, height: '0.5px', background: '#D4A75F', transform: open ? 'rotate(-45deg) translate(3px,-3px)' : 'none', transition: 'all 0.3s', transformOrigin: 'center' }} />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(3,2,1,0.97)', backdropFilter: 'blur(40px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 40px 60px',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.4s ease',
      }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ borderBottom: '0.5px solid rgba(212,167,95,0.08)' }}>
              <Link href={l.href} onClick={() => setOpen(false)} style={{
                display: 'block', padding: '22px 0',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(32px, 8vw, 52px)', fontWeight: 200,
                color: '#F2E6D0', textDecoration: 'none',
                letterSpacing: '-0.01em', lineHeight: 1,
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.06 + 0.1}s`,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#D4A75F')}
              onMouseLeave={e => (e.currentTarget.style.color = '#F2E6D0')}
              >{l.label}</Link>
            </li>
          ))}
        </ul>

        <Link href="/booking" onClick={() => setOpen(false)} style={{
          marginTop: 40, display: 'inline-block',
          fontSize: 10, letterSpacing: '0.22em', color: '#050505',
          background: '#D4A75F', padding: '16px 32px', borderRadius: 100,
          textDecoration: 'none', textTransform: 'uppercase', fontWeight: 500,
          textAlign: 'center',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1) 0.4s',
        }}>Book Your Safari →</Link>

        <div style={{ position: 'absolute', bottom: 40, left: 40, right: 40, display: 'flex', justifyContent: 'space-between' }}>
          {['WhatsApp', 'Instagram', 'Email'].map(s => (
            <span key={s} style={{ fontSize: 8, letterSpacing: '0.18em', color: 'rgba(212,167,95,0.35)', textTransform: 'uppercase' }}>{s}</span>
          ))}
        </div>
      </div>

      <style>{`
        @media(min-width:1024px){
          .nav-desktop{display:flex!important}
          .nav-cta-desktop{display:inline!important}
          .nav-burger{display:none!important}
        }
      `}</style>
    </>
  )
}
