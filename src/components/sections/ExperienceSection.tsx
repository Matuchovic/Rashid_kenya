'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'

export function ExperienceSection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current?.querySelectorAll('.xi').forEach((el,i) =>
        setTimeout(()=>{(el as HTMLElement).style.opacity='1';(el as HTMLElement).style.transform='translateY(0)'},i*200))
    }, { threshold:0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <section id="experience" ref={ref} style={{ position:'relative', minHeight:'80svh', overflow:'hidden', display:'flex', alignItems:'center' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:"url('/img-savanna.jpg')", backgroundSize:'cover', backgroundPosition:'center 40%', animation:'expKen 25s ease-in-out infinite alternate' }} />
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,rgba(0,0,0,0.75) 0%,transparent 70%)' }} />
      <div style={{ position:'relative', zIndex:10, padding:'clamp(48px,8vh,100px) clamp(20px,6vw,60px)', maxWidth:640 }}>
        <div className="xi" style={{ opacity:0, transform:'translateY(20px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', fontSize:7, letterSpacing:'0.22em', color:'rgba(212,167,95,0.4)', textTransform:'uppercase', marginBottom:18 }}>{t('exp_label')}</div>
        <h2 className="xi" style={{ opacity:0, transform:'translateY(30px)', transition:'all 1s cubic-bezier(0.25,1,0.5,1)', fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(36px,7vw,80px)', fontWeight:200, color:'#F2E6D0', lineHeight:0.88, marginBottom:24 }}>
          {t('exp_title')}<br /><em style={{ color:'#D4A75F', fontStyle:'italic' }}>{t('exp_title_em')}</em><br />{t('exp_title2')}
        </h2>
        <p className="xi" style={{ opacity:0, transform:'translateY(20px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', fontSize:'clamp(12px,1.5vw,14px)', lineHeight:1.8, color:'rgba(242,230,208,0.45)', maxWidth:400, marginBottom:28 }}>{t('exp_desc')}</p>
        <div className="xi" style={{ opacity:0, transform:'translateY(20px)', transition:'all 0.8s cubic-bezier(0.25,1,0.5,1)', display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
          <span style={{ fontSize:8, letterSpacing:'0.22em', color:'rgba(212,167,95,0.6)', textTransform:'uppercase' }}>{t('exp_cta')}</span>
          <div style={{ height:'0.5px', width:36, background:'rgba(212,167,95,0.4)' }} />
        </div>
      </div>
      <style>{`@keyframes expKen{0%{transform:scale(1)}100%{transform:scale(1.05) translate(-1%,0)}}`}</style>
    </section>
  )
}
