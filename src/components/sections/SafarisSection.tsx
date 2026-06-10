'use client'
import { useEffect, useRef } from 'react'

const packages = [
  {
    tag: 'Tsavo · 2 Days',
    title: 'Private Tsavo Wilderness',
    sub: 'Tsavo East National Park',
    desc: 'Just you, Rashid and the wild. Private land cruiser, luxury tented camp, dawn game drive and sundowner on the savanna.',
    tags: ['100% Private', 'Luxury Camp', 'Rashid Personally'],
    img: '/img-elephants-dust.jpg',
  },
  {
    tag: 'Tsavo + Amboseli · 3 Days',
    title: 'Big Five Private Journey',
    sub: 'Tsavo East + Amboseli + Kilimanjaro',
    desc: 'Three days hunting the Big Five. Amboseli beneath Kilimanjaro, elephant herds in the dust, leopards at dusk. No strangers.',
    tags: ['Big Five', 'Kilimanjaro View', 'Private'],
    img: '/img-rhino.jpg',
  },
  {
    tag: 'Maasai Mara · 2–3 Days',
    title: 'Maasai Mara Luxury by Air',
    sub: 'Flight from Diani — land in the Mara',
    desc: 'Private flight, luxury tented camp in the heart of Mara, private game drives at dawn and sunset. Great Migration July–October.',
    tags: ['By Air', 'Luxury Camp', 'Great Migration'],
    img: '/img-savanna.jpg',
  },
  {
    tag: 'Bush + Beach · 5–7 Days',
    title: 'Diani Beach & Safari Combo',
    sub: 'The Best of Kenya — Wild and Coast',
    desc: '2 days safari followed by 3 days on Diani Beach in a luxury resort. Rashid arranges everything — transfers, stays, dining.',
    tags: ['Bush + Beach', 'All-inclusive', 'Honeymoon Ideal'],
    img: '/img-elephants-sunset.jpg',
  },
]

export function SafarisSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        ref.current?.querySelectorAll('.si').forEach((el, i) =>
          setTimeout(() => {
            const el2 = el as HTMLElement
            el2.style.opacity = '1'
            el2.style.transform = 'translateY(0)'
          }, i * 120)
        )
      }
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ background: '#050505', padding: 'clamp(60px,8vh,100px) 0', overflow: 'hidden' }}>

      <div className="si" style={{
        opacity: 0, transform: 'translateY(24px)',
        transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)',
        padding: '0 clamp(20px,5vw,60px)',
        marginBottom: 'clamp(40px,6vh,64px)',
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
      }}>
        <div>
          <div style={{ fontSize: 7, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.5)', textTransform: 'uppercase', marginBottom: 12 }}>
            Private Safari Experiences
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(36px,5vw,64px)', fontWeight: 200,
            color: '#F2E6D0', lineHeight: 0.9, margin: 0,
          }}>
            Crafted for<br /><em style={{ color: '#D4A75F', fontStyle: 'italic' }}>You Alone.</em>
          </h2>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(242,230,208,0.4)', maxWidth: 320, margin: 0 }}>
          Every safari is private, personal and designed around your vision.
          No shared vehicles. No strangers. Just Rashid, you and Kenya.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: 2,
        padding: '0 clamp(20px,5vw,60px)',
      }}>
        {packages.map((p, i) => (
          <div
            key={p.title}
            className="si safari-card"
            style={{
              opacity: 0, transform: 'translateY(32px)',
              transition: `all 0.8s cubic-bezier(0.25,1,0.5,1) ${i * 0.08}s`,
              position: 'relative', overflow: 'hidden',
              minHeight: 'clamp(400px,55vh,540px)',
              cursor: 'pointer',
            }}
          >
            <div className="safari-photo" style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('${p.img}')`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'brightness(0.4)',
              transition: 'filter 0.6s ease, transform 0.6s ease',
            }} />

            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%)',
            }} />

            <div style={{
              position: 'absolute', top: 20, left: 20,
              fontSize: 7, letterSpacing: '0.18em',
              color: 'rgba(212,167,95,0.7)', textTransform: 'uppercase',
              padding: '5px 10px',
              border: '0.5px solid rgba(212,167,95,0.25)',
              borderRadius: 100,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
            }}>{p.tag}</div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(20px,3vh,28px)' }}>
              <div style={{ fontSize: 7, letterSpacing: '0.14em', color: 'rgba(212,167,95,0.45)', textTransform: 'uppercase', marginBottom: 8 }}>
                {p.sub}
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(24px,2.5vw,32px)', fontWeight: 200,
                color: '#F2E6D0', lineHeight: 1.0, marginBottom: 12,
              }}>{p.title}</h3>

              <p style={{
                fontSize: 12, lineHeight: 1.7,
                color: 'rgba(242,230,208,0.45)',
                marginBottom: 16,
              }}>{p.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontSize: 7, letterSpacing: '0.12em',
                    color: 'rgba(212,167,95,0.55)', textTransform: 'uppercase',
                    padding: '3px 8px',
                    border: '0.5px solid rgba(212,167,95,0.18)',
                    borderRadius: 100,
                  }}>{t}</span>
                ))}
              </div>

              
                href="https://wa.me/254700000000?text=Hi%20Rashid%2C%20I%27m%20interested%20in%20a%20private%20safari"
                target="_blank"
                rel="noopener noreferrer"
                className="safari-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#050505', background: '#D4A75F',
                  padding: '10px 20px', borderRadius: 100,
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.25,1,0.5,1)',
                }}
              >
                Contact Rashid
                <span>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="si" style={{
        opacity: 0, transform: 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.25,1,0.5,1)',
        textAlign: 'center', marginTop: 48, padding: '0 20px',
      }}>
        <div style={{ width: 32, height: '0.5px', background: 'rgba(212,167,95,0.3)', margin: '0 auto 16px' }} />
        <p style={{ fontSize: 12, color: 'rgba(242,230,208,0.25)', letterSpacing: '0.08em' }}>
          Every experience is fully customised. Pricing on request.
        </p>
      </div>

      <style>{`
        .safari-card:hover .safari-photo {
          filter: brightness(0.6) !important;
          transform: scale(1.04);
        }
        .safari-btn:hover {
          background: #F0C860 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(212,167,95,0.4);
        }
        @media(max-width:768px){
          .safari-card { min-height: 360px !important; }
        }
      `}</style>
    </section>
  )
}
