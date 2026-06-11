'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLang } from '@/context/LanguageContext'
import { ContactMenu } from '@/components/ui/ContactMenu'
import { Lang } from '@/lib/translations'


function LionLogo() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  React.useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return
    const CX = 32, CY = 32
    let f = 0, raf = 0
    const HM = 'HAKUNA MATATA  \u2726  HAKUNA MATATA  \u2726  '
    const pts = Array.from({ length: 40 }, (_, i) => ({
      a: (i / 40) * Math.PI * 2,
      spd: (Math.random() > .5 ? 1 : -1) * (0.002 + Math.random() * 0.005),
      ph: Math.random() * Math.PI * 2,
      sz: 0.4 + Math.random() * 1.4,
      op: 0.25 + Math.random() * 0.65,
      ring: i % 3
    }))
    const eyePositions: [number, number][] = [[-3, -4], [3, -4]]
    const maneData = [
      { m0: 11, m1: 0.9, count: 16, offset: 0,   w: 3.0, col: 'rgba(45,18,2,' },
      { m0: 9,  m1: 0.7, count: 13, offset: 0.2,  w: 2.5, col: 'rgba(100,48,6,' },
      { m0: 7,  m1: 0.5, count: 10, offset: 0.4,  w: 2.0, col: 'rgba(150,85,12,' },
      { m0: 5,  m1: 0.4, count: 8,  offset: 0.6,  w: 1.8, col: 'rgba(210,155,25,' },
    ]
    function draw() {
      ctx.clearRect(0, 0, 64, 64)
      const t = f * 0.022
      const br = Math.sin(t) * .5 + .5
      const pu = Math.sin(t * 1.5) * .5 + .5
      // Glow
      const rg = ctx.createRadialGradient(CX, CY, 0, CX, CY, 32)
      rg.addColorStop(.5, 'rgba(212,167,95,0)')
      rg.addColorStop(1, `rgba(212,167,95,${.08 + pu * .07})`)
      ctx.beginPath(); ctx.arc(CX, CY, 32, 0, Math.PI * 2)
      ctx.fillStyle = rg; ctx.fill()
      // Tečky
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.a += p.spd
        const radii = [22, 26, 30]
        const r = radii[p.ring] + Math.sin(p.ph + t) * 2
        const px = CX + Math.cos(p.a) * r
        const py = CY + Math.sin(p.a) * r
        const g = .3 + Math.sin(p.ph + t * 1.8) * .7
        ctx.beginPath(); ctx.arc(px, py, p.sz * (.6 + g * .4), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,215,70,${p.op * Math.max(0, g)})`; ctx.fill()
      }
      // Hakuna Matata
      ctx.save(); ctx.translate(CX, CY); ctx.rotate(f * .005)
      ctx.font = '2.6px Inter,sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      const chars = HM.split('')
      const apc = (Math.PI * 2) / chars.length
      for (let i = 0; i < chars.length; i++) {
        ctx.save()
        ctx.rotate(i * apc - Math.PI / 2)
        ctx.translate(0, -19)
        ctx.rotate(Math.PI / 2)
        ctx.fillStyle = `rgba(212,167,95,${.35 + Math.sin(f * .04 + i * .3) * .3})`
        ctx.fillText(chars[i], 0, 0)
        ctx.restore()
      }
      ctx.restore()
      // Kruh
      ctx.beginPath(); ctx.arc(CX, CY, 21, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(212,167,95,${.15 + pu * .12})`; ctx.lineWidth = .3; ctx.stroke()
      // Hřiva
      ctx.save(); ctx.translate(CX, CY + 1)
      for (let li = 0; li < maneData.length; li++) {
        const md = maneData[li]
        const m = md.m0 + br * md.m1
        for (let i = 0; i < md.count; i++) {
          const a = (i / md.count) * Math.PI * 2 + md.offset + Math.sin(t * (.35 + li * .1) + i * .5) * .05
          ctx.beginPath(); ctx.moveTo(0, -1)
          const ex = Math.cos(a) * m, ey = Math.sin(a) * m * .93
          ctx.bezierCurveTo(
            Math.cos(a - .3) * m * .6, Math.sin(a - .3) * m * .6 * .93,
            Math.cos(a + .3) * m * .6, Math.sin(a + .3) * m * .6 * .93,
            ex, ey
          )
          ctx.lineWidth = md.w
          ctx.strokeStyle = md.col + `${.7 + Math.sin(t + i) * .1})`
          ctx.lineCap = 'round'; ctx.stroke()
        }
      }
      // Hlava
      ctx.beginPath()
      ctx.moveTo(-6, 1)
      ctx.bezierCurveTo(-8, -2, -8, -7, -6, -9)
      ctx.bezierCurveTo(-4, -11, 4, -11, 6, -9)
      ctx.bezierCurveTo(8, -7, 8, -2, 6, 1)
      ctx.bezierCurveTo(5, 4, 3, 7, 2, 8)
      ctx.bezierCurveTo(1, 9, -1, 9, -2, 8)
      ctx.bezierCurveTo(-3, 7, -5, 4, -6, 1)
      const hg = ctx.createRadialGradient(0, -3, 0, 0, -3, 10)
      hg.addColorStop(0, '#DFB040'); hg.addColorStop(.6, '#C49020'); hg.addColorStop(1, '#8A6010')
      ctx.fillStyle = hg; ctx.fill()
      // Uši
      ctx.beginPath(); ctx.moveTo(-5, -8); ctx.lineTo(-8, -13); ctx.lineTo(-4, -9)
      ctx.fillStyle = '#A87016'; ctx.fill()
      ctx.beginPath(); ctx.moveTo(5, -8); ctx.lineTo(8, -13); ctx.lineTo(4, -9)
      ctx.fillStyle = '#A87016'; ctx.fill()
      // Oči
      const bk = Math.sin(t * .28) > .93 ? .3 : 1
      for (let idx = 0; idx < eyePositions.length; idx++) {
        const ex = eyePositions[idx][0]
        const ey2 = eyePositions[idx][1]
        ctx.beginPath(); ctx.ellipse(ex, ey2, 2, 1.8 * bk, 0, 0, Math.PI * 2)
        ctx.fillStyle = '#0a0600'; ctx.fill()
        ctx.beginPath(); ctx.ellipse(ex, ey2, 1.4, 1.4 * bk, 0, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(155,90,10,.9)'; ctx.fill()
        ctx.beginPath(); ctx.ellipse(ex, ey2, .8, 1.1 * bk, 0, 0, Math.PI * 2)
        ctx.fillStyle = '#040200'; ctx.fill()
        if (bk > .4) {
          ctx.beginPath()
          ctx.arc(ex + (idx === 0 ? .6 : -.6), ey2 - .8, .7, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,230,150,${.6 + pu * .3})`; ctx.fill()
        }
      }
      // Nos
      ctx.beginPath()
      ctx.moveTo(-2, 0); ctx.bezierCurveTo(-2.5, -1, 2.5, -1, 2, 0)
      ctx.bezierCurveTo(1.8, 2, .8, 3, 0, 3); ctx.bezierCurveTo(-.8, 3, -1.8, 2, -2, 0)
      ctx.fillStyle = '#5A2808'; ctx.fill()
      // Tělo
      ctx.beginPath()
      ctx.moveTo(-6, 8)
      ctx.bezierCurveTo(-8, 11, -8, 16, -6, 19)
      ctx.bezierCurveTo(-4, 21, -2, 22, 0, 22)
      ctx.bezierCurveTo(2, 22, 4, 21, 6, 19)
      ctx.bezierCurveTo(8, 16, 8, 11, 6, 8)
      ctx.bezierCurveTo(4, 6, -4, 6, -6, 8)
      const bg = ctx.createLinearGradient(0, 8, 0, 22)
      bg.addColorStop(0, '#C49020'); bg.addColorStop(1, '#886010')
      ctx.fillStyle = bg; ctx.fill()
      // Ocas
      const ts = Math.sin(t * 1.4) * 7
      ctx.beginPath(); ctx.moveTo(6, 16)
      ctx.bezierCurveTo(12, 13 + ts * .3, 15, 8 + ts * .7, 17, 3 + ts)
      ctx.strokeStyle = '#B89018'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke()
      for (let i = 0; i < 6; i++) {
        const ta = (i / 6) * Math.PI * 1.4 - Math.PI * .7
        ctx.beginPath(); ctx.moveTo(17, 3 + ts)
        ctx.bezierCurveTo(
          17 + Math.cos(ta) * 3, 3 + ts + Math.sin(ta) * 3,
          17 + Math.cos(ta) * 5, 3 + ts + Math.sin(ta) * 5,
          17 + Math.cos(ta) * 5.5, 3 + ts + Math.sin(ta) * 5.5
        )
        ctx.strokeStyle = `rgba(180,130,18,.5)`; ctx.lineWidth = 1.2; ctx.stroke()
      }
      ctx.restore()
      f++
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={canvasRef} width={64} height={64} style={{ width: 40, height: 40 }} />
}



// Haptic feedback helper
function haptic(ms: number = 8) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(ms)
  }
}

// Kenya time hook
function useKenyaTime() {
  const [time, setTime] = React.useState('')
  React.useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Africa/Nairobi',
        hour: '2-digit',
        minute: '2-digit',
      })
      setTime(t)
    }
    update()
    const iv = setInterval(update, 1000)
    return () => clearInterval(iv)
  }, [])
  return time
}


function KenyaTimeWidget() {
  const time = useKenyaTime()
  if (!time) return null
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
      background: 'rgba(212,167,95,0.06)',
      border: '0.5px solid rgba(212,167,95,0.15)',
      borderRadius: 100, padding: '3px 8px',
    }}>
      <span style={{ fontSize: 7, color: 'rgba(212,167,95,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>NBI</span>
      <span style={{ fontSize: 10, color: '#D4A75F', fontFamily: 'monospace', fontWeight: 500 }}>{time}</span>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(37,211,102,0.8)', display: 'inline-block', boxShadow: '0 0 4px rgba(37,211,102,0.5)' }} />
    </div>
  )
}


function KilimanjaroButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const frameRef = React.useRef(0)
  const rafRef = React.useRef<number>(0)
  const openRef = React.useRef(open)
  React.useEffect(() => { openRef.current = open }, [open])

  React.useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      frameRef.current++
      const t = frameRef.current * 0.045
      const W = 32, H = 26
      ctx.clearRect(0, 0, W, H)

      if (!openRef.current) {
        // 3 plamenné čáry
        const rows = [
          { y: H * 0.2,  phase: 0,        width: W - 6 },
          { y: H * 0.52, phase: Math.PI,   width: W - 10 },
          { y: H * 0.82, phase: Math.PI/2, width: W - 6 },
        ]
        rows.forEach((row, i) => {
          const flicker = Math.sin(t * 3.5 + i * 1.4 + row.phase) * 1.8
          const alpha = 0.7 + Math.sin(t * 4 + i) * 0.25
          ctx.strokeStyle = `rgba(212,167,95,${alpha})`
          ctx.lineWidth = 1.6 - i * 0.1
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(3, row.y + flicker * 0.4)
          ctx.bezierCurveTo(
            3 + row.width * 0.3, row.y + flicker,
            3 + row.width * 0.7, row.y - flicker,
            3 + row.width,       row.y + flicker * 0.3
          )
          ctx.stroke()
          // Sparks — jiskry letí nahoru
          if (Math.sin(t * 6 + i * 2.1) > 0.82) {
            const sx = 3 + Math.random() * row.width
            ctx.beginPath()
            ctx.arc(sx, row.y - 3 - Math.random() * 3, 0.8, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255,220,100,${0.4 + Math.random() * 0.4})`
            ctx.fill()
          }
        })
        // Kilimanjaro silueta — jemně v pozadí
        ctx.save()
        ctx.globalAlpha = 0.08 + Math.sin(t * 0.5) * 0.03
        ctx.fillStyle = '#D4A75F'
        ctx.beginPath()
        ctx.moveTo(0, H)
        ctx.lineTo(W * 0.2, H * 0.55)
        ctx.lineTo(W * 0.35, H * 0.65)
        ctx.lineTo(W * 0.5, H * 0.3)
        ctx.lineTo(W * 0.65, H * 0.62)
        ctx.lineTo(W * 0.8, H * 0.52)
        ctx.lineTo(W, H)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      } else {
        // X z plamenů — zavřít
        const f1 = Math.sin(t * 4) * 1.5
        const f2 = Math.sin(t * 3.5 + 1) * 1.5
        ctx.lineCap = 'round'
        ctx.lineWidth = 1.7
        // Diagonála 1
        ctx.strokeStyle = `rgba(212,167,95,${0.7 + Math.sin(t * 5) * 0.25})`
        ctx.beginPath()
        ctx.moveTo(5 + f1, 4)
        ctx.bezierCurveTo(W * 0.3, H * 0.3 + f1, W * 0.7, H * 0.7 - f2, W - 5 - f2, H - 4)
        ctx.stroke()
        // Diagonála 2
        ctx.strokeStyle = `rgba(212,167,95,${0.7 + Math.sin(t * 4.5 + 1) * 0.25})`
        ctx.beginPath()
        ctx.moveTo(W - 5 + f2, 4)
        ctx.bezierCurveTo(W * 0.7, H * 0.3 - f1, W * 0.3, H * 0.7 + f2, 5 + f1, H - 4)
        ctx.stroke()
        // Jiskry kolem středu
        for (let s = 0; s < 4; s++) {
          const a = t * 2 + s * Math.PI / 2
          const r = 4 + Math.sin(t * 5 + s) * 2
          ctx.beginPath()
          ctx.arc(W / 2 + Math.cos(a) * r, H / 2 + Math.sin(a) * r, 1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,210,80,${0.3 + Math.sin(t * 4 + s) * 0.3})`
          ctx.fill()
        }
      }
    }
    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <button
      onClick={onClick}
      className="nav-burger"
      style={{ background:'none', border:'none', cursor:'pointer', padding:'8px 4px', alignSelf:'center', display:'flex', alignItems:'center', justifyContent:'center' }}
      aria-label="Menu"
    >
      <canvas ref={canvasRef} width={32} height={26} style={{ width:32, height:26, display:'block' }} />
    </button>
  )
}


export function Navigation() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

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

  const langs: Lang[] = ['en', 'cs', 'de', 'ar', 'sw', 'pl', 'it', 'es']

  return (
    <>
      <nav style={{
        position: 'fixed', top: 'clamp(10px,2vw,16px)',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'calc(100% - clamp(12px,4vw,32px))',
        maxWidth: 1180,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(14px,4vw,24px)', height: 'clamp(52px,7vw,64px)',
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
        <a href="#hero" onClick={e=>{e.preventDefault();scrollTo('#hero')}} style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flexShrink:0, zIndex:2 }}>
          <LionLogo />
          <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(13px,2vw,18px)', fontWeight:200, color:'#F2E6D0', letterSpacing:'0.22em', lineHeight:1 }}>RASHID</div>
            <div style={{ fontSize:'clamp(5px,0.9vw,6px)', letterSpacing:'0.16em', color:'rgba(212,167,95,0.5)', textTransform:'uppercase' }}>KENYA ADVENTURES</div>
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
          {/* Lang dropdown */}
          <div className="nav-desktop" style={{ display:'none', position:'relative' }} onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button style={{
              display:'flex', alignItems:'center', gap:5,
              fontSize:9, letterSpacing:'0.14em', fontWeight:500,
              color:'#D4A75F', background:'rgba(212,167,95,0.06)',
              border:'0.5px solid rgba(212,167,95,0.25)',
              cursor:'pointer', padding:'6px 12px', borderRadius:100,
              textTransform:'uppercase', transition:'all 0.2s',
            }}>
              {lang.toUpperCase()}
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ transition:'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M1 2.5L4 5.5L7 2.5" stroke="#D4A75F" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
            <div style={{
              position:'absolute', top:'calc(100% + 8px)', right:0,
              background:'rgba(8,6,4,0.97)', backdropFilter:'blur(40px)',
              border:'0.5px solid rgba(212,167,95,0.15)',
              borderRadius:12, padding:'6px',
              opacity: langOpen ? 1 : 0,
              pointerEvents: langOpen ? 'all' : 'none',
              transform: langOpen ? 'translateY(0)' : 'translateY(-6px)',
              transition:'all 0.2s cubic-bezier(0.16,1,0.3,1)',
              minWidth:80, zIndex:100,
            }}>
              {langs.map(l => (
                <button key={l} onClick={() => { setLang(l); setLangOpen(false) }} style={{
                  display:'block', width:'100%', textAlign:'left',
                  fontSize:9, letterSpacing:'0.14em', fontWeight:500,
                  color: lang===l ? '#D4A75F' : 'rgba(242,230,208,0.45)',
                  background: lang===l ? 'rgba(212,167,95,0.08)' : 'none',
                  border:'none', cursor:'pointer',
                  padding:'7px 12px', borderRadius:8,
                  textTransform:'uppercase', transition:'all 0.15s',
                }}
                onMouseEnter={e => { if(lang!==l) (e.currentTarget as HTMLButtonElement).style.color='rgba(242,230,208,0.9)'; (e.currentTarget as HTMLButtonElement).style.background='rgba(212,167,95,0.05)' }}
                onMouseLeave={e => { if(lang!==l) { (e.currentTarget as HTMLButtonElement).style.color='rgba(242,230,208,0.45)'; (e.currentTarget as HTMLButtonElement).style.background='none' }}}
                >{l.toUpperCase()}</button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <a href="https://wa.me/254718930587" target="_blank" rel="noopener noreferrer"
            className="nav-cta-desktop" onClick={() => haptic(8)}
            style={{ display:'none', position:'relative', overflow:'hidden', fontSize:9, letterSpacing:'0.16em', color:'#F2E6D0', background:'rgba(255,255,255,0.04)', padding:'9px 20px', borderRadius:100, textDecoration:'none', textTransform:'uppercase', fontWeight:400, border:'0.5px solid rgba(242,230,208,0.18)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', boxShadow:'0 0 16px rgba(212,167,95,0.1), inset 0 0.5px 0 rgba(255,255,255,0.08)', transition:'all 0.3s ease' }}
          >{t('nav_book')}</a>

          {/* Kenya time — mobile */}
          <KenyaTimeWidget />
          {/* Mobile burger — Oheň Kilimanjaro */}
          <KilimanjaroButton open={open} onClick={() => setOpen(o => !o)} />
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div style={{
        position:'fixed', inset:0, zIndex:999,
        background:'rgba(3,2,1,0.98)', backdropFilter:'blur(40px)', overflowY:'auto',
        display:'flex', flexDirection:'column', justifyContent:'flex-start',
        paddingTop:'clamp(80px,15vh,120px)',
        paddingLeft:'clamp(28px,8vw,48px)', paddingRight:'clamp(28px,8vw,48px)', paddingBottom:'clamp(40px,8vh,72px)',
        boxSizing:'border-box', width:'100%', maxWidth:'100vw', overflowX:'hidden',
        opacity:open?1:0, pointerEvents:open?'all':'none',
        transition:'opacity 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', width:'100%', overflowX:'hidden' }}>
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
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:28, opacity:open?1:0, transition:'opacity 0.5s ease 0.4s', width:'100%' }}>
          {langs.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              fontSize:10, letterSpacing:'0.12em', fontWeight:500,
              color: lang===l ? '#D4A75F' : 'rgba(242,230,208,0.3)',
              background: lang===l ? 'rgba(212,167,95,0.1)' : 'none',
              border: lang===l ? '0.5px solid rgba(212,167,95,0.4)' : '0.5px solid rgba(255,255,255,0.1)',
              cursor:'pointer', padding:'7px 14px', borderRadius:100,
              textTransform:'uppercase', transition:'all 0.2s', flexShrink:0,
            }}>{l === 'sw' ? 'SW' : l === 'ar' ? 'AR' : l === 'pl' ? 'PL' : l === 'it' ? 'IT' : l === 'es' ? 'ES' : l.toUpperCase()}</button>
          ))}
        </div>

        <a href="https://wa.me/254718930587" onClick={() => setOpen(false)} target="_blank" rel="noopener noreferrer" style={{
          marginTop:'clamp(20px,4vh,32px)',
          display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
          fontSize:10, letterSpacing:'0.22em', color:'#F2E6D0',
          background:'rgba(255,255,255,0.04)',
          padding:'16px 32px', borderRadius:100,
          border:'0.5px solid rgba(242,230,208,0.18)',
          backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
          boxShadow:'0 0 16px rgba(212,167,95,0.12), inset 0 0.5px 0 rgba(255,255,255,0.08)',
          textDecoration:'none', textTransform:'uppercase', fontWeight:400,
          position:'relative', overflow:'hidden',
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
