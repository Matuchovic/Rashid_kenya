'use client'
import { useState } from 'react'
import { useLang } from '@/context/LanguageContext'

export function BigFiveSection() {
  const { t } = useLang()
  const [active, setActive] = useState(0)

  const animals = [
    { nameKey:'bf_lion',     img:'/img-lion.jpg',           parkKey:'Masai Mara', descKey:'bf_lion_desc' },
    { nameKey:'bf_leopard',  img:'/img-leopard.jpg',        parkKey:'Samburu',    descKey:'bf_leopard_desc' },
    { nameKey:'bf_elephant', img:'/img-elephants-dust.jpg', parkKey:'Amboseli',   descKey:'bf_elephant_desc' },
    { nameKey:'bf_rhino',    img:'/img-rhino.jpg',          parkKey:'Ol Pejeta',  descKey:'bf_rhino_desc' },
    { nameKey:'bf_buffalo',  img:'/img-elephants-sunset.jpg',parkKey:'Tsavo',     descKey:'bf_buffalo_desc' },
  ] as const

  return (
    <section id="bigfive" style={{ background:'#050505', overflow:'hidden' }}>
      <div style={{ padding:'clamp(40px,6vh,80px) clamp(20px,5vw,48px) clamp(20px,3vh,40px)', display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:7, letterSpacing:'0.22em', color:'rgba(212,167,95,0.4)', textTransform:'uppercase', marginBottom:10 }}>{t('bf_label')}</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(32px,6vw,64px)', fontWeight:200, color:'#F2E6D0', lineHeight:0.9, margin:0 }}>
            {t('bf_wild')}<br />{t('bf_powerful')}<br /><em style={{ color:'#D4A75F', fontStyle:'italic' }}>{t('bf_untamed')}</em>
          </h2>
        </div>
        <div style={{ fontSize:11, color:'rgba(242,230,208,0.2)', letterSpacing:'0.1em', paddingBottom:8 }}>
          {String(active+1).padStart(2,'0')} / 05
        </div>
      </div>

      {/* Desktop */}
      <div className="bf-desktop" style={{ display:'flex', height:'55vh', minHeight:320 }}>
        {animals.map((a,i) => (
          <div key={a.nameKey} onMouseEnter={() => setActive(i)} style={{ flex:i===active?3:1, position:'relative', overflow:'hidden', cursor:'pointer', transition:'flex 0.6s cubic-bezier(0.25,1,0.5,1)', borderRight:i<4?'0.5px solid rgba(0,0,0,0.8)':'none' }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:`url('${a.img}')`, backgroundSize:'cover', backgroundPosition:'center', transform:i===active?'scale(1.05)':'scale(1)', transition:'transform 0.6s cubic-bezier(0.25,1,0.5,1)', filter:i===active?'brightness(0.75)':'brightness(0.3)' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,0.85) 0%,transparent 60%)' }} />
            <div style={{ position:'absolute', bottom:20, left:0, right:0, textAlign:'center' }}>
              <div style={{ fontSize:7, letterSpacing:'0.2em', color:'rgba(212,167,95,0.6)', textTransform:'uppercase', marginBottom:4 }}>{t(a.nameKey)}</div>
              <div style={{ width:14, height:'0.5px', background:'rgba(212,167,95,0.4)', margin:'0 auto' }} />
            </div>
            {i===active && (
              <div style={{ position:'absolute', bottom:56, left:20, right:20 }}>
                <div style={{ fontSize:7, letterSpacing:'0.14em', color:'rgba(212,167,95,0.5)', textTransform:'uppercase', marginBottom:5 }}>{a.parkKey}</div>
                <p style={{ fontSize:11, color:'rgba(242,230,208,0.5)', lineHeight:1.6, margin:0 }}>{t(a.descKey)}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="bf-mobile" style={{ display:'none' }}>
        {animals.map((a,i) => (
          <div key={a.nameKey} onClick={() => setActive(i)} style={{ position:'relative', height:i===active?'clamp(220px,55vw,280px)':'72px', overflow:'hidden', cursor:'pointer', transition:'height 0.5s cubic-bezier(0.25,1,0.5,1)', borderBottom:'0.5px solid rgba(212,167,95,0.06)' }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:`url('${a.img}')`, backgroundSize:'cover', backgroundPosition:'center top', filter:i===active?'brightness(0.55)':'brightness(0.25)', transition:'filter 0.5s ease' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.15) 100%)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:i===active?'flex-end':'center', padding:i===active?'clamp(16px,4vw,24px)':'0 clamp(16px,4vw,24px)' }}>
              <div style={{ width:'100%' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:i===active?8:0 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:i===active?'clamp(24px,6vw,32px)':'clamp(18px,5vw,22px)', fontWeight:200, color:i===active?'#D4A75F':'rgba(242,230,208,0.55)', transition:'all 0.4s' }}>{t(a.nameKey)}</div>
                  <div style={{ fontSize:7, letterSpacing:'0.14em', color:'rgba(212,167,95,0.4)', textTransform:'uppercase' }}>{a.parkKey}</div>
                </div>
                {i===active && <p style={{ fontSize:12, color:'rgba(242,230,208,0.5)', lineHeight:1.6, margin:0 }}>{t(a.descKey)}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){.bf-desktop{display:none!important}.bf-mobile{display:block!important}}
      `}</style>
    </section>
  )
}
