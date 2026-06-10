import { SAFARIS } from '@/lib/data'
import { SafariCard } from '@/components/ui/SafariCard'
import { Footer } from '@/components/layout/Footer'
import { Reveal } from '@/components/ui/Reveal'

export const metadata = {
  title: 'All Safaris — Rashid Adventures Kenya',
  description: 'Browse our full collection of luxury Kenya safari experiences — from the Great Migration to Amboseli, Tsavo, and Samburu.',
}

export default function SafarisPage() {
  return (
    <>
      {/* Hero banner */}
      <div
        className="relative flex items-end"
        style={{
          height: '50vh', minHeight: 420,
          background: `
            radial-gradient(ellipse 60% 50% at 50% 20%, rgba(255,160,30,0.40) 0%, transparent 60%),
            linear-gradient(180deg, #0c0500 0%, #2d1500 40%, #050505 100%)
          `,
        }}
      >
        <div className="relative z-10 max-w-[1180px] mx-auto px-[72px] pb-20 w-full">
          <Reveal>
            <p className="eyebrow mb-4">Kenya Safari Collection</p>
            <h1
              className="text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 300, lineHeight: 0.95 }}
            >
              All <em style={{ color: '#D9A441', fontStyle: 'italic' }}>Safaris</em>
            </h1>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-5 text-sm text-muted max-w-[440px] leading-[1.75]">
              {SAFARIS.length} curated journeys across Kenya's most extraordinary wilderness.
              Every safari is crafted exclusively for you.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Grid */}
      <section className="px-[72px] py-[80px]">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SAFARIS.map((safari, i) => (
              <Reveal key={safari.id} delay={(i % 3) as 0|1|2}>
                <SafariCard safari={safari} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
