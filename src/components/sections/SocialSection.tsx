'use client'
import { useEffect, useRef } from 'react'

export function SocialSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        ref.current?.querySelectorAll('.ssi').forEach((el, i) =>
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '1'
            ;(el as HTMLElement).style.transform = 'translateY(0)'
          }, i * 150)
        )
      }
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ background: '#050505', padding: 'clamp(60px,8vh,100px) clamp(20px,5vw,48px)', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,167,95,0.04) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      {/* Header */}
      <div className="ssi" style={{ opacity: 0, transform: 'translateY(24px)', transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)', textAlign: 'center', marginBottom: 52 }}>
        <div style={{ fontSize: 7, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.5)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
          <span style={{ display: 'block', width: 32, height: '0.5px', background: 'rgba(212,167,95,0.3)' }} />
          Connect with Rashid
          <span style={{ display: 'block', width: 32, height: '0.5px', background: 'rgba(212,167,95,0.3)' }} />
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(36px,5vw,52px)', fontWeight: 200, color: '#F2E6D0', lineHeight: 0.9, marginBottom: 10 }}>
          Join the<br /><em style={{ color: '#D4A75F', fontStyle: 'italic' }}>Journey.</em>
        </h2>
        <p style={{ fontSize: 11, color: 'rgba(242,230,208,0.3)', letterSpacing: '0.08em' }}>Follow · Share · Be Part of the Story</p>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 14, maxWidth: 680, margin: '0 auto' }}>

        {/* GROUP CARD */}
        <a
          className="ssi social-card"
          href="https://www.facebook.com/share/g/1EWSvuCo4V/?mibextid=wwXIfr"
          target="_blank" rel="noopener noreferrer"
          style={{
            opacity: 0, transform: 'translateY(32px)',
            transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1) 0.1s',
            position: 'relative', overflow: 'hidden', borderRadius: 18,
            padding: 'clamp(24px,4vh,32px) clamp(20px,3vw,28px)',
            display: 'flex', flexDirection: 'column',
            background: 'linear-gradient(145deg,#0f0900 0%,#180d00 100%)',
            border: '0.5px solid rgba(212,167,95,0.12)',
            textDecoration: 'none',
          }}
        >
          <span style={{ position: 'absolute', top: 18, right: 18, fontSize: 7, letterSpacing: '0.16em', color: 'rgba(212,167,95,0.45)', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100, border: '0.5px solid rgba(212,167,95,0.15)', background: 'rgba(212,167,95,0.05)' }}>Community</span>

          {/* Icon */}
          <div className="social-icon" style={{ width: 44, height: 44, borderRadius: 12, border: '0.5px solid rgba(212,167,95,0.2)', background: 'rgba(212,167,95,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, transition: 'all 0.4s' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4A75F"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', marginBottom: 14 }}>
            {[0,1,2,3].map(i => <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px solid #0f0900', background: i===2?'rgba(212,167,95,0.5)':'rgba(212,167,95,0.18)', marginLeft: i===0?0:-5 }} />)}
            <span style={{ fontSize: 9, color: 'rgba(212,167,95,0.4)', marginLeft: 8, alignSelf: 'center', letterSpacing: '0.04em' }}>Community</span>
          </div>

          <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(22px,3vw,28px)', fontWeight: 200, color: '#F2E6D0', lineHeight: 1.0, marginBottom: 8 }}>
            Kenya Safari<br /><em style={{ color: '#D4A75F', fontStyle: 'italic' }}>Community</em>
          </div>
          <p style={{ fontSize: 11, lineHeight: 1.7, color: 'rgba(242,230,208,0.3)', marginBottom: 22, flex: 1 }}>
            Private Facebook group for safari lovers. Wildlife stories, tips, photos and exclusive Rashid adventures.
          </p>
          <div className="social-cta" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,167,95,0.6)', transition: 'all 0.3s' }}>
            Join the group
            <span className="social-line" style={{ height: '0.5px', width: 20, background: 'linear-gradient(90deg,rgba(212,167,95,0.5),transparent)', transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
            <span className="social-arrow" style={{ fontSize: 10, opacity: 0, transform: 'translateX(-4px)', transition: 'all 0.3s' }}>→</span>
          </div>
        </a>

        {/* PROFILE CARD */}
        <a
          className="ssi social-card"
          href="https://www.facebook.com/share/1FBMYTAVux/?mibextid=wwXIfr"
          target="_blank" rel="noopener noreferrer"
          style={{
            opacity: 0, transform: 'translateY(32px)',
            transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1) 0.2s',
            position: 'relative', overflow: 'hidden', borderRadius: 18,
            padding: 'clamp(24px,4vh,32px) clamp(20px,3vw,28px)',
            display: 'flex', flexDirection: 'column',
            background: 'linear-gradient(145deg,#070505 0%,#0d0a08 100%)',
            border: '0.5px solid rgba(212,167,95,0.12)',
            textDecoration: 'none',
          }}
        >
          <span style={{ position: 'absolute', top: 18, right: 18, fontSize: 7, letterSpacing: '0.16em', color: 'rgba(212,167,95,0.45)', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100, border: '0.5px solid rgba(212,167,95,0.15)', background: 'rgba(212,167,95,0.05)' }}>Personal</span>

          {/* Icon */}
          <div className="social-icon" style={{ width: 44, height: 44, borderRadius: 12, border: '0.5px solid rgba(212,167,95,0.2)', background: 'rgba(212,167,95,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, transition: 'all 0.4s' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4A75F"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
          </div>

          {/* Avatar row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div className="social-avatar" style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(212,167,95,0.25)', background: 'rgba(212,167,95,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 200, color: '#D4A75F', transition: 'box-shadow 0.4s' }}>R</div>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(212,167,95,0.6)', letterSpacing: '0.06em' }}>Rashid</div>
              <div style={{ fontSize: 8, color: 'rgba(242,230,208,0.2)', letterSpacing: '0.05em' }}>Guide · Diani Beach, Kenya</div>
            </div>
          </div>

          <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(22px,3vw,28px)', fontWeight: 200, color: '#F2E6D0', lineHeight: 1.0, marginBottom: 8 }}>
            Meet<br /><em style={{ color: '#D4A75F', fontStyle: 'italic' }}>Rashid</em>
          </div>
          <p style={{ fontSize: 11, lineHeight: 1.7, color: 'rgba(242,230,208,0.3)', marginBottom: 22, flex: 1 }}>
            Follow Rashid personally. Behind the scenes Kenya life, live wildlife encounters and the real untouched Africa.
          </p>
          <div className="social-cta" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,167,95,0.6)', transition: 'all 0.3s' }}>
            Follow Rashid
            <span className="social-line" style={{ height: '0.5px', width: 20, background: 'linear-gradient(90deg,rgba(212,167,95,0.5),transparent)', transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
            <span className="social-arrow" style={{ fontSize: 10, opacity: 0, transform: 'translateX(-4px)', transition: 'all 0.3s' }}>→</span>
          </div>
        </a>
      </div>

      {/* Bottom */}
      <div className="ssi" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1) 0.3s', maxWidth: 680, margin: '36px auto 0', display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg,transparent,rgba(212,167,95,0.12),transparent)' }} />
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 12, fontStyle: 'italic', fontWeight: 200, color: 'rgba(242,230,208,0.18)', whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>Real stories from the wild</div>
        <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg,transparent,rgba(212,167,95,0.12),transparent)' }} />
      </div>

      <style>{`
        .social-card {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.5s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.5s ease !important;
        }
        .social-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,167,95,0.0), transparent);
          transition: background 0.5s ease;
          pointer-events: none; z-index: 0;
        }
        .social-card::after {
          content: '';
          position: absolute; top: 0; left: -100%; right: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,167,95,0.8), rgba(248,224,120,1), rgba(212,167,95,0.8), transparent);
          box-shadow: 0 0 8px rgba(212,167,95,0.6), 0 0 16px rgba(212,167,95,0.3);
          transition: left 0.6s cubic-bezier(0.16,1,0.3,1), right 0.6s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }
        .social-card:hover {
          transform: translateY(-8px) scale(1.01) !important;
          border-color: rgba(212,167,95,0.45) !important;
          box-shadow:
            0 0 0 1px rgba(212,167,95,0.12),
            0 8px 32px rgba(212,167,95,0.18),
            0 16px 64px rgba(212,167,95,0.1),
            0 32px 80px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(212,167,95,0.08) !important;
        }
        .social-card:hover::before {
          background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,167,95,0.1), transparent) !important;
        }
        .social-card:hover::after { left: 0; right: 0; }
        .social-card:hover .social-icon {
          border-color: rgba(212,167,95,0.45) !important;
          background: rgba(212,167,95,0.12) !important;
          box-shadow: 0 0 16px rgba(212,167,95,0.25), 0 0 32px rgba(212,167,95,0.1);
        }
        .social-card:hover .social-avatar {
          box-shadow: 0 0 12px rgba(212,167,95,0.4), 0 0 24px rgba(212,167,95,0.15);
        }
        .social-card:hover .social-cta { color: rgba(212,167,95,1) !important; gap: 14px !important; }
        .social-card:hover .social-line { width: 36px !important; }
        .social-card:hover .social-arrow { opacity: 1 !important; transform: translateX(0) !important; }
        @media(max-width:768px){
          .social-card:hover { transform: translateY(-4px) scale(1.005) !important; }
        }
      `}</style>
    </section>
  )
}
