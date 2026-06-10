'use client'
import { useState } from 'react'

const animals = [
  { name: 'Lion',     img: '/img-lion.jpg',           park: 'Masai Mara', desc: 'The king of the savanna. Witness prides hunting at dawn.' },
  { name: 'Leopard',  img: '/img-leopard.jpg',        park: 'Samburu',    desc: 'The most elusive. Hidden in acacia trees at golden hour.' },
  { name: 'Elephant', img: '/img-elephants-dust.jpg', park: 'Amboseli',   desc: 'Herds beneath Kilimanjaro. Pure, timeless majesty.' },
  { name: 'Rhino',    img: '/img-rhino.jpg',          park: 'Ol Pejeta',  desc: 'Ancient and powerful. A rare and sacred encounter.' },
  { name: 'Buffalo',  img: '/img-elephants-sunset.jpg', park: 'Tsavo',    desc: 'Thousands strong. The dark force of the plains.' },
]

export function BigFiveSection() {
  const [active, setActive] = useState(0)

  return (
    <section style={{ background: '#050505', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: 'clamp(40px,6vh,80px) clamp(20px,5vw,48px) clamp(20px,3vh,40px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 7, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.4)', textTransform: 'uppercase', marginBottom: 10 }}>The Big Five</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(32px,6vw,64px)', fontWeight: 200, color: '#F2E6D0', lineHeight: 0.9, margin: 0 }}>
            Wild.<br />Powerful.<br /><em style={{ color: '#D4A75F', fontStyle: 'italic' }}>Untamed.</em>
          </h2>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(242,230,208,0.2)', letterSpacing: '0.1em', paddingBottom: 8 }}>
          {String(active + 1).padStart(2,'0')} / 05
        </div>
      </div>

      {/* Desktop: horizontal expand strip */}
      <div className="bf-desktop" style={{ display: 'flex', height: '55vh', minHeight: 320 }}>
        {animals.map((a, i) => (
          <div key={a.name} onMouseEnter={() => setActive(i)} style={{
            flex: i === active ? 3 : 1, position: 'relative', overflow: 'hidden', cursor: 'pointer',
            transition: 'flex 0.6s cubic-bezier(0.25,1,0.5,1)',
            borderRight: i < 4 ? '0.5px solid rgba(0,0,0,0.8)' : 'none',
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${a.img}')`, backgroundSize: 'cover', backgroundPosition: 'center', transform: i === active ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.25,1,0.5,1)', filter: i === active ? 'brightness(0.75)' : 'brightness(0.3)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,0.85) 0%,transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
              <div style={{ fontSize: 7, letterSpacing: '0.2em', color: 'rgba(212,167,95,0.6)', textTransform: 'uppercase', marginBottom: 4 }}>{a.name}</div>
              <div style={{ width: 14, height: '0.5px', background: 'rgba(212,167,95,0.4)', margin: '0 auto' }} />
            </div>
            {i === active && (
              <div style={{ position: 'absolute', bottom: 56, left: 20, right: 20 }}>
                <div style={{ fontSize: 7, letterSpacing: '0.14em', color: 'rgba(212,167,95,0.5)', textTransform: 'uppercase', marginBottom: 5 }}>{a.park}</div>
                <p style={{ fontSize: 11, color: 'rgba(242,230,208,0.5)', lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical stack tap */}
      <div className="bf-mobile">
        {animals.map((a, i) => (
          <div key={a.name} onClick={() => setActive(i)} style={{
            position: 'relative', height: i === active ? 260 : 80,
            overflow: 'hidden', cursor: 'pointer',
            transition: 'height 0.5s cubic-bezier(0.25,1,0.5,1)',
            borderBottom: '0.5px solid rgba(212,167,95,0.06)',
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${a.img}')`, backgroundSize: 'cover', backgroundPosition: 'center top', filter: i === active ? 'brightness(0.6)' : 'brightness(0.25)', transition: 'filter 0.5s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.2) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: i === active ? 'flex-end' : 'center', padding: i === active ? '20px 24px' : '0 24px' }}>
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i === active ? 8 : 0 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: i === active ? 28 : 20, fontWeight: 200, color: i === active ? '#D4A75F' : 'rgba(242,230,208,0.6)', transition: 'all 0.4s' }}>{a.name}</div>
                  <div style={{ fontSize: 7, letterSpacing: '0.16em', color: 'rgba(212,167,95,0.4)', textTransform: 'uppercase' }}>{a.park}</div>
                </div>
                {i === active && <p style={{ fontSize: 12, color: 'rgba(242,230,208,0.5)', lineHeight: 1.6, margin: 0 }}>{a.desc}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .bf-mobile{display:none}
        @media(max-width:768px){
          .bf-desktop{display:none!important}
          .bf-mobile{display:block}
        }
      `}</style>
    </section>
  )
}
