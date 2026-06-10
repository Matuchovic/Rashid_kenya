'use client'
import { useEffect, useRef } from 'react'

export function EarthSection() {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current?.querySelectorAll('.ei').forEach((el,i) =>
        setTimeout(()=>{(el as HTMLElement).style.opacity='1';(el as HTMLElement).style.transform='translateY(0)'},i*180))
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let frame = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => canvas.width
    const H = () => canvas.height

    const cities = [
      {name:'Prague',lon:14.4,lat:50.1},
      {name:'Berlin',lon:13.4,lat:52.5},
      {name:'Paris',lon:2.3,lat:48.9},
      {name:'Madrid',lon:-3.7,lat:40.4},
      {name:'London',lon:-0.1,lat:51.5},
      {name:'Amsterdam',lon:4.9,lat:52.4},
      {name:'Rome',lon:12.5,lat:41.9},
      {name:'Vienna',lon:16.4,lat:48.2},
      {name:'Warsaw',lon:21.0,lat:52.2},
      {name:'Zurich',lon:8.5,lat:47.4},
      {name:'Stockholm',lon:18.1,lat:59.3},
      {name:'New York',lon:-74.0,lat:40.7},
      {name:'Dubai',lon:55.3,lat:25.2},
      {name:'Toronto',lon:-79.4,lat:43.7},
    ]
    const kenya = {name:'Diani Beach',lon:39.6,lat:-4.3}

    const proj = (lon: number, lat: number) => {
      const x = (lon + 180) / 360 * W()
      const latR = lat * Math.PI / 180
      const mercN = Math.log(Math.tan(Math.PI/4 + latR/2))
      const y = (H()/2) - (W() * mercN / (2*Math.PI)) * 0.55 + H()*0.1
      return [x, y]
    }

    const bezPt = (p0: number[], p1: number[], cp: number[], t: number) => {
      const x = (1-t)*(1-t)*p0[0] + 2*(1-t)*t*cp[0] + t*t*p1[0]
      const y = (1-t)*(1-t)*p0[1] + 2*(1-t)*t*cp[1] + t*t*p1[1]
      return [x, y]
    }

    const cp = (p0: number[], p1: number[]) => {
      const mx = (p0[0]+p1[0])/2
      const my = (p0[1]+p1[1])/2
      const dist = Math.hypot(p1[0]-p0[0], p1[1]-p0[1])
      return [mx, my - dist*0.3]
    }

    const planes = cities.map((c, i) => ({
      city: c,
      progress: i / cities.length,
      speed: 0.0006 + Math.random()*0.0003,
    }))

    const draw = () => {
      raf = requestAnimationFrame(draw)
      frame++
      ctx.clearRect(0, 0, W(), H())
      const t = frame * 0.01
      const [kx, ky] = proj(kenya.lon, kenya.lat)

      planes.forEach(pl => {
        pl.progress = (pl.progress + pl.speed) % 1.0
        const [sx, sy] = proj(pl.city.lon, pl.city.lat)
        const c2 = cp([sx,sy], [kx,ky])
        const prog = pl.progress
        const trailLen = 0.07

        // Trail
        ctx.beginPath()
        for(let i=0;i<=16;i++){
          const tp = Math.max(0, prog-trailLen) + (trailLen*(i/16))
          const [px,py] = bezPt([sx,sy],[kx,ky],c2,tp)
          if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py)
        }
        ctx.strokeStyle='rgba(212,167,95,0.12)'
        ctx.lineWidth=0.5
        ctx.stroke()

        // Plane dot
        const [px,py] = bezPt([sx,sy],[kx,ky],c2,prog)
        const g2 = ctx.createRadialGradient(px,py,0,px,py,5)
        g2.addColorStop(0,'rgba(248,224,120,0.9)')
        g2.addColorStop(1,'rgba(248,224,120,0)')
        ctx.beginPath();ctx.arc(px,py,5,0,Math.PI*2)
        ctx.fillStyle=g2;ctx.fill()
        ctx.beginPath();ctx.arc(px,py,1.8,0,Math.PI*2)
        ctx.fillStyle='rgba(255,248,160,0.95)';ctx.fill()

        // City pulse
        const pulse = Math.sin(t*2 + pl.city.lon*0.1)*0.5+0.5
        const r1 = 2.5 + pulse*1.5
        const r2 = 6 + pulse*5

        ctx.beginPath();ctx.arc(sx,sy,r2,0,Math.PI*2)
        ctx.strokeStyle=`rgba(212,167,95,${0.06+pulse*0.07})`
        ctx.lineWidth=0.5;ctx.stroke()

        ctx.beginPath();ctx.arc(sx,sy,r1,0,Math.PI*2)
        ctx.strokeStyle=`rgba(212,167,95,${0.25+pulse*0.2})`
        ctx.lineWidth=0.5;ctx.stroke()

        const gd = ctx.createRadialGradient(sx,sy,0,sx,sy,r1)
        gd.addColorStop(0,'rgba(248,224,120,0.9)')
        gd.addColorStop(1,'rgba(212,167,95,0)')
        ctx.beginPath();ctx.arc(sx,sy,r1,0,Math.PI*2)
        ctx.fillStyle=gd;ctx.fill()

        // Label
        ctx.fillStyle=`rgba(242,230,208,${0.45+pulse*0.2})`
        ctx.font='500 8px Inter,sans-serif'
        ctx.textAlign='left'
        ctx.fillText(pl.city.name, sx+r1+3, sy+3)
      })

      // Kenya beacon
      const kPulse = Math.sin(t*1.5)*0.5+0.5
      const kr1 = 5+kPulse*2
      const kr2 = 13+kPulse*7
      const kr3 = 26+kPulse*10

      ctx.beginPath();ctx.arc(kx,ky,kr3,0,Math.PI*2)
      ctx.strokeStyle=`rgba(255,255,255,${0.03+kPulse*0.04})`
      ctx.lineWidth=0.5;ctx.stroke()

      ctx.beginPath();ctx.arc(kx,ky,kr2,0,Math.PI*2)
      ctx.strokeStyle=`rgba(255,255,255,${0.07+kPulse*0.07})`
      ctx.lineWidth=0.5;ctx.stroke()

      ctx.beginPath();ctx.arc(kx,ky,kr1,0,Math.PI*2)
      ctx.strokeStyle=`rgba(255,255,255,${0.4+kPulse*0.2})`
      ctx.lineWidth=1;ctx.stroke()

      const kg = ctx.createRadialGradient(kx,ky,0,kx,ky,kr1)
      kg.addColorStop(0,'rgba(255,255,255,1)')
      kg.addColorStop(1,'rgba(255,255,255,0)')
      ctx.beginPath();ctx.arc(kx,ky,kr1,0,Math.PI*2)
      ctx.fillStyle=kg;ctx.fill()

      ctx.fillStyle='rgba(242,230,208,0.9)'
      ctx.font='600 9px Inter,sans-serif'
      ctx.textAlign='left'
      ctx.fillText('KENYA', kx+kr1+4, ky-3)
      ctx.fillStyle='rgba(212,167,95,0.55)'
      ctx.font='400 8px Inter,sans-serif'
      ctx.fillText('Diani Beach', kx+kr1+4, ky+8)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section ref={ref} style={{ position:'relative', minHeight:'100svh', background:'#000', overflow:'hidden', display:'flex', alignItems:'center' }}>

      {/* Earth photo */}
      <div style={{ position:'absolute', inset:0, backgroundImage:"url('/img-earth-kenya.jpg')", backgroundSize:'cover', backgroundPosition:'center', animation:'earthKen 30s ease-in-out infinite alternate' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.55) 100%)' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.2) 60%,transparent 100%)' }} />

      {/* Canvas overlay — cities + flights */}
      <canvas
        ref={canvasRef}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:2 }}
      />

      {/* Right content */}
      <div style={{ position:'absolute', bottom:'clamp(40px,6vh,72px)', left:'clamp(20px,4vw,56px)', zIndex:10, maxWidth:420 }}>
        <div className="ei" style={{ opacity:0, transform:'translateY(24px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', fontSize:7, letterSpacing:'0.22em', color:'rgba(212,167,95,0.5)', textTransform:'uppercase', marginBottom:14 }}>Our Home</div>
        <h2 className="ei" style={{ opacity:0, transform:'translateY(30px)', transition:'all 0.9s cubic-bezier(0.25,1,0.5,1)', fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(36px,6vw,64px)', fontWeight:200, color:'#F2E6D0', lineHeight:0.92, marginBottom:22 }}>
          Rooted in<br /><em style={{ color:'#D4A75F', fontStyle:'italic' }}>Kenya.</em>
        </h2>
        <div className="ei" style={{ opacity:0, transform:'translateY(20px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', width:36, height:'0.5px', background:'linear-gradient(90deg,#D4A75F,transparent)', marginBottom:20 }} />
        <p className="ei" style={{ opacity:0, transform:'translateY(20px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', fontSize:'clamp(12px,1.5vw,14px)', lineHeight:1.8, color:'rgba(242,230,208,0.45)', marginBottom:28 }}>
          From the vast savannahs of the Maasai Mara to the foot of Kilimanjaro. Guests travel from across the world to experience Kenya with Rashid.
        </p>
        <div className="ei" style={{ opacity:0, transform:'translateY(20px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', display:'flex', flexDirection:'column', gap:8, marginBottom:28 }}>
          {([['Earth',false],['Africa',false],['Kenya',true],['Diani Beach',false]] as [string,boolean][]).map(([l,a]) => (
            <div key={l} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:5, height:5, borderRadius:'50%', flexShrink:0, background:a?'#D4A75F':'rgba(212,167,95,0.2)', boxShadow:a?'0 0 8px rgba(212,167,95,0.6)':'none' }} />
              <span style={{ fontSize:8, letterSpacing:'0.16em', textTransform:'uppercase', color:a?'rgba(212,167,95,0.8)':'rgba(242,230,208,0.2)' }}>{l}</span>
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
      `}</style>
    </section>
  )
}
