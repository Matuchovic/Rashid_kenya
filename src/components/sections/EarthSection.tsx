'use client'
import { useEffect, useRef } from 'react'

export function EarthSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current?.querySelectorAll('.ei').forEach((el,i) =>
        setTimeout(()=>{(el as HTMLElement).style.opacity='1';(el as HTMLElement).style.transform='translateY(0)'},i*180))
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const K = "M 59.32,56.47 L 60.34,57.32 L 59.55,57.43 L 59.09,56.80 L 58.23,55.77 L 57.45,57.14 L 56.50,57.97 L 56.01,57.91 L 55.51,57.30 L 54.74,56.47 L 53.79,56.47 L 52.81,55.86 L 51.85,55.37 L 51.31,56.83 L 51.31,58.92 L 51.20,60.13 L 51.52,62.38 L 52.00,63.64 L 52.20,65.88 L 51.58,66.20 L 51.40,66.38 L 55.54,70.02 L 55.53,71.10 L 55.94,71.59 L 56.16,72.56 L 57.28,72.92 L 57.99,73.25 L 58.57,71.90 L 59.09,69.50 L 60.04,67.81 L 60.34,66.92 L 60.39,63.84 L 59.78,62.42 L 59.32,56.47 Z"

  return (
    <section ref={ref} style={{ position:'relative', minHeight:'100svh', background:'#000', overflow:'hidden', display:'flex', alignItems:'center' }}>

      {/* Earth photo */}
      <div style={{ position:'absolute', inset:0, backgroundImage:"url('/img-earth-kenya.jpg')", backgroundSize:'cover', backgroundPosition:'center', animation:'earthKen 30s ease-in-out infinite alternate' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.08) 40%,rgba(0,0,0,0.6) 100%)' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent 20%,rgba(0,0,0,0.92) 100%)' }} />

      {/* Kenya SVG — přesné souřadnice z GeoJSON mapované na fotku */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}
        viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="kglow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.18" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="kglow2" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="0.4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* 1. Fill — breathing gold */}
        <path d={K} fill="rgba(212,167,95,0.06)" stroke="none"
          style={{ animation:'kBreath 4s ease-in-out 2.5s infinite' }}/>

        {/* 2. Border — draw in */}
        <path d={K} fill="none"
          stroke="rgba(212,167,95,0.7)" strokeWidth="0.18"
          filter="url(#kglow)"
          strokeDasharray="60" strokeDashoffset="60"
          style={{ animation:'kDraw 2s cubic-bezier(0.25,1,0.5,1) 0.6s forwards' }}/>

        {/* 3. Glass pill traveling border */}
        <path d={K} fill="none"
          stroke="rgba(255,248,180,0.95)" strokeWidth="0.55"
          strokeLinecap="round" strokeDasharray="4 56"
          filter="url(#kglow2)"
          style={{ animation:'kPill 3.5s cubic-bezier(0.4,0,0.2,1) 2.8s infinite' }}/>

        {/* 4. Nairobi — 54.55%, 66.82% */}
        <circle cx="54.55" cy="66.82" r="0.55" fill="rgba(212,167,95,0.25)"
          style={{ animation:'nRing 2.5s ease-out 3s infinite' }}/>
        <circle cx="54.55" cy="66.82" r="0.55" fill="rgba(212,167,95,0.15)"
          style={{ animation:'nRing 2.5s ease-out 3.4s infinite' }}/>
        <circle cx="54.55" cy="66.82" r="0.22" fill="#D4A75F" filter="url(#kglow2)"
          style={{ animation:'nCore 2.5s ease-in-out 3s infinite' }}/>

        {/* 5. Maasai Mara — 53.04%, 67.19% */}
        <circle cx="53.04" cy="67.19" r="0.16" fill="rgba(212,167,95,0.5)"
          style={{ animation:'mPulse 3s ease-in-out 3.5s infinite' }}/>

        {/* 6. Callout → KENYA label */}
        <line x1="60.4" y1="57.5" x2="63.5" y2="54.5"
          stroke="rgba(212,167,95,0.22)" strokeWidth="0.06" strokeDasharray="0.5 0.8"
          style={{ animation:'cDraw 0.5s ease 2.3s both' }}/>
        <text x="63.8" y="54.2"
          style={{ fontFamily:'Inter,sans-serif', fontSize:'1.15px', letterSpacing:'0.06em',
          fill:'rgba(212,167,95,0.8)', textTransform:'uppercase' }}>KENYA</text>

        {/* 7. City labels */}
        <text x="55.0" y="67.3"
          style={{ fontFamily:'Inter,sans-serif', fontSize:'0.75px',
          fill:'rgba(212,167,95,0.4)', letterSpacing:'0.03em' }}>Nairobi</text>
        <text x="50.8" y="68.2"
          style={{ fontFamily:'Inter,sans-serif', fontSize:'0.65px',
          fill:'rgba(212,167,95,0.3)', letterSpacing:'0.02em' }}>Maasai Mara</text>
      </svg>

      {/* Right content */}
      <div style={{ position:'relative', zIndex:10, marginLeft:'auto',
        padding:'clamp(60px,8vh,100px) clamp(20px,6vw,60px)', maxWidth:480, width:'100%' }}>

        <div className="ei" style={{ opacity:0, transform:'translateY(24px)',
          transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)',
          fontSize:7, letterSpacing:'0.22em', color:'rgba(212,167,95,0.5)',
          textTransform:'uppercase', marginBottom:14 }}>Our Home</div>

        <h2 className="ei" style={{ opacity:0, transform:'translateY(30px)',
          transition:'all 0.9s cubic-bezier(0.25,1,0.5,1)',
          fontFamily:"'Cormorant Garamond',Georgia,serif",
          fontSize:'clamp(36px,6vw,64px)', fontWeight:200,
          color:'#F2E6D0', lineHeight:0.92, marginBottom:22 }}>
          Rooted in<br /><em style={{ color:'#D4A75F', fontStyle:'italic' }}>Kenya.</em>
        </h2>

        <div className="ei" style={{ opacity:0, transform:'translateY(20px)',
          transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)',
          width:36, height:'0.5px',
          background:'linear-gradient(90deg,#D4A75F,transparent)', marginBottom:20 }} />

        <p className="ei" style={{ opacity:0, transform:'translateY(20px)',
          transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)',
          fontSize:'clamp(12px,1.5vw,14px)', lineHeight:1.8,
          color:'rgba(242,230,208,0.45)', marginBottom:28 }}>
          From the vast savannahs of the Maasai Mara to the foot of Kilimanjaro.
          We take you to the most iconic and untouched places on earth.
        </p>

        <div className="ei" style={{ opacity:0, transform:'translateY(20px)',
          transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)',
          display:'flex', flexDirection:'column', gap:8, marginBottom:28 }}>
          {([['Earth',false],['Africa',false],['Kenya',true],['Maasai Mara',false]] as [string,boolean][]).map(([l,a]) => (
            <div key={l} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:5, height:5, borderRadius:'50%', flexShrink:0,
                background:a?'#D4A75F':'rgba(212,167,95,0.2)',
                boxShadow:a?'0 0 8px rgba(212,167,95,0.6)':'none' }} />
              <span style={{ fontSize:8, letterSpacing:'0.16em', textTransform:'uppercase',
                color:a?'rgba(212,167,95,0.8)':'rgba(242,230,208,0.2)' }}>{l}</span>
            </div>
          ))}
        </div>

        <div className="ei" style={{ opacity:0, transform:'translateY(20px)',
          transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)',
          display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
          <span style={{ fontSize:8, letterSpacing:'0.22em',
            color:'rgba(212,167,95,0.5)', textTransform:'uppercase' }}>Begin Journey</span>
          <div style={{ height:'0.5px', width:32, background:'rgba(212,167,95,0.4)' }} />
        </div>
      </div>

      <style>{`
        @keyframes earthKen{0%{transform:scale(1)}100%{transform:scale(1.04) translate(-0.5%,0.5%)}}
        @keyframes kDraw{to{stroke-dashoffset:0}}
        @keyframes kBreath{0%,100%{fill:rgba(212,167,95,0.04)}50%{fill:rgba(212,167,95,0.12)}}
        @keyframes kPill{
          0%{stroke-dashoffset:0;stroke:rgba(255,248,180,0)}
          5%{stroke:rgba(255,248,180,0.95)}
          88%{stroke:rgba(212,167,95,0.5)}
          100%{stroke-dashoffset:-60;stroke:rgba(255,248,180,0)}
        }
        @keyframes nRing{0%{r:0.55;opacity:0.7}100%{r:1.6;opacity:0}}
        @keyframes nCore{0%,100%{opacity:1}50%{opacity:0.6}}
        @keyframes mPulse{0%,100%{opacity:0.4;r:0.16}50%{opacity:0.9;r:0.28}}
        @keyframes cDraw{from{opacity:0}to{opacity:1}}
      `}</style>
    </section>
  )
}
