'use client'

import { useState } from 'react'
import { DESTINATIONS } from '@/lib/data'
import { Reveal } from '@/components/ui/Reveal'

const FEATURES = [
  {
    num: '01',
    title: 'The Great Migration',
    desc: 'Over 1.5 million wildebeest, 200,000 zebra and 500,000 gazelle complete their annual journey through the Serengeti–Mara ecosystem — the single greatest wildlife event on Earth, and it happens here, every year.',
  },
  {
    num: '02',
    title: 'Year-Round Wildlife',
    desc: 'Kenya\'s 58 national parks and conservancies guarantee extraordinary game viewing every month. From elephant nurseries in Amboseli to flamingo lakes in Nakuru, no destination offers this variety.',
  },
  {
    num: '03',
    title: 'Uncompromising Luxury',
    desc: 'Kenya\'s finest tented camps pioneer a new category: genuine wilderness with five-star comfort. Private plunge pools, sommelier-curated wine lists, and Michelin-calibre chefs — all within earshot of lions calling at dusk.',
  },
  {
    num: '04',
    title: 'Conservation Impact',
    desc: 'Every safari we run directly funds anti-poaching units, Maasai community scholarships, and wildlife corridors. Your journey protects the very world you came to witness.',
  },
]

export function WhyKenyaSection() {
  const [activeDestination, setActiveDestination] = useState<string | null>(null)

  return (
    <section
      id="destinations"
      className="px-[72px] py-[110px]"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,10,0,0.8) 0%, #050505 100%)' }}
    >
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <p className="eyebrow mb-3.5">Why Kenya</p>
          <h2 className="section-title">Africa's Most <em>Iconic</em><br />Safari Destination</h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-16 items-center">
          {/* Features list */}
          <div>
            {FEATURES.map((f, i) => (
              <Reveal key={f.num} delay={(i % 4) as 0|1|2|3}>
                <div
                  className="flex gap-6 py-7 transition-colors duration-200"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span
                    className="flex-shrink-0 mt-0.5"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: '#D9A441', minWidth: 28 }}
                  >
                    {f.num}
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-white mb-2">{f.title}</p>
                    <p className="text-[13px] text-muted leading-[1.75]">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Interactive map */}
          <Reveal className="flex justify-center relative">
            {/* Glow */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{ width: 350, height: 350, background: 'radial-gradient(circle, rgba(217,164,65,0.10) 0%, transparent 70%)' }}
            />
            <svg viewBox="0 0 340 390" width="340" height="390" role="img" aria-label="Map of Kenya showing major national parks">
              <title>Kenya National Parks Map</title>
              <defs>
                <radialGradient id="mapBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="#D9A441" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#D9A441" stopOpacity="0"    />
                </radialGradient>
              </defs>
              <ellipse cx="170" cy="195" rx="155" ry="155" fill="url(#mapBg)" />
              {/* Kenya border */}
              <path
                d="M118,32 L198,26 L252,62 L278,120 L282,178 L265,225 L238,268 L222,330 L195,355 L176,342 L160,298 L138,265 L105,242 L68,202 L55,162 L60,112 L80,68 Z"
                fill="rgba(217,164,65,0.07)"
                stroke="rgba(217,164,65,0.30)"
                strokeWidth="1.5"
              />
              {/* Lake Victoria */}
              <ellipse cx="78" cy="255" rx="22" ry="16" fill="rgba(40,80,160,0.25)" stroke="rgba(80,120,200,0.3)" strokeWidth="1" />
              <text x="55" y="278" fontFamily="Inter" fontSize="8" fill="rgba(100,150,255,0.55)">Lake Victoria</text>
              {/* Nairobi */}
              <circle cx="168" cy="198" r="5" fill="rgba(255,255,255,0.55)" />
              <circle cx="168" cy="198" r="10" fill="rgba(255,255,255,0.07)" />
              <text x="178" y="195" fontFamily="Inter" fontSize="9" fill="rgba(255,255,255,0.40)">Nairobi</text>
              {/* Hotspots */}
              {DESTINATIONS.map(d => (
                <g
                  key={d.id}
                  className="cursor-none"
                  onMouseEnter={() => setActiveDestination(d.id)}
                  onMouseLeave={() => setActiveDestination(null)}
                >
                  <circle cx={d.cx} cy={d.cy} r={activeDestination === d.id ? 28 : 22} fill={d.color} fillOpacity="0.05" style={{ transition: 'r 0.2s' }} />
                  <circle cx={d.cx} cy={d.cy} r={activeDestination === d.id ? 16 : 12} fill={d.color} fillOpacity="0.12" style={{ transition: 'r 0.2s' }} />
                  <circle cx={d.cx} cy={d.cy} r={activeDestination === d.id ? 8 : 6}  fill={d.color} fillOpacity="0.95" style={{ transition: 'r 0.2s' }} />
                  <text x={d.cx + 14} y={d.cy - 2}  fontFamily="Inter" fontSize="10" fill="rgba(255,255,255,0.80)" fontWeight="500">{d.name}</text>
                  <text x={d.cx + 14} y={d.cy + 11} fontFamily="Inter" fontSize="8.5" fill="rgba(217,164,65,0.65)">{d.subtitle}</text>
                </g>
              ))}
              {/* Connection lines */}
              <g stroke="rgba(217,164,65,0.16)" strokeWidth="0.75" strokeDasharray="4,5" fill="none">
                {DESTINATIONS.map(d => (
                  <line key={d.id} x1="168" y1="198" x2={d.cx} y2={d.cy} />
                ))}
              </g>
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
