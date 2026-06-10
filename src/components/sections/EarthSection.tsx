'use client'
import { useEffect, useRef } from 'react'

export function EarthSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current?.querySelectorAll('.ei').forEach((el,i) => setTimeout(()=>{(el as HTMLElement).style.opacity='1';(el as HTMLElement).style.transform='translateY(0)'},i*180))
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ position:'relative', minHeight:'100svh', background:'#000', overflow:'hidden', display:'flex', alignItems:'center' }}>

      {/* Earth photo */}
      <div style={{ position:'absolute', inset:0, backgroundImage:"url('/img-earth-kenya.jpg')", backgroundSize:'cover', backgroundPosition:'center', animation:'earthKen 30s ease-in-out infinite alternate' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.1) 40%,rgba(0,0,0,0.7) 100%)' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent 25%,rgba(0,0,0,0.85) 100%)' }} />

      {/* ═══ KENYA SVG OVERLAY — přesné souřadnice z fotky ═══
           Fotka: 1672x941px
           Kenya: X 51.2%–60.5%, Y 55.3%–73.5%
           Střed: 55.9%, 64.4%
      */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kenyaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(212,167,95,0.7)"/>
            <stop offset="40%" stopColor="rgba(248,224,120,1)"/>
            <stop offset="60%" stopColor="rgba(255,248,180,1)"/>
            <stop offset="100%" stopColor="rgba(212,167,95,0.6)"/>
          </linearGradient>
          <filter id="kenyaGlow">
            <feGaussianBlur stdDeviation="0.3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Kenya shape — přesně na fotce (viewBox 0 0 100 100) */}
        {/* Bounds: X 51.2–60.5%, Y 55.3–73.5% → střed 55.9%, 64.4% */}

        {/* Breathing fill */}
        <path
          d="M53.5,56.5 L55.5,55.3 L57.8,55.5 L59.2,56.8 L60.5,58.5 L60.3,61.2 L59.5,63.5 L58.2,66.0 L57.0,68.5 L55.5,70.8 L54.0,72.0 L52.5,73.0 L51.5,72.5 L51.2,71.0 L51.5,68.0 L52.0,65.5 L52.5,62.5 L52.8,59.5 Z"
          fill="rgba(212,167,95,0.05)"
          stroke="rgba(212,167,95,0.3)"
          strokeWidth="0.15"
          style={{ animation:'kenyaBreath 3.5s ease-in-out 2.5s infinite' }}
        />

        {/* Draw border — main outline */}
        <path
          d="M53.5,56.5 L55.5,55.3 L57.8,55.5 L59.2,56.8 L60.5,58.5 L60.3,61.2 L59.5,63.5 L58.2,66.0 L57.0,68.5 L55.5,70.8 L54.0,72.0 L52.5,73.0 L51.5,72.5 L51.2,71.0 L51.5,68.0 L52.0,65.5 L52.5,62.5 L52.8,59.5 Z"
          fill="none"
          stroke="url(#kenyaGold)"
          strokeWidth="0.2"
          strokeDasharray="40"
          strokeDashoffset="40"
          filter="url(#kenyaGlow)"
          style={{ animation:'kenyaDraw 2s cubic-bezier(0.25,1,0.5,1) 0.5s forwards' }}
        />

        {/* Glass pill traveling border */}
        <path
          d="M53.5,56.5 L55.5,55.3 L57.8,55.5 L59.2,56.8 L60.5,58.5 L60.3,61.2 L59.5,63.5 L58.2,66.0 L57.0,68.5 L55.5,70.8 L54.0,72.0 L52.5,73.0 L51.5,72.5 L51.2,71.0 L51.5,68.0 L52.0,65.5 L52.5,62.5 L52.8,59.5 Z"
          fill="none"
          stroke="rgba(255,248,180,0.9)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray="6 34"
          strokeDashoffset="0"
          filter="url(#kenyaGlow)"
          style={{ animation:'glassPill 3.5s cubic-bezier(0.4,0,0.2,1) 2.8s infinite' }}
        />

        {/* Nairobi dot — ~55.5%, 67% */}
        <circle cx="55.5" cy="67.0" r="0.5" fill="rgba(212,167,95,0.3)" style={{ animation:'nairobiRing 2.5s ease-out 3s infinite' }}/>
        <circle cx="55.5" cy="67.0" r="0.5" fill="rgba(212,167,95,0.2)" style={{ animation:'nairobiRing 2.5s ease-out 3.4s infinite' }}/>
        <circle cx="55.5" cy="67.0" r="0.25" fill="#D4A75F" filter="url(#kenyaGlow)" style={{ animation:'coreGlow 2.5s ease-in-out 3s infinite' }}/>

        {/* Maasai Mara dot — ~52.5%, 69.5% */}
        <circle cx="52.8" cy="69.5" r="0.2" fill="rgba(212,167,95,0.5)" style={{ animation:'maraPulse 3s ease-in-out 3.5s infinite' }}/>

        {/* Callout line → KENYA label */}
        <line x1="60.5" y1="58.0" x2="63.5" y2="55.0" stroke="rgba(212,167,95,0.25)" strokeWidth="0.08" strokeDasharray="2" style={{ animation:'calloutDraw 0.6s ease 2.2s both' }}/>
        <text x="64" y="54.5" style={{ fontFamily:'Inter,sans-serif', fontSize:'1.2px', letterSpacing:'0.06em', fill:'rgba(212,167,95,0.75)', textTransform:'uppercase' }}>KENYA</text>

        {/* City labels */}
        <text x="56.2" y="67.5" style={{ fontFamily:'Inter,sans-serif', fontSize:'0.8px', letterSpacing:'0.04em', fill:'rgba(212,167,95,0.45)' }}>Nairobi</text>
        <text x="50.5" y="70.5" style={{ fontFamily:'Inter,sans-serif', fontSize:'0.7px', letterSpacing:'0.03em', fill:'rgba(212,167,95,0.35)' }}>Maasai Mara</text>

        {/* Zoom magnifier circle */}
        <circle cx="79" cy="72" r="9" fill="rgba(5,3,0,0.55)" stroke="rgba(212,167,95,0.2)" strokeWidth="0.2"/>
        {/* Mini Kenya inside magnifier */}
        <path
          d="M75.5,69 L76.5,68.4 L77.9,68.5 L78.9,69.2 L79.7,70.2 L79.6,71.5 L79.1,72.6 L78.3,73.9 L77.4,75.2 L76.3,76.1 L75.2,76.7 L74.4,76.5 L74.1,75.7 L74.4,74.3 L74.8,73.0 L75.1,71.7 L75.3,70.3 Z"
          fill="rgba(212,167,95,0.08)"
          stroke="rgba(212,167,95,0.5)"
          strokeWidth="0.15"
          style={{ animation:'kenyaBreath 3.5s ease-in-out 3s infinite' }}
        />
        {/* Connecting line from Kenya to magnifier */}
        <line x1="60.5" y1="64.4" x2="70" y2="68" stroke="rgba(212,167,95,0.2)" strokeWidth="0.1" strokeDasharray="1 2"/>
        <text x="72" y="67" style={{ fontFamily:'Inter,sans-serif', fontSize:'0.9px', letterSpacing:'0.05em', fill:'rgba(212,167,95,0.4)' }}>MAASAI MARA</text>
      </svg>

      {/* Right content */}
      <div style={{ position:'relative', zIndex:10, marginLeft:'auto', padding:'clamp(60px,8vh,100px) clamp(20px,6vw,60px)', maxWidth:480, width:'100%' }}>
        <div className="ei" style={{ opacity:0, transform:'translateY(24px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', fontSize:7, letterSpacing:'0.22em', color:'rgba(212,167,95,0.5)', textTransform:'uppercase', marginBottom:14 }}>Our Home</div>
        <h2 className="ei" style={{ opacity:0, transform:'translateY(30px)', transition:'all 0.9s cubic-bezier(0.25,1,0.5,1)', fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(36px,6vw,64px)', fontWeight:200, color:'#F2E6D0', lineHeight:0.92, marginBottom:22 }}>
          Rooted in<br /><em style={{ color:'#D4A75F', fontStyle:'italic' }}>Kenya.</em>
        </h2>
        <div className="ei" style={{ opacity:0, transform:'translateY(20px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', width:36, height:'0.5px', background:'linear-gradient(90deg,#D4A75F,transparent)', marginBottom:20 }} />
        <p className="ei" style={{ opacity:0, transform:'translateY(20px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', fontSize:'clamp(12px,1.5vw,14px)', lineHeight:1.8, color:'rgba(242,230,208,0.45)', marginBottom:28 }}>
          From the vast savannahs of the Maasai Mara to the foot of Kilimanjaro. We take you to the most iconic and untouched places on earth.
        </p>
        <div className="ei" style={{ opacity:0, transform:'translateY(20px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', display:'flex', flexDirection:'column', gap:8, marginBottom:28 }}>
          {[['Earth',false],['Africa',false],['Kenya',true],['Maasai Mara',false]].map(([l,a]) => (
            <div key={l as string} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:5, height:5, borderRadius:'50%', background:a?'#D4A75F':'rgba(212,167,95,0.2)', boxShadow:a?'0 0 8px rgba(212,167,95,0.6)':'none', flexShrink:0 }} />
              <span style={{ fontSize:8, letterSpacing:'0.16em', color:a?'rgba(212,167,95,0.8)':'rgba(242,230,208,0.2)', textTransform:'uppercase' }}>{l as string}</span>
            </div>
          ))}
        </div>
        <div className="ei" style={{ opacity:0, transform:'translateY(20px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
          <span style={{ fontSize:8, letterSpacing:'0.22em', color:'rgba(212,167,95,0.5)', textTransform:'uppercase' }}>Begin Journey</span>
          <div style={{ height:'0.5px', width:32, background:'rgba(212,167,95,0.4)' }} />
        </div>
      </div>

      <style>{`
        @keyframes earthKen{0%{transform:scale(1)}100%{transform:scale(1.04) translate(-0.5%,0.5%)}}
        @keyframes kenyaDraw{to{strokeDashoffset:0}}
        @keyframes kenyaBreath{0%,100%{fill:rgba(212,167,95,0.04);stroke:rgba(212,167,95,0.35)}50%{fill:rgba(212,167,95,0.12);stroke:rgba(212,167,95,0.75)}}
        @keyframes glassPill{0%{strokeDashoffset:0;stroke:rgba(255,248,180,0)}5%{stroke:rgba(255,248,180,0.9)}88%{stroke:rgba(212,167,95,0.5)}100%{strokeDashoffset:-40;stroke:rgba(255,248,180,0)}}
        @keyframes nairobiRing{0%{r:0.5;opacity:0.7}100%{r:1.8;opacity:0}}
        @keyframes coreGlow{0%,100%{r:0.25;opacity:1}50%{r:0.35;opacity:0.7}}
        @keyframes maraPulse{0%,100%{opacity:0.4;r:0.2}50%{opacity:0.9;r:0.35}}
        @keyframes calloutDraw{from{strokeDashoffset:2}to{strokeDashoffset:0}}
      `}</style>
    </section>
  )
}
