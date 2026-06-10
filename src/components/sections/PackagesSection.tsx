'use client'
import { useState, useEffect, useRef } from 'react'
import { ContactMenu } from '@/components/ui/ContactMenu'
import { useLang } from '@/context/LanguageContext'

type Pkg = {
  id: string
  name: string
  duration: string
  tag: string
  category: 'safari' | 'excursion'
  includes: string[]
  img: string
  highlight?: boolean
}

const PACKAGES: Pkg[] = [
  { id:'tsavo1', name:'One Day Tsavo East Safari', duration:'1 Day', tag:'Day Safari', category:'safari',
    includes:['4×4 Jeep & Guide','Park Entry Fees','Drinking Water'], img:'/img-elephants-dust.jpg' },
  { id:'ngutuni1', name:'One Day Ngutuni Safari', duration:'1 Day', tag:'Day Safari', category:'safari',
    includes:['4×4 Jeep & Guide','Park Entry Fees','Drinking Water'], img:'/img-rhino.jpg' },
  { id:'tsavo2', name:'2 Days / 1 Night Tsavo East', duration:'2 Days', tag:'Overnight', category:'safari',
    includes:['4×4 Jeep & Guide','Park Entry Fees','Accommodation','All Meals','Drinking Water'], img:'/img-leopard.jpg' },
  { id:'ngutuni2', name:'2 Days / 1 Night Ngutuni', duration:'2 Days', tag:'Overnight', category:'safari',
    includes:['4×4 Jeep & Guide','Park Entry Fees','Accommodation','All Meals','Drinking Water'], img:'/img-elephants-sunset.jpg' },
  { id:'saltlick', name:'2 Days Salt Lick Lodge', duration:'2 Days', tag:'Luxury Lodge', category:'safari', highlight:true,
    includes:['4×4 Jeep & Guide','Park Entry Fees','Salt Lick Lodge','All Meals','Drinking Water'], img:'/img-savanna.jpg' },
  { id:'amboseli', name:'3 Days Tsavo East & Amboseli', duration:'3 Days', tag:'Premium', category:'safari', highlight:true,
    includes:['4×4 Jeep & Guide','Park Entry Fees','2× Accommodation','All Meals','Kilimanjaro Views','Drinking Water'], img:'/img-lion.jpg' },
  { id:'tsavo3combo', name:'3 Days Tsavo East & Salt Lick', duration:'3 Days', tag:'Premium', category:'safari',
    includes:['4×4 Jeep & Guide','Park Entry Fees','2× Accommodation','All Meals','Drinking Water'], img:'/img-elephants-dust.jpg' },
  { id:'tsavoboth', name:'3 Days Tsavo East & West', duration:'3 Days', tag:'Premium', category:'safari',
    includes:['4×4 Jeep & Guide','Park Entry Fees','2× Accommodation','All Meals','Drinking Water'], img:'/img-rhino.jpg' },
  { id:'mombasa', name:'Mombasa City Tour', duration:'Full Day', tag:'City', category:'excursion',
    includes:['Transport','Professional Guide'], img:'/img-savanna.jpg' },
  { id:'wasini', name:'Wasini Island & Dolphins', duration:'Full Day', tag:'Ocean', category:'excursion', highlight:true,
    includes:['Transport','Boat Ride','Snorkeling Equipment','Instructor','Lunch','Drinking Water'], img:'/img-elephants-sunset.jpg' },
  { id:'funzi', name:'Funzi Island & Village Tour', duration:'Full Day', tag:'Island', category:'excursion',
    includes:['Transport','Boat Excursion','Village Visit','Seafood Lunch'], img:'/img-leopard.jpg' },
  { id:'shimba', name:'Shimba Hills National Reserve', duration:'Full Day', tag:'Nature', category:'excursion', highlight:true,
    includes:['Transport','Park Fees','Game Drive','Waterfall Hike','Armed Ranger','Lunch'], img:'/img-elephants-dust.jpg' },
  { id:'congo', name:'Congo River Sunset Excursion', duration:'Half Day', tag:'Sunset', category:'excursion',
    includes:['Transport','Boat Ride','Sunset Views'], img:'/img-savanna.jpg' },
  { id:'pool', name:'African Pool & Starfish Beach Tour', duration:'Full Day', tag:'Beach', category:'excursion',
    includes:['Transport','Beach Guide','Starfish Village Visit'], img:'/img-elephants-sunset.jpg' },
]

export function PackagesSection() {
  const { t } = useLang()
  const [filter, setFilter] = useState<'all' | 'safari' | 'excursion'>('all')
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const filtered = PACKAGES.filter(p => filter === 'all' || p.category === filter)

  return (
    <section id="all-packages" ref={ref} style={{ background:'#050505', padding:'clamp(60px,8vh,100px) 0', overflow:'hidden' }}>

      {/* Header */}
      <div style={{ textAlign:'center', padding:'0 clamp(20px,5vw,48px)', marginBottom:'clamp(36px,5vh,52px)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition:'all 0.9s cubic-bezier(0.16,1,0.3,1)' }}>
        <div style={{ fontSize:7, letterSpacing:'0.22em', color:'rgba(212,167,95,0.45)', textTransform:'uppercase', marginBottom:14, display:'flex', alignItems:'center', gap:12, justifyContent:'center' }}>
          <span style={{ display:'block', width:32, height:'0.5px', background:'rgba(212,167,95,0.25)' }} />
          {t('pkg_label')}
          <span style={{ display:'block', width:32, height:'0.5px', background:'rgba(212,167,95,0.25)' }} />
        </div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(34px,5.5vw,60px)', fontWeight:200, color:'#F2E6D0', lineHeight:0.9, marginBottom:16 }}>
          Every Experience<br /><em style={{ color:'#D4A75F', fontStyle:'italic' }}>{t('pkg_title_em')}</em>
        </h2>
        <p style={{ fontSize:'clamp(12px,1.6vw,14px)', color:'rgba(242,230,208,0.35)', maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>
          {t('pkg_desc')}
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:8, padding:'0 clamp(16px,5vw,48px)', marginBottom:'clamp(28px,4vh,44px)',
        opacity: visible ? 1 : 0, transition:'opacity 0.8s ease 0.2s' }}>
        {(['all','safari','excursion'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontSize:'clamp(8px,1.8vw,10px)', letterSpacing:'0.14em', textTransform:'uppercase',
            padding:'clamp(8px,1.5vw,10px) clamp(16px,3vw,24px)',
            borderRadius:100, cursor:'pointer', transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            border: filter === f ? '0.5px solid rgba(212,167,95,0.5)' : '0.5px solid rgba(212,167,95,0.12)',
            background: filter === f ? 'rgba(212,167,95,0.12)' : 'transparent',
            color: filter === f ? '#D4A75F' : 'rgba(242,230,208,0.35)',
            minHeight: 40,
          }}>
            {f === 'all' ? t('pkg_filter_all') : f === 'safari' ? t('pkg_filter_safari') : t('pkg_filter_excursion')}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="pkg-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gridAutoRows:'320px', gap:12, padding:'0 clamp(12px,4vw,48px)', maxWidth:1200, margin:'0 auto' }}>
        {filtered.map((pkg, idx) => (
          <ContactMenu key={pkg.id}
            style={{
              position:'relative', overflow:'hidden',
              borderRadius:14,
              height:'100%', width:'100%',
              display:'flex', flexDirection:'column', justifyContent:'flex-end',
              textDecoration:'none', cursor:'pointer',
              border: pkg.highlight ? '0.5px solid rgba(212,167,95,0.3)' : '0.5px solid rgba(212,167,95,0.08)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 0.05}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 0.05}s`,
            }}
            className="pkg-card"
          >
            {/* Photo */}
            <div className="pkg-photo" style={{
              position:'absolute', inset:0,
              backgroundImage:`url('${pkg.img}')`,
              backgroundSize:'cover', backgroundPosition:'center',
              filter:'brightness(0.35)',
              transition:'filter 0.6s ease, transform 0.6s ease',
            }} />

            {/* Gradient */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.3) 55%,rgba(0,0,0,0.05) 100%)' }} />

            {/* Highlight shimmer */}
            {pkg.highlight && (
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(212,167,95,0.6),rgba(248,224,120,0.9),rgba(212,167,95,0.6),transparent)' }} />
            )}

            {/* Tag + duration */}
            <div style={{ position:'absolute', top:16, left:16, right:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:'clamp(7px,1.5vw,8px)', letterSpacing:'0.16em', color:'rgba(212,167,95,0.8)', textTransform:'uppercase', padding:'4px 10px', borderRadius:100, border:'0.5px solid rgba(212,167,95,0.2)', background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)' }}>
                {pkg.tag}
              </span>
              <span style={{ fontSize:'clamp(7px,1.5vw,8px)', letterSpacing:'0.12em', color:'rgba(242,230,208,0.5)', textTransform:'uppercase' }}>
                {pkg.duration}
              </span>
            </div>

            {/* Content */}
            <div style={{ position:'relative', zIndex:1, padding:'clamp(14px,3vw,22px)' }}>
              <h3 style={{
                fontFamily:"'Cormorant Garamond',Georgia,serif",
                fontSize:'clamp(16px,4vw,24px)', fontWeight:200,
                color:'#F2E6D0', lineHeight:1.1, marginBottom:10,
              }}>{pkg.name}</h3>

              {/* Includes */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:14 }}>
                {pkg.includes.slice(0,3).map(inc => (
                  <span key={inc} style={{ fontSize:'clamp(7px,1.4vw,8px)', letterSpacing:'0.08em', color:'rgba(212,167,95,0.5)', textTransform:'uppercase', padding:'3px 8px', border:'0.5px solid rgba(212,167,95,0.15)', borderRadius:100 }}>
                    {inc}
                  </span>
                ))}
                {pkg.includes.length > 3 && (
                  <span style={{ fontSize:'clamp(7px,1.4vw,8px)', letterSpacing:'0.08em', color:'rgba(242,230,208,0.25)', padding:'3px 8px', border:'0.5px solid rgba(212,167,95,0.08)', borderRadius:100 }}>
                    +{pkg.includes.length - 3} ' '+t('pkg_more')
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="pkg-cta" style={{ display:'flex', alignItems:'center', gap:8, transition:'gap 0.3s ease' }}>
                <span style={{ fontSize:'clamp(8px,1.6vw,9px)', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(212,167,95,0.7)' }}>
                  {t('pkg_enquire')}
                </span>
                <span style={{ fontSize:12, color:'rgba(212,167,95,0.5)', transition:'transform 0.3s ease' }} className="pkg-arrow">→</span>
              </div>
            </div>
          </ContactMenu>
        ))}
      </div>

      {/* Bottom note */}
      <div style={{
        textAlign:'center', padding:'clamp(40px,6vh,56px) clamp(20px,5vw,48px) 0',
        opacity: visible ? 1 : 0, transition:'opacity 0.8s ease 0.5s',
      }}>
        <div style={{ width:32, height:'0.5px', background:'rgba(212,167,95,0.25)', margin:'0 auto 16px' }} />
        <p style={{ fontSize:'clamp(12px,1.6vw,14px)', color:'rgba(242,230,208,0.25)', letterSpacing:'0.06em', marginBottom:24 }}>
          {t('pkg_pricing')}
        </p>
        <ContactMenu>
          <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, fontSize:'clamp(8px,1.8vw,10px)', letterSpacing:'0.2em', textTransform:'uppercase', color:'#050505', background:'#D4A75F', padding:'clamp(12px,2vw,14px) clamp(24px,4vw,36px)', borderRadius:100, cursor:'pointer', minHeight:48, minWidth:200 }}>
            {t('pkg_cta')} →
          </div>
        </ContactMenu>
      </div>

      <style>{`
        .pkg-card:hover .pkg-photo { filter:brightness(0.55)!important; transform:scale(1.04); }
        .pkg-card:hover .pkg-cta { gap:14px!important; }
        .pkg-card:hover .pkg-arrow { transform:translateX(4px); }
        .pkg-card:hover { border-color:rgba(212,167,95,0.35)!important; }
        @media(max-width:768px){
          .pkg-card:hover .pkg-photo { filter:brightness(0.35)!important; transform:none; }
          
          .pkg-card { min-height:220px!important; }
          #all-packages .filter-btn { padding:8px 14px!important; font-size:8px!important; }
          #all-packages h2 { line-height:0.88!important; }
          #all-packages .pkg-name { font-size:clamp(16px,4.5vw,20px)!important; }
        
        }
      `}</style>
    </section>
  )
}
