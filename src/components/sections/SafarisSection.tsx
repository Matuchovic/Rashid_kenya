import Link from 'next/link'
import { SAFARIS } from '@/lib/data'
import { SafariCard } from '@/components/ui/SafariCard'
import { Reveal } from '@/components/ui/Reveal'

export function SafarisSection() {
  const featured = SAFARIS.filter(s => s.featured)

  return (
    <section id="safaris" className="px-[72px] py-[110px]">
      <div className="max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-[60px] gap-6">
          <Reveal>
            <p className="eyebrow mb-3.5">Curated Journeys</p>
            <h2 className="section-title">Signature <em>Safaris</em></h2>
          </Reveal>
          <Reveal>
            <Link
              href="/safaris"
              className="text-[12px] tracking-[0.08em] pb-1 cursor-none"
              style={{
                color: '#D9A441',
                borderBottom: '1px solid rgba(217,164,65,0.35)',
                textDecoration: 'none',
              }}
            >
              View all 24 safaris →
            </Link>
          </Reveal>
        </div>

        {/* Grid: large card left + 2×2 right */}
        <div className="grid gap-5" style={{ gridTemplateColumns: '1.5fr 1fr 1fr' }}>
          {/* Hero card */}
          <Reveal className="row-span-2">
            <SafariCard safari={featured[0]} large />
          </Reveal>

          {/* Two regular cards */}
          {featured.slice(1).map((safari, i) => (
            <Reveal key={safari.id} delay={(i % 2 + 1) as 1 | 2}>
              <SafariCard safari={safari} />
            </Reveal>
          ))}

          {/* Non-featured extras (2 more) */}
          {SAFARIS.filter(s => !s.featured).slice(0, 2).map((safari, i) => (
            <Reveal key={safari.id} delay={(i % 2 + 1) as 1 | 2}>
              <SafariCard safari={safari} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
