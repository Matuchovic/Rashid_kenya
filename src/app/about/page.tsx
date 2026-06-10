import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'
import { Reveal } from '@/components/ui/Reveal'

export const metadata = {
  title: 'About Us — Rashid Adventures Kenya',
  description: 'Founded in Nairobi in 1997, Rashid Adventures Kenya has spent 27 years connecting travellers with Kenya\'s most extraordinary wildlife and wild places.',
}

const TEAM = [
  { initials: 'RA', name: 'Rashid Ahmed', role: 'Founder & Lead Guide', years: '27 years', bio: 'Born in Nairobi, Rashid spent his childhood tracking game with his grandfather in the Masai Mara. He founded the company in 1997 with one Land Cruiser and an absolute conviction that small, personal, slow safaris beat every other kind.' },
  { initials: 'FK', name: 'Fatuma Kariuki', role: 'Head of Operations', years: '14 years', bio: 'Fatuma ensures every logistics detail is invisible to guests. A former conservation biologist, she also leads our wildlife photography tours and knows the Amboseli elephant families by name.' },
  { initials: 'SM', name: 'Samuel Mutua', role: 'Senior Safari Guide', years: '19 years', bio: 'Samuel is a Kamba elder\'s son who grew up tracking leopard in Tsavo. He holds Kenya\'s highest guiding certification and has been profiled in National Geographic Traveler.' },
  { initials: 'NT', name: 'Naomi Tiampati', role: 'Maasai Cultural Guide', years: '11 years', bio: 'Naomi is a Maasai warrior\'s daughter who bridges two worlds with grace and intelligence. Her cultural walks in the Mara conservancies are unlike anything else available in Kenya.' },
]

const PRESS = [
  { name: 'National Geographic', note: '"Kenya\'s finest private operator"' },
  { name: 'Condé Nast Traveller', note: '"Gold List — Best Safari Operators"' },
  { name: 'Forbes Travel Guide', note: '"Five-Star Recommended"' },
  { name: 'The Times',           note: '"The safari company that gets it right"' },
]

const TIMELINE = [
  { year: '1997', event: 'Rashid Ahmed founds the company with one Land Cruiser and three guides.' },
  { year: '2003', event: 'First private conservancy partnership in the Mara, before it was fashionable.' },
  { year: '2009', event: 'Launch of the Conservation Fund, now supporting 12 Maasai communities.' },
  { year: '2014', event: 'Named KATO\'s Operator of the Year for the first time.' },
  { year: '2018', event: 'Expanded to Samburu and Laikipia, completing Kenya\'s Northern Circuit.' },
  { year: '2024', event: '10,000th guest. 99.4% recommendation rate. Still the same philosophy.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div
        className="relative flex items-end"
        style={{ height: '70vh', minHeight: 480, background: 'linear-gradient(180deg, #0c0500 0%, #2d1400 45%, #050505 100%)' }}
      >
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(255,160,30,0.35) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1180px] mx-auto px-[72px] pb-20 w-full">
          <Reveal>
            <p className="eyebrow mb-4">Since 1997</p>
            <h1 className="text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 300, lineHeight: 0.95 }}>
              Born <em style={{ color: '#D9A441', fontStyle: 'italic' }}>in the Wild</em>
            </h1>
          </Reveal>
        </div>
      </div>

      {/* Story */}
      <section className="px-[72px] py-[100px]">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <p className="eyebrow mb-4">Our Story</p>
            <h2 className="section-title mb-8">One man. One Land Cruiser. <em>One conviction.</em></h2>
            <p className="text-sm text-muted leading-[1.85] mb-5">
              In 1997, Rashid Ahmed loaded his grandfather's binoculars, a cooler box, and three Maasai guides into a borrowed Land Cruiser and drove into the Masai Mara. He had no website, no brochure, and no idea what he was doing. He had only an absolute conviction that the way most safari companies operated — hurried, crowded, transactional — was wrong.
            </p>
            <p className="text-sm text-muted leading-[1.85] mb-5">
              Twenty-seven years later, Rashid Adventures Kenya operates across every major ecosystem in the country, has guided over 10,000 guests, and funds conservation work in 12 Maasai communities. The Land Cruiser is newer. The philosophy has not changed.
            </p>
            <p className="text-sm text-muted leading-[1.85]">
              We make safaris for people who understand that wild places deserve patience, that the best guide is the one who knows when to say nothing, and that luxury in Africa means proximity to wildness — not distance from it.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <Image
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80&auto=format&fit=crop"
                alt="Elephant herd on the Kenyan savanna"
                fill className="object-cover" style={{ filter: 'brightness(0.85) saturate(1.1)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(5,5,5,0.4) 0%, transparent 60%)' }} />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="gold-divider mx-[72px]" />

      {/* Numbers */}
      <section className="px-[72px] py-[100px]">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="eyebrow mb-4">By the Numbers</p>
            <h2 className="section-title mb-14">27 years in <em>numbers</em></h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '27',    label: 'Years guiding Kenya' },
              { num: '10K+',  label: 'Guests guided' },
              { num: '58',    label: 'Parks & reserves visited' },
              { num: '99.4%', label: 'Recommendation rate' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={(i % 4) as 0|1|2|3}>
                <div className="p-8 rounded-2xl text-center" style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 56, fontWeight: 300, color: '#D9A441', lineHeight: 1 }}>{s.num}</p>
                  <p className="text-[12px] text-muted mt-3 leading-[1.5]">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider mx-[72px]" />

      {/* Team */}
      <section id="guides" className="px-[72px] py-[100px]">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="eyebrow mb-4">The People</p>
            <h2 className="section-title mb-14">Meet the <em>guides</em></h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={(i % 2) as 0|1}>
                <div className="p-8 rounded-2xl" style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-medium flex-shrink-0" style={{ background: 'linear-gradient(135deg, #D9A441, #8B5E1E)', color: '#050505' }}>
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-white">{member.name}</p>
                      <p className="text-[11px] text-dim mt-0.5">{member.role} · {member.years} experience</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-muted leading-[1.75]">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider mx-[72px]" />

      {/* Conservation */}
      <section id="conservation" className="px-[72px] py-[100px]" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,10,0,0.8) 0%, #050505 100%)' }}>
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal>
            <p className="eyebrow justify-center mb-4">Conservation Fund</p>
            <h2 className="section-title mb-6">Every safari <em>gives back</em></h2>
            <p className="text-sm text-muted leading-[1.85] mb-5">
              5% of every booking goes directly to the Rashid Adventures Conservation Fund — funding anti-poaching ranger units, Maasai secondary school scholarships, community water projects, and land purchase to extend wildlife corridors.
            </p>
            <p className="text-sm text-muted leading-[1.85] mb-10">
              We don\'t call this responsible tourism. We call it the cost of doing business in a place this extraordinary.
            </p>
          </Reveal>
          <div className="grid grid-cols-3 gap-5">
            {[
              { num: '12', label: 'Communities supported' },
              { num: '340', label: 'Scholarships awarded' },
              { num: '$2.1M', label: 'Invested since 2009' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={(i % 3) as 0|1|2}>
                <div className="p-6 rounded-xl" style={{ background: 'rgba(217,164,65,0.06)', border: '1px solid rgba(217,164,65,0.15)' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 40, fontWeight: 300, color: '#D9A441', lineHeight: 1 }}>{s.num}</p>
                  <p className="text-[11px] text-muted mt-2">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider mx-[72px]" />

      {/* Press */}
      <section id="press" className="px-[72px] py-[80px]">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="eyebrow mb-4">In the Press</p>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {PRESS.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) as 0|1|2|3}>
                <div className="p-6 rounded-xl text-center" style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[13px] font-medium text-white mb-2">{p.name}</p>
                  <p className="text-[11px] text-dim italic leading-[1.5]">{p.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-[72px] py-[80px]">
        <div className="max-w-[700px] mx-auto">
          <Reveal>
            <p className="eyebrow mb-4">Timeline</p>
            <h2 className="section-title mb-12">27 years in <em>the making</em></h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: 'rgba(217,164,65,0.2)' }} />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={(i % 3) as 0|1|2}>
                <div className="flex gap-6 pb-8">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10" style={{ background: '#050505', border: '1px solid rgba(217,164,65,0.4)', color: '#D9A441', fontSize: 10, fontWeight: 500 }}>
                    {t.year.slice(2)}
                  </div>
                  <div className="pt-2">
                    <p className="text-[11px] tracking-[0.12em] uppercase mb-1" style={{ color: '#D9A441' }}>{t.year}</p>
                    <p className="text-[13px] text-muted leading-[1.7]">{t.event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="px-[72px] pb-[100px]">
        <div className="max-w-[1180px] mx-auto rounded-2xl p-14 text-center" style={{ background: 'linear-gradient(135deg, #150900, #251200 50%, #150900)', border: '1px solid rgba(217,164,65,0.18)' }}>
          <h2 className="text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 44, fontWeight: 300 }}>
            Ready to <em style={{ color: '#D9A441', fontStyle: 'italic' }}>meet Kenya</em>?
          </h2>
          <p className="text-sm text-muted mb-8 max-w-[400px] mx-auto leading-[1.75]">27 years of guiding. One standard. Let us craft your journey.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/booking" className="btn-primary">Start Planning →</Link>
            <Link href="/contact" className="btn-ghost">Contact the team</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
