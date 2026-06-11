'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { ContactMenu } from '@/components/ui/ContactMenu'

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

    // ═══ PARTICLES & STATE ═══
    type Particle = { x:number; y:number; vx:number; vy:number; life:number; sz:number }
    type Firefly   = { x:number; y:number; vx:number; vy:number; life:number; ph:number }
    type SmokeText = { x:number; y:number; vx:number; vy:number; life:number; sz:number; rot:number; vrot:number }
    const dustArr:  Particle[]  = []
    const ffArr:    Firefly[]   = []
    const smokeTexts: SmokeText[] = []
    const SMOKE_WORDS = [
      'Welcome','Rashidi','Jambo','No Worries','Bez starostí',
      'Keine Sorgen','لا تقلق','Hakuna Matata','Bez zmartwień',
      'Nessun Problema','Sin Preocupaciones','Karibu','Maisha Mazuri',
    ]
    // Inicializuj smoke texty — rozprostřené po nebi s různými fázemi
    // aby se všechna slova neobjevila najednou
    for(let i = 0; i < SMOKE_WORDS.length; i++) {
      const sz = 8 + Math.random() * 16
      smokeTexts.push({
        x:    (i / SMOKE_WORDS.length) * 1800 + Math.random() * 200,
        y:    20 + Math.random() * 80,
        vx:   (Math.random() - 0.5) * 0.18,
        vy:   -(0.25 + Math.random() * 0.35),
        life: Math.random() * 0.9,  // různé fáze — ne všechna najednou
        sz:   sz,
        rot:  (Math.random() - 0.5) * 0.15,
        vrot: (Math.random() - 0.5) * 0.003,
      })
    }
    const shootStars: {x:number;y:number;vx:number;vy:number;life:number}[] = []
    let shootTimer = 60
    const STARS = Array.from({length:18},()=>({
      x:Math.random()*2000, y:Math.random()*200, ph:Math.random()*Math.PI*2
    }))

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      frameRef.current++
      const f  = frameRef.current
      const W  = canvas.offsetWidth
      const H  = canvas.offsetHeight
      const t  = f * 0.022
      const step = activeRef.current
      // Parallax offset — vzdálené věci se hýbou pomaleji
      const parallax = step * W * 0.08

      ctx.clearRect(0, 0, W, H)

      // ── SKY ──
      const skyG = ctx.createLinearGradient(0,0,0,H*0.6)
      skyG.addColorStop(0, '#03020a')
      skyG.addColorStop(1, '#0d0804')
      ctx.fillStyle = skyG; ctx.fillRect(0,0,W,H*0.62)

      // Horizon warm glow
      const hg = ctx.createLinearGradient(0,H*.44,0,H*.62)
      hg.addColorStop(0,'rgba(70,35,5,0)'); hg.addColorStop(1,'rgba(70,35,5,.4)')
      ctx.fillStyle = hg; ctx.fillRect(0,H*.44,W,H*.18)

      // ── STARS (blikají) ──
      STARS.forEach(s => {
        const b = Math.sin(f*.04 + s.ph) * .35 + .55
        ctx.fillStyle = `rgba(255,245,210,${b})`
        ctx.fillRect((s.x - parallax*0.05) % W, s.y, 1.3, 1.3)
      })

      // ── HAKUNA MATATA smoke texts ──
      // ── FLOATING WORDS — cinematic smoke drift ──
      // Profesionální systém: slova stoupají jako kouř z horizontu
      // Každé slovo má unikátní trajektorii, velikost a fázi
      // Respawn slov které dokončily cyklus
      for(let i = 0; i < smokeTexts.length; i++) {
        const st = smokeTexts[i]
        // Posun
        st.x  += st.vx + Math.sin(st.life * 3.5 + i) * 0.12  // sinusový drift
        st.y  += st.vy
        st.rot += st.vrot
        st.life += 0.0018  // velmi pomalý life cycle
        // Respawn na spodku když vyletí nahoru nebo ze stran
        if (st.life >= 1 || st.y < -30 || st.x < -200 || st.x > W + 200) {
          const wi = i % SMOKE_WORDS.length
          const newSz = 8 + Math.random() * 16  // 8–24px — nikdy obří
          smokeTexts[i] = {
            x:    Math.random() * W_sm,
            y:    H * 0.52 + Math.random() * 35,
            vx:   (Math.random() - 0.5) * 0.18,
            vy:   -(0.25 + Math.random() * 0.35),  // stoupá plynule
            life: 0,
            sz:   newSz,
            rot:  (Math.random() - 0.5) * 0.15,
            vrot: (Math.random() - 0.5) * 0.003,
          }
          continue
        }
        // Opacity křivka: fade-in (0→0.25), plateau, fade-out (0.75→1)
        let t_life = st.life
        let opacity: number
        if      (t_life < 0.2)  opacity = t_life / 0.2           // fade in
        else if (t_life < 0.75) opacity = 1                       // plateau
        else                    opacity = (1 - t_life) / 0.25     // fade out
        // Velikost → průhlednost: větší text = průhledněší (splyne s pozadím)
        const sizeT   = (st.sz - 8) / 16                         // 0 pro malé, 1 pro velké
        const baseAlpha = 0.06 + (1 - sizeT) * 0.10              // 0.06–0.16
        const finalAlpha = opacity * baseAlpha
        if (finalAlpha < 0.005) continue
        // Render — pouze Cormorant Garamond, letter-spacing
        ctx.save()
        ctx.globalAlpha = finalAlpha
        ctx.translate(st.x, st.y)
        ctx.rotate(st.rot)
        const word = SMOKE_WORDS[i % SMOKE_WORDS.length]
        const isArabic = /[؀-ۿ]/.test(word)
        const fs = isArabic ? st.sz * 1.25 : st.sz
        ctx.font = `200 ${fs}px 'Cormorant Garamond', Georgia, serif`
        ctx.fillStyle = '#D4A75F'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(word, 0, 0)
        ctx.restore()
      }
      // ── SHOOTING STARS ──
      shootTimer--
      if (shootTimer < 0) {
        shootTimer = 80 + Math.random()*120
        shootStars.push({x:Math.random()*W*.7, y:Math.random()*H*.28, vx:2.8+Math.random()*2, vy:.7+Math.random()*.5, life:1})
      }
      for (let i = shootStars.length-1; i >= 0; i--) {
        const ss = shootStars[i]
        const sl = 18*ss.life
        ctx.beginPath(); ctx.moveTo(ss.x,ss.y); ctx.lineTo(ss.x-sl,ss.y-sl*.4)
        ctx.strokeStyle=`rgba(255,245,180,${ss.life*.8})`; ctx.lineWidth=1.2; ctx.stroke()
        ctx.beginPath(); ctx.arc(ss.x,ss.y,1.4,0,Math.PI*2)
        ctx.fillStyle=`rgba(255,245,180,${ss.life})`; ctx.fill()
        ss.x+=ss.vx; ss.y+=ss.vy; ss.life-=.038
        if (ss.life<=0) shootStars.splice(i,1)
      }

      // ── MOON ──
      ctx.beginPath(); ctx.arc(W*.84,H*.13,11,0,Math.PI*2)
      ctx.fillStyle='rgba(255,248,220,.1)'; ctx.fill()
      ctx.beginPath(); ctx.arc(W*.84+4,H*.13-2,9.5,0,Math.PI*2)
      ctx.fillStyle='#03020a'; ctx.fill()

      // ── KILIMANJARO silueta (parallax slow) ──
      const kx = -parallax*0.15
      ctx.save(); ctx.translate(kx,0)
      ctx.beginPath()
      ctx.moveTo(W*.08,H*.58); ctx.lineTo(W*.22,H*.27); ctx.lineTo(W*.28,H*.34)
      ctx.lineTo(W*.35,H*.15); ctx.lineTo(W*.42,H*.33); ctx.lineTo(W*.5,H*.27); ctx.lineTo(W*.62,H*.58)
      ctx.fillStyle='rgba(10,6,2,.98)'; ctx.fill()
      ctx.strokeStyle='rgba(212,167,95,.1)'; ctx.lineWidth=.5; ctx.stroke()
      // Sníh
      ctx.beginPath()
      ctx.moveTo(W*.32,H*.19); ctx.lineTo(W*.35,H*.15); ctx.lineTo(W*.38,H*.19); ctx.lineTo(W*.35,H*.21)
      ctx.fillStyle='rgba(255,248,220,.14)'; ctx.fill()
      ctx.restore()

      // ── MOMBASA MAJÁK (step 0) ──
      if (step === 0) {
        const mx = W*.88, my = H*.38
        ctx.fillStyle='rgba(212,167,95,.3)'; ctx.fillRect(mx-4,my,8,H*.22)
        ctx.fillStyle='rgba(212,167,95,.2)'; ctx.fillRect(mx-8,my+H*.2,16,4)
        // Blikající světlo
        const lb = Math.sin(f*.15)>.5 ? .9 : .1
        const lg=ctx.createRadialGradient(mx,my,0,mx,my,20)
        lg.addColorStop(0,`rgba(255,240,150,${lb*.5})`); lg.addColorStop(1,'rgba(255,240,150,0)')
        ctx.fillStyle=lg; ctx.beginPath(); ctx.arc(mx,my,20,0,Math.PI*2); ctx.fill()
        ctx.beginPath(); ctx.arc(mx,my,3,0,Math.PI*2)
        ctx.fillStyle=`rgba(255,240,150,${lb})`; ctx.fill()
      }

      // ── PALMY u Diani (step 2-3) ──
      if (step >= 2) {
        const palmOpacity = step === 2 ? .5 : .8
        const palms = [W*.72, W*.78, W*.85]
        palms.forEach((px,pi) => {
          const py = H*.58
          ctx.save()
          ctx.globalAlpha = palmOpacity
          // Kmen
          ctx.beginPath(); ctx.moveTo(px,py); ctx.bezierCurveTo(px+2,py-10,px-3,py-20,px,py-30)
          ctx.strokeStyle='rgba(212,167,95,.5)'; ctx.lineWidth=2.5; ctx.lineCap='round'; ctx.stroke()
          // Listy
          for(let li=0;li<5;li++) {
            const la = (li/5)*Math.PI*2 + Math.sin(t+pi)*.1
            const sway = Math.sin(t*1.2+pi+li)*.05
            ctx.beginPath()
            ctx.moveTo(px,py-30)
            ctx.bezierCurveTo(
              px+Math.cos(la+sway)*12,py-30+Math.sin(la+sway)*8,
              px+Math.cos(la+sway)*20,py-30+Math.sin(la+sway)*14,
              px+Math.cos(la+sway)*22,py-30+Math.sin(la+sway)*15
            )
            ctx.strokeStyle='rgba(180,140,40,.5)'; ctx.lineWidth=1.5; ctx.stroke()
          }
          ctx.restore()
        })
      }

      // ── OCEAN vlny (parallax medium) ──
      for(let i=0;i<4;i++) {
        const sh = Math.sin(f*.025+i)*.5+.5
        ctx.fillStyle=`rgba(8,24,42,${.45+sh*.15})`
        ctx.fillRect(0,H*.47+i*4,W,4)
      }

      // ── ROAD ──
      const ry  = H*.63
      const rh  = H*.27
      const midY = ry + rh/2

      ctx.fillStyle='#100c06'
      ctx.beginPath()
      ctx.moveTo(0,ry); ctx.lineTo(W,ry-8); ctx.lineTo(W,ry+rh); ctx.lineTo(0,ry+rh+8); ctx.fill()

      // Mokrá silnice — odraz světel
      const wetG = ctx.createLinearGradient(0,midY-4,0,midY+12)
      wetG.addColorStop(0,'rgba(212,167,95,.02)')
      wetG.addColorStop(.5,'rgba(212,167,95,.09)')
      wetG.addColorStop(1,'rgba(212,167,95,0)')
      ctx.fillStyle=wetG; ctx.fillRect(0,midY-4,W,16)

      // GPS track
      ctx.beginPath(); ctx.setLineDash([4,6])
      ctx.strokeStyle='rgba(212,167,95,.2)'; ctx.lineWidth=.7
      const carPx = carPosRef.current * W
      ctx.moveTo(carPx+32,midY); ctx.lineTo(W*.92,midY-2); ctx.stroke(); ctx.setLineDash([])

      // Road edge lines
      ctx.strokeStyle='rgba(212,167,95,.1)'; ctx.lineWidth=.4
      ctx.beginPath(); ctx.moveTo(0,ry); ctx.lineTo(W,ry-8); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0,ry+rh+8); ctx.lineTo(W,ry+rh); ctx.stroke()

      // Road dashes
      roadOffsetRef.current = (roadOffsetRef.current + 1.5) % 60
      ctx.strokeStyle='rgba(212,167,95,.18)'; ctx.lineWidth=.9
      ctx.setLineDash([18,38]); ctx.lineDashOffset=-roadOffsetRef.current
      ctx.beginPath(); ctx.moveTo(0,midY); ctx.lineTo(W,midY-4); ctx.stroke(); ctx.setLineDash([])

      // ── AKÁCIE (parallax medium) ──
      const treeOffset = -parallax * 0.4
      ;[0.1,0.28,0.54,0.78].forEach(tx => {
        const ax = ((tx*W + treeOffset) % (W+50) + W+50) % (W+50) - 20
        const ay = ry-6
        ctx.fillStyle='rgba(212,167,95,.4)'; ctx.fillRect(ax-1.5,ay-22,3,22)
        ctx.beginPath(); ctx.ellipse(ax,ay-26,16,8,0,0,Math.PI*2)
        ctx.fillStyle='rgba(10,7,2,.96)'; ctx.fill()
        ctx.beginPath(); ctx.ellipse(ax+9,ay-20,10,5.5,0,0,Math.PI*2); ctx.fill()
      })

      // ── HOTEL (step 2-3) ──
      if (step >= 2) {
        const hx = W*.87
        ctx.fillStyle='rgba(212,167,95,.2)'; ctx.fillRect(hx,ry-34,22,34); ctx.fillRect(hx+3,ry-42,16,10)
        ;[[hx+2,ry-30],[hx+8,ry-30],[hx+14,ry-30],[hx+2,ry-22],[hx+8,ry-22],[hx+14,ry-22]].forEach(([wx,wy]) => {
          const gl = Math.sin(f*.04+wx)*.2+.5
          ctx.fillStyle=`rgba(255,200,80,${gl*.6})`; ctx.fillRect(wx,wy,3,3)
        })
      }

      // ── FIREFLIES ──
      if (f%16===0 && ffArr.length<14)
        ffArr.push({x:Math.random()*W,y:ry+Math.random()*(H-ry)*.85,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.35,life:1,ph:Math.random()*Math.PI*2})
      for(let i=ffArr.length-1;i>=0;i--) {
        const p=ffArr[i]; p.x+=p.vx; p.y+=p.vy; p.ph+=.09; p.life-=.003
        const g=Math.sin(p.ph)*.5+.5
        ctx.beginPath(); ctx.arc(p.x,p.y,1.4,0,Math.PI*2)
        ctx.fillStyle=`rgba(255,245,80,${g*p.life*.9})`; ctx.fill()
        if(g>.75){ctx.beginPath();ctx.arc(p.x,p.y,3.5,0,Math.PI*2);ctx.fillStyle=`rgba(255,245,80,${g*p.life*.12})`;ctx.fill()}
        if(p.life<=0) ffArr.splice(i,1)
      }

      // ── DUST za autem ──
      const cx = carPosRef.current * W
      const bobY = Math.sin(t*2.5)*1.8 // podvozek se houpá
      const cy = midY - 16 + bobY
      if(f%2===0){
        dustArr.push({x:cx-26,y:cy+16,vx:-(Math.random()*2+.4),vy:-(Math.random()*.7-.1),life:1,sz:Math.random()*4+2})
        dustArr.push({x:cx-22,y:cy+18,vx:-(Math.random()*1.5+.2),vy:(Math.random()*.4),life:.7,sz:Math.random()*3+1})
      }
      for(let i=dustArr.length-1;i>=0;i--) {
        const d=dustArr[i]
        ctx.beginPath(); ctx.arc(d.x,d.y,d.sz*d.life,0,Math.PI*2)
        ctx.fillStyle=`rgba(150,100,25,${d.life*.2})`; ctx.fill()
        d.x+=d.vx; d.y+=d.vy; d.vy+=.035; d.life-=.045
        if(d.life<=0) dustArr.splice(i,1)
      }

      // ── DESTINATION PULSE ──
      const dp = STEPS[activeRef.current].carX
      if(dp>0.15 && dp<0.92) {
        const dx2 = dp*W
        const pulse = Math.sin(f*.1)*.5+.5
        ctx.beginPath(); ctx.arc(dx2,midY-4,3,0,Math.PI*2)
        ctx.fillStyle='rgba(212,167,95,.6)'; ctx.fill()
        ctx.beginPath(); ctx.arc(dx2,midY-4,7+pulse*5,0,Math.PI*2)
        ctx.strokeStyle=`rgba(212,167,95,${.12+pulse*.14})`; ctx.lineWidth=.6; ctx.stroke()
      }

      // ── CAR — Land Cruiser 4×4 ──
      const target = STEPS[activeRef.current].carX
      carPosRef.current += (target - carPosRef.current) * 0.03
      const cw=54, ch=22

      // Headlight beam — dlouhý realistický paprsek
      const beamG=ctx.createRadialGradient(cx+40,cy+ch/2,0,cx+40,cy+ch/2,90)
      beamG.addColorStop(0,'rgba(255,235,120,.12)'); beamG.addColorStop(1,'rgba(255,235,120,0)')
      ctx.fillStyle=beamG; ctx.fillRect(cx+cw/2-5,cy-20,110,ch+40)
      // Cone
      ctx.beginPath()
      ctx.moveTo(cx+cw/2+2,cy+3); ctx.lineTo(cx+cw/2+90,cy-8); ctx.lineTo(cx+cw/2+90,cy+ch+2); ctx.closePath()
      ctx.fillStyle='rgba(255,235,120,.04)'; ctx.fill()
      ctx.beginPath()
      ctx.moveTo(cx+cw/2+2,cy+5); ctx.lineTo(cx+cw/2+60,cy+1); ctx.lineTo(cx+cw/2+60,cy+ch-2); ctx.closePath()
      ctx.fillStyle='rgba(255,235,120,.05)'; ctx.fill()

      // Body — Land Cruiser silhouette
      ctx.fillStyle='#1e1609'
      ctx.beginPath()
      ctx.moveTo(cx-cw/2,cy+ch)
      ctx.lineTo(cx-cw/2,cy+6)
      ctx.lineTo(cx-cw/2+6,cy+2)
      ctx.lineTo(cx-cw/2+10,cy-ch*.5)
      ctx.lineTo(cx-cw/2+18,cy-ch*.65)
      ctx.lineTo(cx+cw/2-12,cy-ch*.65)
      ctx.lineTo(cx+cw/2-4,cy-ch*.4)
      ctx.lineTo(cx+cw/2+2,cy)
      ctx.lineTo(cx+cw/2+4,cy+ch)
      ctx.closePath()
      ctx.fill()
      ctx.strokeStyle='rgba(212,167,95,.22)'; ctx.lineWidth=.5; ctx.stroke()

      // Střešní rack
      ctx.fillStyle='rgba(212,167,95,.18)'; ctx.fillRect(cx-cw/2+14,cy-ch*.7,cw-22,2.5)
      ctx.fillStyle='rgba(212,167,95,.12)'
      for(let r=0;r<5;r++) ctx.fillRect(cx-cw/2+16+r*6,cy-ch*.72,1.5,2.5)

      // Anténa
      ctx.beginPath(); ctx.moveTo(cx-cw/2+18,cy-ch*.7); ctx.lineTo(cx-cw/2+16,cy-ch*.7-12)
      ctx.strokeStyle='rgba(212,167,95,.2)'; ctx.lineWidth=.8; ctx.stroke()

      // Okna
      ctx.fillStyle='rgba(12,28,48,.8)'
      ctx.beginPath()
      ctx.moveTo(cx-cw/2+12,cy-ch*.58); ctx.lineTo(cx+cw/2-14,cy-ch*.58)
      ctx.lineTo(cx+cw/2-10,cy-ch*.25); ctx.lineTo(cx-cw/2+11,cy-ch*.25); ctx.closePath()
      ctx.fill()

      // Přední světlo — xenon efekt
      ctx.fillStyle='rgba(255,242,200,.95)'; ctx.fillRect(cx+cw/2-1,cy+3,7,5)
      ctx.fillStyle='rgba(180,210,255,.6)'; ctx.fillRect(cx+cw/2-1,cy+1,4,2)
      // DRL linka
      ctx.strokeStyle='rgba(255,242,200,.4)'; ctx.lineWidth=1.2
      ctx.beginPath(); ctx.moveTo(cx+cw/2-8,cy+1); ctx.lineTo(cx+cw/2+1,cy+1); ctx.stroke()

      // Zadní světla — červená záře v noci
      ctx.fillStyle='rgba(200,40,10,.9)'; ctx.fillRect(cx-cw/2-4,cy+3,4,6)
      const rearG=ctx.createRadialGradient(cx-cw/2-2,cy+6,0,cx-cw/2-2,cy+6,12)
      rearG.addColorStop(0,'rgba(200,40,10,.3)'); rearG.addColorStop(1,'rgba(200,40,10,0)')
      ctx.fillStyle=rearG; ctx.fillRect(cx-cw/2-14,cy-2,16,16)

      // Kola — otáčení s diskami
      const rot = frameRef.current * 0.16
      ;[cx-cw/2+10,cx+cw/2-10].forEach(wx => {
        // Pneumatika
        ctx.beginPath(); ctx.arc(wx,cy+ch,8.5,0,Math.PI*2)
        ctx.fillStyle='#070502'; ctx.fill()
        ctx.strokeStyle='rgba(212,167,95,.15)'; ctx.lineWidth=.5; ctx.stroke()
        // Disk
        ctx.beginPath(); ctx.arc(wx,cy+ch,5.5,0,Math.PI*2)
        ctx.fillStyle='rgba(212,167,95,.12)'; ctx.fill()
        // Paprsky disku
        for(let s=0;s<6;s++) {
          const sa=rot+s*Math.PI/3
          ctx.beginPath(); ctx.moveTo(wx+Math.cos(sa)*2,cy+ch+Math.sin(sa)*2); ctx.lineTo(wx+Math.cos(sa)*5,cy+ch+Math.sin(sa)*5)
          ctx.strokeStyle='rgba(212,167,95,.3)'; ctx.lineWidth=1.2; ctx.stroke()
        }
        // Střed
        ctx.beginPath(); ctx.arc(wx,cy+ch,2,0,Math.PI*2)
        ctx.fillStyle='rgba(212,167,95,.35)'; ctx.fill()
      })
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
        <a href="https://wa.me/254718930587" target="_blank" rel="noopener noreferrer" style={{
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
