'use client'
import { useState, useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'

const CONTACTS = [
  {
    icon: '💬',
    label: 'WhatsApp',
    sub: t('contact_wa_sub'),
    href: 'https://wa.me/254718930587',
    color: 'rgba(37,211,102,0.15)',
    border: 'rgba(37,211,102,0.3)',
  },
  {
    icon: '👥',
    label: t('contact_fb_group'),
    sub: t('contact_fb_group_sub'),
    href: 'https://www.facebook.com/share/g/1EWSvuCo4V/?mibextid=wwXIfr',
    color: 'rgba(24,119,242,0.12)',
    border: 'rgba(24,119,242,0.25)',
  },
  {
    icon: '👤',
    label: t('contact_fb_profile'),
    sub: t('contact_fb_profile_sub'),
    href: 'https://www.facebook.com/share/1FBMYTAVux/?mibextid=wwXIfr',
    color: 'rgba(24,119,242,0.08)',
    border: 'rgba(24,119,242,0.2)',
  },
]

interface ContactMenuProps {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export function ContactMenu({ children, style, className }: ContactMenuProps) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={ref} style={{ position:'relative', display:'inline-flex' }}>
      <div
        onClick={e => { e.preventDefault(); setOpen(o => !o) }}
        style={{ cursor:'pointer', display:'inline-flex', ...style }}
        className={className}
      >
        {children}
      </div>

      {/* Dropdown */}
      <div style={{
        position:'absolute',
        bottom:'calc(100% + 12px)',
        left:'50%',
        zIndex:9999,
        background:'rgba(8,5,2,0.97)',
        backdropFilter:'blur(40px)', WebkitBackdropFilter:'blur(40px)',
        border:'0.5px solid rgba(212,167,95,0.2)',
        borderRadius:16, overflow:'hidden',
        minWidth:260,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transform: open
          ? 'translateX(-50%) translateY(0) scale(1)'
          : 'translateX(-50%) translateY(8px) scale(0.96)',
        transition:'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        boxShadow:'0 24px 80px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(212,167,95,0.1)',
      }}>
        {/* Header */}
        <div style={{ padding:'14px 16px 10px', borderBottom:'0.5px solid rgba(212,167,95,0.08)' }}>
          <div style={{ fontSize:7, letterSpacing:'0.2em', color:'rgba(212,167,95,0.4)', textTransform:'uppercase' }}>
            Contact Rashid via
          </div>
        </div>

        {/* Options */}
        {CONTACTS.map((c, i) => (
          <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display:'flex', alignItems:'center', gap:12,
              padding:'clamp(12px,2vh,14px) 16px',
              textDecoration:'none',
              borderBottom: i < CONTACTS.length - 1 ? '0.5px solid rgba(212,167,95,0.06)' : 'none',
              transition:'background 0.2s ease',
              background:'transparent',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = c.color)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {/* Icon */}
            <div style={{
              width:38, height:38, borderRadius:10, flexShrink:0,
              background:c.color,
              border:`0.5px solid ${c.border}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:18,
            }}>{c.icon}</div>

            {/* Text */}
            <div>
              <div style={{ fontSize:12, fontWeight:400, color:'#F2E6D0', letterSpacing:'0.04em', marginBottom:2 }}>
                {c.label}
              </div>
              <div style={{ fontSize:10, color:'rgba(242,230,208,0.35)', letterSpacing:'0.06em' }}>
                {c.sub}
              </div>
            </div>

            {/* Arrow */}
            <div style={{ marginLeft:'auto', fontSize:12, color:'rgba(212,167,95,0.35)' }}>→</div>
          </a>
        ))}

        {/* Bottom tip */}
        <div style={{ padding:'10px 16px', background:'rgba(212,167,95,0.03)' }}>
          <div style={{ fontSize:9, color:'rgba(242,230,208,0.2)', letterSpacing:'0.08em', textAlign:'center' }}>
            Rashid replies within minutes
          </div>
        </div>
      </div>
    </div>
  )
}
