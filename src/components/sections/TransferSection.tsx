'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const STEPS = [
  {
    icon: 'M12 2L8 6H4v2l2 1-1 3h14l-1-3 2-1V6h-4L12 2z M5 13l-1 4h16l-1-4 M8 19a2 2 0 100 4 2 2 0 000-4z M16 19a2 2 0 100 4 2 2 0 000-4z',
    labelKey: 'tr_step1', subKey: 'tr_step1_sub', carX: 0.06,
  },
  {
    icon: 'M3 12h18 M12 3v18',
    labelKey: 'tr_step2', subKey: 'tr_step2_sub', carX: 0.42,
  },
  {
    icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',
    labelKey: 'tr_step3', subKey: 'tr_step3_sub', carX: 0.82,
  },
  {
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z',
    labelKey: 'tr_step4', subKey: 'tr_step4_sub', carX: 1.0,
  },
] as const

export function TransferSection() {
  const { t } = useLang()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const carPosRef = useRef(0.06)
  const frameRef = useRef(0)
  const rafRef = useRef<number>(0)
  const roadOffsetRef = useRef(0)

  useEffect(() => {
    const iv = setInterval(() => {
      const next = (activeRef.current + 1) % 4
      activeRef.current = next
      setActive(next)
      carPosRef.current = STEPS[next].carX
    }, 3200)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      frameRef.current++
      const f = frameRef.current
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight

      ctx.clearRect(0, 0, W, H)

      // Sky
      ctx.fillStyle = '#080503'
      ctx.fillRect(0, 0, W, H * 0.58)

      // Stars
      const stars = [[0.07,0.1],[0.18,0.25],[0.3,0.08],[0.42,0.32],[0.55,0.14],[0.67,0.28],[0.78,0.06],[0.88,0.22],[0.95,0.15]]
      stars.forEach(([sx, sy]) => {
        const tw = Math.sin(f * 0.04 + sx * 10) * 0.35 + 0.45
        ctx.fillStyle = `rgba(242,230,208,${tw})`
        ctx.fillRect(sx * W, sy * H * 0.5, 1.2, 1.2)
      })

      // Moon
      ctx.beginPath(); ctx.arc(W * 0.84, H * 0.15, 14, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(242,230,208,0.09)'; ctx.fill()
      ctx.beginPath(); ctx.arc(W * 0.84 + 5, H * 0.15 - 3, 12, 0, Math.PI * 2)
      ctx.fillStyle = '#080503'; ctx.fill()

      // Ocean
      for (let i = 0; i < 3; i++) {
        const oy = H * 0.48 + i * 5
        const sh = Math.sin(f * 0.025 + i) * 0.5 + 0.5
        ctx.fillStyle = `rgba(15,35,50,${0.4 + sh * 0.15})`
        ctx.fillRect(0, oy, W, 4)
      }

      // Road
      const ry = H * 0.63
      const rh = H * 0.27
      const midY = ry + rh / 2

      ctx.fillStyle = '#141008'
      ctx.beginPath()
      ctx.moveTo(0, ry); ctx.lineTo(W, ry - 8)
      ctx.lineTo(W, ry + rh); ctx.lineTo(0, ry + rh + 8)
      ctx.fill()

      ctx.strokeStyle = 'rgba(212,167,95,0.12)'; ctx.lineWidth = 0.5
      ctx.beginPath(); ctx.moveTo(0, ry); ctx.lineTo(W, ry - 8); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, ry + rh + 8); ctx.lineTo(W, ry + rh); ctx.stroke()

      // Road dashes
      roadOffsetRef.current = (roadOffsetRef.current + 1.5) % 60
      ctx.strokeStyle = 'rgba(212,167,95,0.2)'; ctx.lineWidth = 1
      ctx.setLineDash([18, 38]); ctx.lineDashOffset = -roadOffsetRef.current
      ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(W, midY - 4); ctx.stroke()
      ctx.setLineDash([])

      // Acacia trees
      ;[0.12, 0.32, 0.58, 0.82].forEach(tx => {
        const tx2 = tx * W, ty = ry - 6
        ctx.fillStyle = 'rgba(12,8,2,0.9)'
        ctx.fillRect(tx2 - 1.5, ty - 20, 3, 20)
        ctx.beginPath(); ctx.ellipse(tx2, ty - 24, 18, 9, 0, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(10,7,2,0.95)'; ctx.fill()
        ctx.beginPath(); ctx.ellipse(tx2 + 10, ty - 19, 11, 6, 0, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(14,9,3,0.9)'; ctx.fill()
      })

      // Car
      const target = STEPS[activeRef.current].carX
      carPosRef.current += (target - carPosRef.current) * 0.03
      const cx = carPosRef.current * W
      const cy = midY - 16
      const cw = 52, ch = 22

      // Headlight glow
      const hg = ctx.createRadialGradient(cx + cw / 2 + 20, cy + ch / 2, 0, cx + cw / 2 + 20, cy + ch / 2, 70)
      hg.addColorStop(0, 'rgba(212,167,95,0.1)'); hg.addColorStop(1, 'rgba(212,167,95,0)')
      ctx.fillStyle = hg; ctx.fillRect(cx - 10, cy - 15, cw + 90, ch + 30)

      // Body
      ctx.fillStyle = '#221805'
      ctx.beginPath(); ctx.roundRect(cx - cw/2, cy, cw, ch, 5); ctx.fill()
      ctx.strokeStyle = 'rgba(212,167,95,0.25)'; ctx.lineWidth = 0.5; ctx.stroke()

      // Roof
      ctx.fillStyle = '#16100.4'
      ctx.beginPath(); ctx.roundRect(cx - cw/2 + 7, cy - ch * 0.55, cw - 14, ch * 0.62, 4)
      ctx.fillStyle = '#160f04'; ctx.fill()

      // Windows
      ctx.fillStyle = 'rgba(30,45,60,0.6)'
      ctx.beginPath(); ctx.roundRect(cx - cw/2 + 10, cy - ch * 0.5 + 2, cw - 24, ch * 0.45, 2); ctx.fill()

      // Wheels
      ;[cx - cw/2 + 9, cx + cw/2 - 9].forEach(wx => {
        ctx.beginPath(); ctx.arc(wx, cy + ch, 8, 0, Math.PI * 2)
        ctx.fillStyle = '#080500'; ctx.fill()
        ctx.strokeStyle = 'rgba(212,167,95,0.18)'; ctx.lineWidth = 0.5; ctx.stroke()
        ctx.beginPath(); ctx.arc(wx, cy + ch, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(212,167,95,0.25)'; ctx.fill()
      })

      // Headlights
      ctx.fillStyle = 'rgba(248,220,100,0.85)'
      ctx.fillRect(cx + cw/2 - 3, cy + 5, 6, 5)
      ctx.beginPath()
      ctx.moveTo(cx + cw/2 + 3, cy + 5)
      ctx.lineTo(cx + cw/2 + 50, cy - 1)
      ctx.lineTo(cx + cw/2 + 50, cy + 14)
      ctx.closePath()
      ctx.fillStyle = 'rgba(248,220,100,0.04)'; ctx.fill()

      // Tail lights
      ctx.fillStyle = 'rgba(160,50,10,0.7)'
      ctx.fillRect(cx - cw/2 - 3, cy + 5, 4, 5)

      // Destination pulse
      const dp = STEPS[activeRef.current].carX
      if (dp > 0.15 && dp < 0.9) {
        const dx2 = dp * W
        const pulse = Math.sin(f * 0.1) * 0.5 + 0.5
        ctx.beginPath(); ctx.arc(dx2, midY - 4, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(212,167,95,0.5)'; ctx.fill()
        ctx.beginPath(); ctx.arc(dx2, midY - 4, 7 + pulse * 5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(212,167,95,${0.12 + pulse * 0.12})`; ctx.lineWidth = 0.5; ctx.stroke()
      }
    }
    draw()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const stepMessages = [
    { eyebrow: t('tr_step1_eye'), text: t('tr_step1_msg'), sub: t('tr_step1_desc') },
    { eyebrow: t('tr_step2_eye'), text: t('tr_step2_msg'), sub: t('tr_step2_desc') },
    { eyebrow: t('tr_step3_eye'), text: t('tr_step3_msg'), sub: t('tr_step3_desc') },
    { eyebrow: t('tr_step4_eye'), text: t('tr_step4_msg'), sub: t('tr_step4_desc') },
  ]

  return (
    <section id="transfer" style={{ background:'#050505', padding:'clamp(60px,8vh,100px) 0', overflow:'hidden' }}>

      {/* Header */}
      <div style={{ textAlign:'center', padding:'0 clamp(20px,5vw,48px)', marginBottom:'clamp(40px,6vh,56px)' }}>
        <div style={{ fontSize:7, letterSpacing:'0.22em', color:'rgba(212,167,95,0.4)', textTransform:'uppercase', marginBottom:14 }}>{t('tr_label')}</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(32px,5vw,52px)', fontWeight:200, color:'#F2E6D0', lineHeight:0.92 }}>
          {t('tr_title')}<br /><em style={{ color:'#D4A75F', fontStyle:'italic' }}>{t('tr_title_em')}</em>
        </h2>
      </div>

      {/* Steps */}
      <div style={{ display:'flex', maxWidth:640, margin:'0 auto clamp(20px,3vh,32px)', padding:'0 clamp(12px,3vw,32px)', position:'relative', gap:'clamp(4px,1vw,8px)' }}>
        <div style={{ position:'absolute', top:20, left:'calc(clamp(16px,4vw,32px) + 28px)', right:'calc(clamp(16px,4vw,32px) + 28px)', height:'0.5px', background:'rgba(212,167,95,0.1)' }} />
        {STEPS.map((s, i) => (
          <div key={i} onClick={() => { activeRef.current = i; setActive(i) }}
            style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:10, cursor:'pointer', position:'relative', zIndex:1 }}>
            <div style={{
              width:40, height:40, borderRadius:'50%',
              background: i <= active ? 'rgba(212,167,95,0.12)' : '#0a0700',
              border: i === active ? '0.5px solid rgba(212,167,95,0.6)' : '0.5px solid rgba(212,167,95,0.15)',
              boxShadow: i === active ? '0 0 20px rgba(212,167,95,0.25)' : 'none',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.5s cubic-bezier(0.16,1,0.3,1)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke={i === active ? '#D4A75F' : 'rgba(212,167,95,0.3)'}
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
            </div>
            <div style={{ fontSize:'clamp(8px,2.2vw,10px)', letterSpacing:'0.08em', color: i === active ? 'rgba(212,167,95,0.7)' : 'rgba(242,230,208,0.2)', textTransform:'uppercase', textAlign:'center', lineHeight:1.4, transition:'color 0.5s' }}>{t(s.labelKey)}</div>
            <div style={{ fontSize:'clamp(7px,1.2vw,9px)', color: i === active ? 'rgba(242,230,208,0.35)' : 'rgba(242,230,208,0.12)', letterSpacing:'0.06em', textAlign:'center', transition:'color 0.5s' }}>{t(s.subKey)}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ width:'min(400px,80vw)', margin:'0 auto clamp(20px,3vh,28px)', height:1, background:'rgba(212,167,95,0.08)', borderRadius:1 }}>
        <div style={{ height:'100%', background:'rgba(212,167,95,0.45)', borderRadius:1, width:`${(active+1)/4*100}%`, transition:'width 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
      </div>

      {/* Canvas */}
      <div style={{ padding:'0 clamp(16px,4vw,48px)', marginBottom:'clamp(20px,4vh,32px)' }}>
        <canvas ref={canvasRef} style={{ width:'100%', height:'clamp(160px,40vw,190px)', display:'block', borderRadius:12 }} />
      </div>

      {/* Message */}
      <div style={{ textAlign:'center', padding:'0 clamp(16px,5vw,48px)', minHeight:72 }}>
        <div style={{ fontSize:7, letterSpacing:'0.2em', color:'rgba(212,167,95,0.4)', textTransform:'uppercase', marginBottom:10 }}>
          {stepMessages[active].eyebrow}
        </div>
        <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(20px,5vw,30px)', fontWeight:200, color:'#F2E6D0', lineHeight:1.2, marginBottom:10 }}>
          {stepMessages[active].text}
        </div>
        <div style={{ fontSize:'clamp(11px,3vw,13px)', color:'rgba(242,230,208,0.28)', lineHeight:1.7, maxWidth:440, margin:'0 auto' }}>
          {stepMessages[active].sub}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign:'center', marginTop:'clamp(28px,4vh,40px)', padding:'0 clamp(20px,5vw,48px)' }}>
        <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" style={{
          display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
          fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase',
          color:'#050505', background:'#D4A75F',
          padding:'14px 32px', borderRadius:100, textDecoration:'none',
          width:'min(320px,100%)', minHeight:48,
        }}>{t('tr_cta')} →</a>
      </div>

      <style>{`
        @media(max-width:768px){
          #transfer .step-icon { width:36px!important; height:36px!important; }
          #transfer .step-text { font-size:8px!important; }
          #transfer .step-sub-text { display:none; }
          #transfer .msg-title { font-size:clamp(18px,5vw,24px)!important; }
          #transfer .msg-desc { font-size:11px!important; }
          #transfer canvas { border-radius:8px!important; }
        }
        @media(max-width:400px){
          #transfer .step-icon { width:32px!important; height:32px!important; }
        }
      `}</style>
    </section>
  )
}
