import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { SAFARIS } from '@/lib/data'
import { Footer } from '@/components/layout/Footer'
import { Reveal } from '@/components/ui/Reveal'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return SAFARIS.map(s => ({ slug: s.slug }))
}

export function generateMetadata({ params }: PageProps) {
  const safari = SAFARIS.find(s => s.slug === params.slug)
  if (!safari) return {}
  return {
    title: `${safari.name} — Rashid Adventures Kenya`,
    description: safari.description,
  }
}

export default function SafariDetailPage({ params }: PageProps) {
  const safari = SAFARIS.find(s => s.slug === params.slug)
  if (!safari) notFound()

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative" style={{ height: '85vh', minHeight: 560 }}>
        <Image
          src={safari.image}
          alt={safari.imageAlt}
          fill
          className="object-cover"
          priority
          style={{ filter: 'brightness(0.75) saturate(1.1)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, #050505 0%, rgba(5,5,5,0.5) 40%, rgba(5,5,5,0.1) 70%)',
          }}
        />
        {/* Breadcrumb */}
        <div
          className="absolute top-28 left-[72px] flex items-center gap-2 text-[11px] text-dim tracking-[0.08em] rounded-full px-4 py-2"
          style={{ background: 'rgba(5,5,5,0.55)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          <Link href="/" className="hover:text-white transition-colors cursor-none">Home</Link>
          <span>/</span>
          <Link href="/safaris" className="hover:text-white transition-colors cursor-none">Safaris</Link>
          <span>/</span>
          <span className="text-white">{safari.name}</span>
        </div>

        {/* Title + quick stats */}
        <div className="absolute bottom-0 left-[72px] right-[72px] pb-14">
          <p className="eyebrow mb-4" style={{ color: '#D9A441' }}>{safari.tag}</p>
          <h1
            className="text-white mb-8"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 300, lineHeight: 0.94 }}
          >
            {safari.name}
          </h1>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Duration',    value: safari.duration },
              { label: 'Stay',        value: safari.accommodation },
              { label: 'From',        value: `$${safari.price.toLocaleString()} / person` },
              { label: 'Rating',      value: '★ 4.97' },
              { label: 'Group size',  value: safari.groupSize },
              { label: 'Best season', value: safari.bestSeason },
            ].map(s => (
              <div
                key={s.label}
                className="rounded-full px-5 py-2.5"
                style={{ background: 'rgba(5,5,5,0.68)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <span className="text-[10px] text-dim tracking-[0.08em] uppercase mr-2">{s.label}</span>
                <span className="text-[13px] font-medium text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1180px] mx-auto px-[72px] py-[90px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <Reveal>
              <h2
                className="text-white mb-6"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, fontWeight: 300 }}
              >
                Overview
              </h2>
              {safari.longDescription.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-muted leading-[1.85] mb-5">{para}</p>
              ))}
            </Reveal>

            {/* Highlights */}
            <Reveal>
              <h2
                className="text-white mb-6 mt-14"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, fontWeight: 300 }}
              >
                Highlights
              </h2>
              <ul className="flex flex-col gap-3 list-none">
                {safari.highlights.map(h => (
                  <li key={h} className="flex items-start gap-3 text-sm text-muted">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-0.5" style={{ background: 'rgba(217,164,65,0.15)', color: '#D9A441' }}>✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Itinerary */}
            <Reveal>
              <h2
                className="text-white mb-8 mt-14"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, fontWeight: 300 }}
              >
                Day-by-Day Itinerary
              </h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: 'rgba(217,164,65,0.2)' }} />
                <div className="flex flex-col gap-0">
                  {safari.itinerary.map((day, i) => (
                    <div key={day.day} className="flex gap-6 pb-8 relative">
                      {/* Day number */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-medium flex-shrink-0 z-10"
                        style={{ background: '#0a0600', border: '1px solid rgba(217,164,65,0.4)', color: '#D9A441' }}
                      >
                        {day.day}
                      </div>
                      <div className="pt-2">
                        <p className="text-[13px] font-medium text-white mb-2">{day.title}</p>
                        <p className="text-[13px] text-muted leading-[1.75]">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* What's included */}
            <Reveal>
              <h2
                className="text-white mb-6 mt-14"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, fontWeight: 300 }}
              >
                What's Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {safari.included.map(item => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-4 rounded-xl text-sm text-muted"
                    style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span style={{ color: '#D9A441' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar: booking widget */}
          <div className="lg:col-span-1">
            <div
              className="sticky rounded-2xl p-7"
              style={{ top: 120, background: '#0a0600', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <p className="text-[10px] tracking-[0.14em] uppercase mb-1" style={{ color: '#D9A441' }}>From</p>
              <p
                className="text-white mb-1"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 48, fontWeight: 300, lineHeight: 1 }}
              >
                ${safari.price.toLocaleString()}
              </p>
              <p className="text-[11px] text-dim mb-7">per person · all inclusive</p>

              <div className="flex flex-col gap-3 mb-6">
                {[
                  { label: 'Duration',    value: safari.duration },
                  { label: 'Difficulty',  value: safari.difficulty },
                  { label: 'Group size',  value: safari.groupSize },
                  { label: 'Best season', value: safari.bestSeason },
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-[13px] py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-dim">{row.label}</span>
                    <span className="text-white font-medium">{row.value}</span>
                  </div>
                ))}
              </div>

              <Link href="/booking" className="btn-primary w-full justify-center text-center">
                Book This Safari →
              </Link>
              <Link href="/contact" className="btn-ghost w-full justify-center text-center mt-3">
                Speak to an Expert
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
