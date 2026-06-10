'use client'
import { useEffect, useRef } from 'react'
import { ContactMenu } from '@/components/ui/ContactMenu'
import { useLang } from '@/context/LanguageContext'

export function SafarisSection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)

  const packages = [
    { tagKey:'saf_t1_tag', titleKey:'saf_t1_title', subKey:'saf_t1_sub', descKey:'saf_t1_desc', tags:['100% Private','Luxury Camp','Rashid Personally'], img:'/img-elephants-dust.jpg' },
    { tagKey:'saf_t2_tag', titleKey:'saf_t2_title', subKey:'saf_t2_sub', descKey:'saf_t2_desc', tags:['Big Five','Kilimanjaro View','Private'], img:'/img-rhino.jpg' },
    { tagKey:'saf_t3_tag', titleKey:'saf_t3_title', subKey:'saf_t3_sub', descKey:'saf_t3_desc', tags:['By Air','Luxury Camp','Great Migration'], img:'/img-savanna.jpg' },
    { tagKey:'saf_t4_tag', titleKey:'saf_t4_title', subKey:'saf_t4_sub', descKey:'saf_t4_desc', tags:['Bush + Beach','All-inclusive','Honeymoon Ideal'], img:'/img-elephants-sunset.jpg' },
  ] as const

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current?.querySelectorAll('.si').forEach((el,i) =>
        setTimeout(()=>{ const elem=el as HTMLElement; elem.style.opacity='1'; elem.style.transform='translateY(0)' },i*120))
    }, { threshold:0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="packages" ref={ref} style={{ background:'#050505', padding:'clamp(60px,8vh,100px) 0', overflow:'hidden' }}>
      <div className="si" style={{ opacity:0, transform:'translateY(24px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', padding:'0 clamp(20px,5vw,60px)', marginBottom:'clamp(40px,6vh,64px)', display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
        <div>
          <div style={{ fontSize:7, letterSpacing:'0.22em', color:'rgba(212,167,95,0.5)', textTransform:'uppercase', marginBottom:12 }}>{t('saf_label')}</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(36px,5vw,64px)', fontWeight:200, color:'#F2E6D0', lineHeight:0.9, margin:0 }}>
            {t('saf_title')}<br /><em style={{ color:'#D4A75F', fontStyle:'italic' }}>{t('saf_title_em')}</em>
          </h2>
        </div>
        <p style={{ fontSize:13, lineHeight:1.7, color:'rgba(242,230,208,0.4)', maxWidth:320, margin:0 }}>{t('saf_sub')}</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap:'clamp(8px,2vw,2px)', padding:'0 clamp(12px,4vw,60px)' }}>
        {packages.map((p,i) => (
          <div key={p.titleKey} className="si safari-card" style={{ opacity:0, transform:'translateY(32px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', position:'relative', overflow:'hidden', minHeight:'clamp(360px,55vh,540px)', cursor:'pointer', borderRadius:'clamp(12px,3vw,0px)' }}>
            <div className="safari-photo" style={{ position:'absolute', inset:0, backgroundImage:`url('${p.img}')`, backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.4)', transition:'filter 0.6s ease,transform 0.6s ease' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.2) 60%)' }} />
            <div style={{ position:'absolute', top:20, left:20, fontSize:7, letterSpacing:'0.18em', color:'rgba(212,167,95,0.7)', textTransform:'uppercase', padding:'5px 10px', border:'0.5px solid rgba(212,167,95,0.25)', borderRadius:100, background:'rgba(0,0,0,0.4)', backdropFilter:'blur(8px)' }}>{t(p.tagKey)}</div>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'clamp(20px,3vh,28px)' }}>
              <div style={{ fontSize:7, letterSpacing:'0.14em', color:'rgba(212,167,95,0.45)', textTransform:'uppercase', marginBottom:8 }}>{t(p.subKey)}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(24px,2.5vw,32px)', fontWeight:200, color:'#F2E6D0', lineHeight:1.0, marginBottom:12 }}>{t(p.titleKey)}</h3>
              <p style={{ fontSize:12, lineHeight:1.7, color:'rgba(242,230,208,0.45)', marginBottom:16 }}>{t(p.descKey)}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:20 }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{ fontSize:7, letterSpacing:'0.12em', color:'rgba(212,167,95,0.55)', textTransform:'uppercase', padding:'3px 8px', border:'0.5px solid rgba(212,167,95,0.18)', borderRadius:100 }}>{tag}</span>
                ))}
              </div>
              <ContactMenu><div className="safari-btn" style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase', color:'#050505', background:'#D4A75F', padding:'12px 20px', borderRadius:100, textDecoration:'none', transition:'all 0.3s cubic-bezier(0.25,1,0.5,1)', width:'100%' }}>
                {t('saf_contact')} <span>&#8594;</span>
              </div></ContactMenu>
            </div>
          </div>
        ))}
      </div>

      <div className="si" style={{ opacity:0, transform:'translateY(20px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', textAlign:'center', marginTop:48, padding:'0 20px' }}>
        <div style={{ width:32, height:'0.5px', background:'rgba(212,167,95,0.3)', margin:'0 auto 16px' }} />
        <p style={{ fontSize:12, color:'rgba(242,230,208,0.25)', letterSpacing:'0.08em' }}>{t('saf_pricing')}</p>
      </div>

      <style>{`
        .safari-card:hover .safari-photo{filter:brightness(0.6)!important;transform:scale(1.04)}
        .safari-btn:hover{background:#F0C860!important;transform:translateY(-2px);box-shadow:0 8px 30px rgba(212,167,95,0.4)}
        @media(max-width:768px){.safari-card{min-height:360px!important;border-radius:14px!important}}
      `}</style>
    </section>
  )
}
