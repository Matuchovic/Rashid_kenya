'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { ContactMenu } from '@/components/ui/ContactMenu'

const STEPS = [
  { icon: 'M12 2L8 6H4v2l2 1-1 3h14l-1-3 2-1V6h-4L12 2z M5 13l-1 4h16l-1-4 M8 19a2 2 0 100 4 2 2 0 000-4z M16 19a2 2 0 100 4 2 2 0 000-4z', labelKey: 'tr_step1', subKey: 'tr_step1_sub', carX: 0.06 },
  { icon: 'M3 12h18 M12 3v18', labelKey: 'tr_step2', subKey: 'tr_step2_sub', carX: 0.42 },
  { icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10', labelKey: 'tr_step3', subKey: 'tr_step3_sub', carX: 0.82 },
  { icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z', labelKey: 'tr_step4', subKey: 'tr_step4_sub', carX: 1.0 },
] as const

const SMOKE_WORDS = [
  'Welcome','Rashid','Jambo','No Worries','Bez starostí',
  'Keine Sorgen','Hakuna Matata','Bez zmartwień',
  'Nessun Problema','Sin Preocupaciones','Karibu','Maisha Mazuri',
]

type SmokeWord = { x:number; y:number; vx:number; vy:number; life:number; sz:number; rot:number; vrot:number }

export function TransferSection() {
  const { t } = useLang()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const carPosRef = useRef(0.06)
  const frameRef = useRef(0)
  const rafRef = useRef<number>(0)
  const roadOffsetRef = useRef(0)
  const smokeRef = useRef<SmokeWord[]>([])
  const shootRef = useRef<{x:number;y:number;vx:number;vy:number;life:number}[]>([])
  const dustRef = useRef<{x:number;y:number;vx:number;vy:number;life:number;sz:number}[]>([])
  const ffRef = useRef<{x:number;y:number;vx:number;vy:number;life:number;ph:number}[]>([])
  const shootTimerRef = useRef(60)

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
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    // Init smoke words
    for (let i = 0; i < SMOKE_WORDS.length; i++) {
      smokeRef.current.push({
        x: (i / SMOKE_WORDS.length) * 1600 + Math.random() * 100,
        y: 20 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(0.22 + Math.random() * 0.28),
        life: Math.random() * 0.85,
        sz: 9 + Math.random() * 14,
        rot: (Math.random() - 0.5) * 0.15,
        vrot: (Math.random() - 0.5) * 0.003,
      })
    }

    const STARS = Array.from({length: 18}, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 200,
      ph: Math.random() * Math.PI * 2
    }))

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
      const t2 = f * 0.022

      ctx.clearRect(0, 0, W, H)

      // SKY
      const skyG = ctx.createLinearGradient(0, 0, 0, H * 0.62)
      skyG.addColorStop(0, '#03020a')
      skyG.addColorStop(1, '#0d0804')
      ctx.fillStyle = skyG
      ctx.fillRect(0, 0, W, H * 0.62)

      // Horizon glow
      const hg = ctx.createLinearGradient(0, H * 0.44, 0, H * 0.62)
      hg.addColorStop(0, 'rgba(70,35,5,0)')
      hg.addColorStop(1, 'rgba(70,35,5,.4)')
      ctx.fillStyle = hg
      ctx.fillRect(0, H * 0.44, W, H * 0.18)

      // SMOKE WORDS — kouřový efekt
      const smoke = smokeRef.current
      for (let i = 0; i < smoke.length; i++) {
        const st = smoke[i]
        st.x += st.vx + Math.sin(st.life * 2.8 + i * 0.7) * 0.15
        st.y += st.vy
        st.rot += st.vrot
        st.life += 0.0016

        if (st.life >= 1 || st.y < -40 || st.x < -220 || st.x > W + 220) {
          smoke[i] = {
            x: Math.random() * W,
            y: H * 0.52 + Math.random() * 30,
            vx: (Math.random() - 0.5) * 0.18,
            vy: -(0.22 + Math.random() * 0.28),
            life: 0,
            sz: 9 + Math.random() * 14,
            rot: (Math.random() - 0.5) * 0.15,
            vrot: (Math.random() - 0.5) * 0.003,
          }
          continue
        }

        let env: number
        if (st.life < 0.2) env = st.life / 0.2
        else if (st.life < 0.75) env = 1
        else env = (1 - st.life) / 0.25

        const szFactor = 1 - (st.sz - 9) / 18
        const alpha = env * (0.05 + szFactor * 0.09)
        if (alpha < 0.005) continue

        const word = SMOKE_WORDS[i % SMOKE_WORDS.length]
        const isAr = word.charCodeAt(0) >= 0x0600 && word.charCodeAt(0) <= 0x06FF
        const fs = isAr ? st.sz * 1.3 : st.sz

        ctx.save()
        ctx.translate(st.x, st.y)
        ctx.rotate(st.rot)

        // 3 vrstvy — blur simulace přes opacity vrstvy
        ctx.font = '200 ' + (fs * 1.8) + 'px Cormorant Garamond, Georgia, serif'
        ctx.fillStyle = 'rgba(212,167,95,' + (alpha * 0.25) + ')'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(word, 0, 0)

        ctx.font = '200 ' + (fs * 1.2) + 'px Cormorant Garamond, Georgia, serif'
        ctx.fillStyle = 'rgba(212,167,95,' + (alpha * 0.5) + ')'
        ctx.fillText(word, 0, 0)

        ctx.font = '200 ' + fs + 'px Cormorant Garamond, Georgia, serif'
        ctx.fillStyle = 'rgba(248,224,140,' + alpha + ')'
        ctx.fillText(word, 0, 0)

        ctx.restore()
      }

      // STARS
      for (let i = 0; i < STARS.length; i++) {
        const s = STARS[i]
        const b = Math.sin(f * 0.04 + s.ph) * 0.35 + 0.55
        ctx.fillStyle = 'rgba(255,245,210,' + b + ')'
        ctx.fillRect(s.x % W, s.y, 1.3, 1.3)
      }

      // SHOOTING STARS
      shootTimerRef.current--
      if (shootTimerRef.current < 0) {
        shootTimerRef.current = 80 + Math.random() * 120
        shootRef.current.push({ x: Math.random() * W * 0.7, y: Math.random() * H * 0.28, vx: 2.8 + Math.random() * 2, vy: 0.7 + Math.random() * 0.5, life: 1 })
      }
      const shoots = shootRef.current
      for (let i = shoots.length - 1; i >= 0; i--) {
        const ss = shoots[i]
        const sl = 18 * ss.life
        ctx.beginPath(); ctx.moveTo(ss.x, ss.y); ctx.lineTo(ss.x - sl, ss.y - sl * 0.4)
        ctx.strokeStyle = 'rgba(255,245,180,' + (ss.life * 0.8) + ')'
        ctx.lineWidth = 1.2; ctx.stroke()
        ctx.beginPath(); ctx.arc(ss.x, ss.y, 1.4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,245,180,' + ss.life + ')'; ctx.fill()
        ss.x += ss.vx; ss.y += ss.vy; ss.life -= 0.038
        if (ss.life <= 0) shoots.splice(i, 1)
      }

      // MOON
      ctx.beginPath(); ctx.arc(W * 0.84, H * 0.13, 11, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,248,220,.1)'; ctx.fill()
      ctx.beginPath(); ctx.arc(W * 0.84 + 4, H * 0.13 - 2, 9.5, 0, Math.PI * 2)
      ctx.fillStyle = '#03020a'; ctx.fill()

      // KILIMANJARO
      ctx.beginPath()
      ctx.moveTo(W * 0.08, H * 0.58)
      ctx.lineTo(W * 0.22, H * 0.27); ctx.lineTo(W * 0.28, H * 0.34)
      ctx.lineTo(W * 0.35, H * 0.15); ctx.lineTo(W * 0.42, H * 0.33)
      ctx.lineTo(W * 0.5, H * 0.27); ctx.lineTo(W * 0.62, H * 0.58)
      ctx.fillStyle = 'rgba(10,6,2,.98)'; ctx.fill()
      ctx.strokeStyle = 'rgba(212,167,95,.1)'; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(W * 0.32, H * 0.19); ctx.lineTo(W * 0.35, H * 0.15)
      ctx.lineTo(W * 0.38, H * 0.19); ctx.lineTo(W * 0.35, H * 0.21)
      ctx.fillStyle = 'rgba(255,248,220,.14)'; ctx.fill()

      // OCEAN
      for (let i = 0; i < 4; i++) {
        const sh = Math.sin(f * 0.025 + i) * 0.5 + 0.5
        ctx.fillStyle = 'rgba(8,24,42,' + (0.45 + sh * 0.15) + ')'
        ctx.fillRect(0, H * 0.47 + i * 4, W, 4)
      }

      // ROAD
      const ry = H * 0.63
      const rh = H * 0.27
      const midY = ry + rh / 2

      ctx.fillStyle = '#100c06'
      ctx.beginPath()
      ctx.moveTo(0, ry); ctx.lineTo(W, ry - 8)
      ctx.lineTo(W, ry + rh); ctx.lineTo(0, ry + rh + 8)
      ctx.fill()

      // Wet road reflection
      const wetG = ctx.createLinearGradient(0, midY - 4, 0, midY + 12)
      wetG.addColorStop(0, 'rgba(212,167,95,.02)')
      wetG.addColorStop(0.5, 'rgba(212,167,95,.09)')
      wetG.addColorStop(1, 'rgba(212,167,95,0)')
      ctx.fillStyle = wetG; ctx.fillRect(0, midY - 4, W, 16)

      // GPS track
      const carPx = carPosRef.current * W
      ctx.beginPath(); ctx.setLineDash([4, 6])
      ctx.strokeStyle = 'rgba(212,167,95,.2)'; ctx.lineWidth = 0.7
      ctx.moveTo(carPx + 32, midY); ctx.lineTo(W * 0.92, midY - 2)
      ctx.stroke(); ctx.setLineDash([])

      // Road edges
      ctx.strokeStyle = 'rgba(212,167,95,.1)'; ctx.lineWidth = 0.4
      ctx.beginPath(); ctx.moveTo(0, ry); ctx.lineTo(W, ry - 8); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, ry + rh + 8); ctx.lineTo(W, ry + rh); ctx.stroke()

      // Road dashes
      roadOffsetRef.current = (roadOffsetRef.current + 1.5) % 60
      ctx.strokeStyle = 'rgba(212,167,95,.18)'; ctx.lineWidth = 0.9
      ctx.setLineDash([18, 38]); ctx.lineDashOffset = -roadOffsetRef.current
      ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(W, midY - 4)
      ctx.stroke(); ctx.setLineDash([])

      // ACACIA TREES
      const treePositions = [0.1, 0.28, 0.54, 0.78]
      for (let ti = 0; ti < treePositions.length; ti++) {
        const ax = treePositions[ti] * W
        const ay = ry - 6
        ctx.fillStyle = 'rgba(212,167,95,.4)'; ctx.fillRect(ax - 1.5, ay - 22, 3, 22)
        ctx.beginPath(); ctx.ellipse(ax, ay - 26, 16, 8, 0, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(10,7,2,.96)'; ctx.fill()
        ctx.beginPath(); ctx.ellipse(ax + 9, ay - 20, 10, 5.5, 0, 0, Math.PI * 2); ctx.fill()
      }

      // HOTEL (steps 2-3)
      if (activeRef.current >= 2) {
        const hx = W * 0.87
        ctx.fillStyle = 'rgba(212,167,95,.2)'
        ctx.fillRect(hx, ry - 34, 22, 34)
        ctx.fillRect(hx + 3, ry - 42, 16, 10)
        const winPos: [number, number][] = [[hx + 2, ry - 30], [hx + 8, ry - 30], [hx + 14, ry - 30], [hx + 2, ry - 22], [hx + 8, ry - 22], [hx + 14, ry - 22]]
        for (let wi = 0; wi < winPos.length; wi++) {
          const gl = Math.sin(f * 0.04 + winPos[wi][0]) * 0.2 + 0.5
          ctx.fillStyle = 'rgba(255,200,80,' + (gl * 0.6) + ')'
          ctx.fillRect(winPos[wi][0], winPos[wi][1], 3, 3)
        }
      }

      // FIREFLIES
      const ff = ffRef.current
      if (f % 16 === 0 && ff.length < 14) {
        ff.push({ x: Math.random() * W, y: ry + Math.random() * (H - ry) * 0.85, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.35, life: 1, ph: Math.random() * Math.PI * 2 })
      }
      for (let i = ff.length - 1; i >= 0; i--) {
        const p = ff[i]
        p.x += p.vx; p.y += p.vy; p.ph += 0.09; p.life -= 0.003
        const g = Math.sin(p.ph) * 0.5 + 0.5
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,245,80,' + (g * p.life * 0.9) + ')'; ctx.fill()
        if (g > 0.75) {
          ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255,245,80,' + (g * p.life * 0.12) + ')'; ctx.fill()
        }
        if (p.life <= 0) ff.splice(i, 1)
      }

      // DUST
      const cx = carPosRef.current * W
      const bobY = Math.sin(t2 * 2.5) * 1.8
      const cy = midY - 16 + bobY
      const dust = dustRef.current
      if (f % 2 === 0) {
        dust.push({ x: cx - 26, y: cy + 16, vx: -(Math.random() * 2 + 0.4), vy: -(Math.random() * 0.7 - 0.1), life: 1, sz: Math.random() * 4 + 2 })
        dust.push({ x: cx - 22, y: cy + 18, vx: -(Math.random() * 1.5 + 0.2), vy: Math.random() * 0.4, life: 0.7, sz: Math.random() * 3 + 1 })
      }
      for (let i = dust.length - 1; i >= 0; i--) {
        const d = dust[i]
        ctx.beginPath(); ctx.arc(d.x, d.y, d.sz * d.life, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(150,100,25,' + (d.life * 0.2) + ')'; ctx.fill()
        d.x += d.vx; d.y += d.vy; d.vy += 0.035; d.life -= 0.045
        if (d.life <= 0) dust.splice(i, 1)
      }

      // DESTINATION PULSE
      const dp = STEPS[activeRef.current].carX
      if (dp > 0.15 && dp < 0.92) {
        const dx2 = dp * W
        const pulse = Math.sin(f * 0.1) * 0.5 + 0.5
        ctx.beginPath(); ctx.arc(dx2, midY - 4, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(212,167,95,.6)'; ctx.fill()
        ctx.beginPath(); ctx.arc(dx2, midY - 4, 7 + pulse * 5, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(212,167,95,' + (0.12 + pulse * 0.14) + ')'
        ctx.lineWidth = 0.6; ctx.stroke()
      }

      // CAR — Land Cruiser
      const target = STEPS[activeRef.current].carX
      carPosRef.current += (target - carPosRef.current) * 0.03
      const cw = 54, ch = 22

      // Headlight beam
      const beamG = ctx.createRadialGradient(cx + 40, cy + ch / 2, 0, cx + 40, cy + ch / 2, 90)
      beamG.addColorStop(0, 'rgba(255,235,120,.12)'); beamG.addColorStop(1, 'rgba(255,235,120,0)')
      ctx.fillStyle = beamG; ctx.fillRect(cx + cw / 2 - 5, cy - 20, 110, ch + 40)
      ctx.beginPath()
      ctx.moveTo(cx + cw / 2 + 2, cy + 3); ctx.lineTo(cx + cw / 2 + 90, cy - 8)
      ctx.lineTo(cx + cw / 2 + 90, cy + ch + 2); ctx.closePath()
      ctx.fillStyle = 'rgba(255,235,120,.04)'; ctx.fill()

      // Body
      ctx.fillStyle = '#1e1609'
      ctx.beginPath()
      ctx.moveTo(cx - cw / 2, cy + ch)
      ctx.lineTo(cx - cw / 2, cy + 6)
      ctx.lineTo(cx - cw / 2 + 6, cy + 2)
      ctx.lineTo(cx - cw / 2 + 10, cy - ch * 0.5)
      ctx.lineTo(cx - cw / 2 + 18, cy - ch * 0.65)
      ctx.lineTo(cx + cw / 2 - 12, cy - ch * 0.65)
      ctx.lineTo(cx + cw / 2 - 4, cy - ch * 0.4)
      ctx.lineTo(cx + cw / 2 + 2, cy)
      ctx.lineTo(cx + cw / 2 + 4, cy + ch)
      ctx.closePath()
      ctx.fill()
      ctx.strokeStyle = 'rgba(212,167,95,.22)'; ctx.lineWidth = 0.5; ctx.stroke()

      // Roof rack
      ctx.fillStyle = 'rgba(212,167,95,.18)'
      ctx.fillRect(cx - cw / 2 + 14, cy - ch * 0.7, cw - 22, 2.5)
      for (let r = 0; r < 5; r++) {
        ctx.fillStyle = 'rgba(212,167,95,.12)'
        ctx.fillRect(cx - cw / 2 + 16 + r * 6, cy - ch * 0.72, 1.5, 2.5)
      }

      // Window
      ctx.fillStyle = 'rgba(12,28,48,.8)'
      ctx.beginPath()
      ctx.moveTo(cx - cw / 2 + 12, cy - ch * 0.58)
      ctx.lineTo(cx + cw / 2 - 14, cy - ch * 0.58)
      ctx.lineTo(cx + cw / 2 - 10, cy - ch * 0.25)
      ctx.lineTo(cx - cw / 2 + 11, cy - ch * 0.25)
      ctx.closePath(); ctx.fill()

      // Headlights
      ctx.fillStyle = 'rgba(255,242,200,.95)'; ctx.fillRect(cx + cw / 2 - 1, cy + 3, 7, 5)
      ctx.fillStyle = 'rgba(180,210,255,.6)'; ctx.fillRect(cx + cw / 2 - 1, cy + 1, 4, 2)

      // Tail lights
      ctx.fillStyle = 'rgba(200,40,10,.9)'; ctx.fillRect(cx - cw / 2 - 4, cy + 3, 4, 6)
      const rearG = ctx.createRadialGradient(cx - cw / 2 - 2, cy + 6, 0, cx - cw / 2 - 2, cy + 6, 12)
      rearG.addColorStop(0, 'rgba(200,40,10,.3)'); rearG.addColorStop(1, 'rgba(200,40,10,0)')
      ctx.fillStyle = rearG; ctx.fillRect(cx - cw / 2 - 14, cy - 2, 16, 16)

      // Wheels
      const rot = frameRef.current * 0.16
      const wheelPositions = [cx - cw / 2 + 10, cx + cw / 2 - 10]
      for (let wi = 0; wi < wheelPositions.length; wi++) {
        const wx = wheelPositions[wi]
        ctx.beginPath(); ctx.arc(wx, cy + ch, 8.5, 0, Math.PI * 2)
        ctx.fillStyle = '#070502'; ctx.fill()
        ctx.strokeStyle = 'rgba(212,167,95,.15)'; ctx.lineWidth = 0.5; ctx.stroke()
        ctx.beginPath(); ctx.arc(wx, cy + ch, 5.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(212,167,95,.12)'; ctx.fill()
        for (let s = 0; s < 6; s++) {
          const sa = rot + s * Math.PI / 3
          ctx.beginPath()
          ctx.moveTo(wx + Math.cos(sa) * 2, cy + ch + Math.sin(sa) * 2)
          ctx.lineTo(wx + Math.cos(sa) * 5, cy + ch + Math.sin(sa) * 5)
          ctx.strokeStyle = 'rgba(212,167,95,.3)'; ctx.lineWidth = 1.2; ctx.stroke()
        }
        ctx.beginPath(); ctx.arc(wx, cy + ch, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(212,167,95,.35)'; ctx.fill()
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
      <div style={{ textAlign:'center', padding:'0 clamp(20px,5vw,48px)', marginBottom:'clamp(40px,6vh,56px)' }}>
        <div style={{ fontSize:7, letterSpacing:'0.22em', color:'rgba(212,167,95,0.4)', textTransform:'uppercase', marginBottom:14 }}>{t('tr_label')}</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(32px,5vw,52px)', fontWeight:200, color:'#F2E6D0', lineHeight:0.92 }}>
          {t('tr_title')}<br /><em style={{ color:'#D4A75F', fontStyle:'italic' }}>{t('tr_title_em')}</em>
        </h2>
      </div>

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

      <div style={{ width:'min(400px,80vw)', margin:'0 auto clamp(20px,3vh,28px)', height:1, background:'rgba(212,167,95,0.08)', borderRadius:1 }}>
        <div style={{ height:'100%', background:'rgba(212,167,95,0.45)', borderRadius:1, width:`${(active+1)/4*100}%`, transition:'width 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
      </div>

      <div style={{ padding:'0 clamp(16px,4vw,48px)', marginBottom:'clamp(20px,4vh,32px)' }}>
        <canvas ref={canvasRef} style={{ width:'100%', height:'clamp(160px,40vw,200px)', display:'block', borderRadius:12 }} />
      </div>

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

      <div style={{ textAlign:'center', marginTop:'clamp(28px,4vh,40px)', padding:'0 clamp(20px,5vw,48px)' }}>
        <ContactMenu>
          <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'#050505', background:'#D4A75F', padding:'14px 32px', borderRadius:100, cursor:'pointer', width:'min(320px,100%)', minHeight:48 }}>
            {t('tr_cta')} →
          </div>
        </ContactMenu>
      </div>
    </section>
  )
}
