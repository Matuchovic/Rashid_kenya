'use client'
import { useEffect, useState } from 'react'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [msgIdx, setMsgIdx] = useState(0)
  const msgs = ['Into the Heart of Africa...','The wild awakens...','Your journey begins...','Africa awaits...']

  useEffect(() => {
    let p = 0
    const iv = setInterval(() => {
      p += Math.random()*2+0.8
      if (p>=100) { p=100; clearInterval(iv); setTimeout(()=>{ setLeaving(true); setTimeout(onComplete,1000) },500) }
      setPct(Math.min(Math.round(p),100))
      setMsgIdx(Math.floor(Math.min(p,99)/25))
    }, 55)
    return () => clearInterval(iv)
  }, [onComplete])

  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#000', opacity:leaving?0:1, transition:leaving?'opacity 1s ease':'none', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:"url('/bigfive.jpg')", backgroundSize:'cover', backgroundPosition:'center 20%', animation:'ldrKen 9s ease-in-out infinite alternate' }} />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 90% 60% at 50% 25%,rgba(255,120,0,0.1) 0%,transparent 65%)', animation:'ldrEmber 5s ease-in-out infinite' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,0.97) 0%,rgba(0,0,0,0.7) 22%,rgba(0,0,0,0.1) 50%,rgba(0,0,0,0.4) 100%)' }} />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 75% 75% at 50% 50%,transparent 30%,rgba(0,0,0,0.75) 100%)' }} />

      <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 clamp(16px,5vw,32px)' }}>
        <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(48px,16vw,96px)', fontWeight:200, letterSpacing:'0.16em', color:'#D4A75F', textShadow:'0 0 40px rgba(212,167,95,0.6),0 0 80px rgba(212,167,95,0.3)', lineHeight:0.9, animation:'ldrGlow 3s ease-in-out infinite' }}>RASHID</div>
        <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(9px,2.5vw,14px)', fontWeight:200, letterSpacing:'0.42em', color:'rgba(212,167,95,0.55)', textTransform:'uppercase', marginTop:12 }}>Kenya Adventures</div>
        <div style={{ width:32, height:'0.5px', background:'linear-gradient(90deg,transparent,rgba(212,167,95,0.5),transparent)', margin:'14px auto' }} />
        <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(10px,2vw,13px)', fontWeight:200, fontStyle:'italic', letterSpacing:'0.1em', color:'rgba(242,230,208,0.3)' }}>Into the Heart of Africa</div>
      </div>

      <div style={{ position:'relative', zIndex:10, width:'min(480px,88vw)', marginTop:'clamp(32px,6vh,56px)', display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ width:'100%', height:'0.5px', background:'rgba(255,255,255,0.05)', position:'relative', overflow:'visible' }}>
          <div style={{ position:'absolute', top:0, left:0, height:'100%', width:pct+'%', background:'linear-gradient(90deg,transparent,#D4A75F,#F0D080,#D4A75F)', backgroundSize:'200% auto', boxShadow:'0 0 10px rgba(212,167,95,0.7),0 0 20px rgba(212,167,95,0.3)', transition:'width 0.08s ease', animation:'ldrShimmer 1.5s linear infinite' }} />
          <div style={{ position:'absolute', top:-3, height:7, width:14, borderRadius:'50%', background:'rgba(240,208,120,0.9)', boxShadow:'0 0 12px 4px rgba(212,167,95,0.8)', left:'calc('+pct+'% - 7px)', transition:'left 0.08s ease' }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontSize:'clamp(7px,1.5vw,8px)', letterSpacing:'0.14em', color:'rgba(212,167,95,0.4)', textTransform:'uppercase' }}>{msgs[Math.min(msgIdx,msgs.length-1)]}</span>
          <span style={{ fontSize:'clamp(7px,1.5vw,8px)', letterSpacing:'0.1em', color:'rgba(212,167,95,0.35)' }}>{pct}%</span>
        </div>
      </div>

      <style>{`
        @keyframes ldrKen{0%{transform:scale(1)}100%{transform:scale(1.07) translate(-1%,0.5%)}}
        @keyframes ldrEmber{0%,100%{opacity:0.6}50%{opacity:1}}
        @keyframes ldrGlow{0%,100%{text-shadow:0 0 40px rgba(212,167,95,0.6),0 0 80px rgba(212,167,95,0.3)}50%{text-shadow:0 0 60px rgba(212,167,95,0.9),0 0 120px rgba(212,167,95,0.5)}}
        @keyframes ldrShimmer{0%{background-position:200%}100%{background-position:-100%}}
        @media(max-width:768px){
          .loader-outer{height:100dvh!important;min-height:100dvh!important;}
          .loader-bg{background-position:center 18%!important;background-size:cover!important;}
        }
      `}</style>
    </div>
  )
}
