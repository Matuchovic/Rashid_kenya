'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.anim-in').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1'
                ;(el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 120)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const reasons = [
    { icon: '🌍', title: 'Authentic Local Expertise', text: 'Our team is born and raised in Kenya — we know the land, the wildlife, and the hidden gems no guidebook can show you.' },
    { icon: '✦', title: 'Tailor-Made Itineraries', text: 'Every trip is customized to your pace, preferences, and passion — from luxury escapes to wild off-the-grid safaris.' },
    { icon: '◈', title: 'All-Inclusive Service', text: 'From airport pickups to accommodations, meals, and guided tours — we take care of everything, so you can relax and explore.' },
    { icon: '🤝', title: 'Trusted Worldwide', text: 'With hundreds of happy guests from around the world, we are proud of our reputation for excellence and integrity.' },
    { icon: '🎭', title: 'More Than Just Safari', text: 'Cultural tours, coastal retreats, hiking, and real connections with local communities — discover Kenya beyond the wildlife.' },
  ]

  const services = [
    'Private Safari Tours',
    'Airport Transfers & Premium Accommodations',
    'Custom Itineraries',
    'Local Guides with Deep Regional Knowledge',
    'Cultural Excursions & Unique Experiences',
  ]

  return (
    <section ref={sectionRef} style={{ background: '#050505', padding: '80px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217,164,65,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="about-container">

        {/* Top grid */}
        <div className="about-top-grid">
          <div>
            <div className="eyebrow anim-in" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.25,1,0.5,1)', marginBottom: 24 }}>
              About Rashid Adventures
            </div>
            <h2 className="anim-in" style={{
              opacity: 0, transform: 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(36px, 4vw, 64px)',
              fontWeight: 300, lineHeight: 0.95,
              letterSpacing: '-0.02em', color: '#fff', marginBottom: 32,
            }}>
              Beyond the<br />
              <em style={{ color: '#D9A441', fontStyle: 'italic' }}>Postcard.</em>
            </h2>
            <div className="anim-in" style={{
              opacity: 0, transform: 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.25,1,0.5,1)',
              width: 48, height: 1,
              background: 'linear-gradient(90deg, #D9A441, transparent)', marginBottom: 28,
            }} />
            <p className="anim-in" style={{
              opacity: 0, transform: 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)',
              fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)',
            }}>
              At Rashid Adventures Kenya, we don't just offer safaris — we craft exceptional
              travel experiences designed to immerse you in the raw beauty, vibrant culture,
              and untamed spirit of Kenya.
            </p>
          </div>

          <div>
            <p className="anim-in" style={{
              opacity: 0, transform: 'translateY(30px)',
              transition: 'all 0.7s cubic-bezier(0.25,1,0.5,1)',
              fontSize: 13, letterSpacing: '0.1em',
              color: 'rgba(217,164,65,0.6)', textTransform: 'uppercase', marginBottom: 24,
            }}>What we offer</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {services.map((s, i) => (
                <div key={i} className="anim-in" style={{
                  opacity: 0, transform: 'translateY(24px)',
                  transition: 'all 0.7s cubic-bezier(0.25,1,0.5,1)',
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 20px',
                  border: '1px solid rgba(217,164,65,0.12)',
                  borderRadius: 14, background: 'rgba(217,164,65,0.03)',
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D9A441', flexShrink: 0, boxShadow: '0 0 8px rgba(217,164,65,0.5)' }} />
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>{s}</span>
                </div>
              ))}
            </div>
            <div className="anim-in" style={{
              opacity: 0, transform: 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)',
              marginTop: 28, padding: '20px 24px',
              border: '1px solid rgba(217,164,65,0.2)',
              borderRadius: 14, background: 'rgba(217,164,65,0.05)',
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, fontStyle: 'italic', fontWeight: 300, color: '#D9A441', lineHeight: 1.6 }}>
                "Travel Intelligently. Travel Meaningfully."
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6, letterSpacing: '0.08em' }}>— Rashid Adventures Kenya</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="anim-in" style={{ opacity: 0, transition: 'all 1s ease', height: 1, background: 'linear-gradient(90deg, transparent, rgba(217,164,65,0.2), transparent)', margin: '60px 0' }} />

        {/* Why travel */}
        <div className="anim-in" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.25,1,0.5,1)', textAlign: 'center', marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 16, justifyContent: 'center' }}>Why travel with us</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(28px, 3vw, 48px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.01em' }}>
            Five reasons guests return <em style={{ color: '#D9A441' }}>year after year</em>
          </h3>
        </div>

        {/* Reasons grid */}
        <div className="reasons-grid">
          {reasons.map((r, i) => (
            <div key={i} className="anim-in reason-card" style={{
              opacity: 0, transform: 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(217,164,65,0.25)'
              el.style.background = 'rgba(217,164,65,0.04)'
              el.style.transform = 'translateY(-4px)'
              el.style.transition = 'all 0.3s ease'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(255,255,255,0.06)'
              el.style.background = 'rgba(255,255,255,0.02)'
              el.style.transform = 'translateY(0)'
            }}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{r.icon}</div>
              <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, fontWeight: 400, color: '#fff', marginBottom: 10, lineHeight: 1.2 }}>{r.title}</h4>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{r.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="anim-in" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)', textAlign: 'center', marginTop: 60 }}>
          <Link href="/about" className="btn-primary" style={{ display: 'inline-flex' }}>
            Our Full Story
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs" style={{ background: 'rgba(0,0,0,0.2)' }}>→</span>
          </Link>
        </div>
      </div>

      <style>{`
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .about-top-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          margin-bottom: 0;
        }
        .reasons-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .reason-card {
          padding: 28px 24px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          background: rgba(255,255,255,0.02);
        }
        @media (min-width: 640px) {
          .reasons-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          .about-container {
            padding: 0 48px;
          }
          .about-top-grid {
            grid-template-columns: 1fr 1fr;
            gap: 60px;
          }
        }
        @media (min-width: 1024px) {
          .about-container {
            padding: 0 72px;
          }
          .reasons-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  )
}
