'use client'
import { useState } from 'react'

const animals = [
  { name: 'Lion',     img: '/img-lion.jpg',     park: 'Masai Mara',  desc: 'The king of the savanna. Witness prides at dawn.' },
  { name: 'Leopard',  img: '/img-leopard.jpg',  park: 'Samburu',     desc: 'The most elusive. Hidden in acacia trees at dusk.' },
  { name: 'Elephant', img: '/img-elephants-dust.jpg', park: 'Amboseli', desc: 'Herds beneath Kilimanjaro. Pure majesty.' },
  { name: 'Rhino',    img: '/img-rhino.jpg',    park: 'Ol Pejeta',   desc: 'Ancient and powerful. A rare and sacred encounter.' },
  { name: 'Buffalo',  img: '/img-elephants-sunset.jpg', park: 'Tsavo', desc: 'Thousands strong. The dark force of the plains.' },
]

export function BigFiveSection() {
  const [active, setActive] = useState(0)

  return (
    <section style={{ background: '#050505', position: 'relative', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '80px 48px 40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 8, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.4)', textTransform: 'uppercase', marginBottom: 12 }}>The Big Five</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 200, color: '#F2E6D0', lineHeight: 0.9 }}>
            Wild.<br />Powerful.<br /><em style={{ color: '#D4A75F', fontStyle: 'italic' }}>Untamed.</em>
          </h2>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(242,230,208,0.2)', letterSpacing: '0.1em', paddingBottom: 8 }}>
          {String(active + 1).padStart(2,'0')} / 05
        </div>
      </div>

      {/* Full-width animal strip */}
      <div style={{ display: 'flex', height: '55vh', minHeight: 360 }}>
        {animals.map((a, i) => (
          <div
            key={a.name}
            onMouseEnter={() => setActive(i)}
            style={{
              flex: i === active ? 3 : 1,
              position: 'relative', overflow: 'hidden', cursor: 'pointer',
              transition: 'flex 0.6s cubic-bezier(0.25,1,0.5,1)',
              borderRight: i < 4 ? '0.5px solid rgba(5,5,5,0.8)' : 'none',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('${a.img}')`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              transform: i === active ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.25,1,0.5,1)',
              filter: i === active ? 'brightness(0.75)' : 'brightness(0.35)',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%)' }} />

            {/* Name always visible */}
            <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
              <div style={{ fontSize: 8, letterSpacing: '0.2em', color: 'rgba(212,167,95,0.6)', textTransform: 'uppercase', marginBottom: 4 }}>{a.name}</div>
              <div style={{ width: 16, height: '0.5px', background: 'rgba(212,167,95,0.4)', margin: '0 auto' }} />
            </div>

            {/* Expanded content */}
            {i === active && (
              <div style={{ position: 'absolute', bottom: 60, left: 24, right: 24, opacity: 1, transition: 'opacity 0.4s ease 0.2s' }}>
                <div style={{ fontSize: 7, letterSpacing: '0.16em', color: 'rgba(212,167,95,0.5)', textTransform: 'uppercase', marginBottom: 6 }}>{a.park}</div>
                <p style={{ fontSize: 12, color: 'rgba(242,230,208,0.55)', lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
