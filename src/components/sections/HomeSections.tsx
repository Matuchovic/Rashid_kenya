import Image from 'next/image'
import Link from 'next/link'
import { EXPERIENCES, TESTIMONIALS, GALLERY_IMAGES } from '@/lib/data'
import { Reveal } from '@/components/ui/Reveal'

/* ─────────────────────────────────────────────────────────── */
/* EXPERIENCES                                                  */
/* ─────────────────────────────────────────────────────────── */
export function ExperiencesSection() {
  return (
    <section id="experiences" className="px-[72px] py-[110px]">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-end justify-between mb-[60px]">
          <Reveal>
            <p className="eyebrow mb-3.5">Crafted for You</p>
            <h2 className="section-title">Signature <em>Experiences</em></h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.title} delay={(i % 4) as 0|1|2|3}>
              <div
                className="relative rounded-[18px] p-8 overflow-hidden group transition-all duration-300 cursor-none"
                style={{
                  background: '#0a0600',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Gold bottom line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-70 transition-opacity"
                  style={{ background: 'linear-gradient(90deg, transparent, #D9A441, transparent)' }}
                />
                <span className="block text-3xl mb-5">{exp.icon}</span>
                <h3
                  className="text-white mb-2.5"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 19, fontWeight: 300, lineHeight: 1.2 }}
                >
                  {exp.title}
                </h3>
                <p className="text-[11.5px] text-muted leading-[1.75]">{exp.description}</p>
                <Link
                  href={exp.link}
                  className="inline-block mt-[18px] text-[11px] tracking-[0.06em] cursor-none"
                  style={{ color: '#D9A441' }}
                >
                  Learn more →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* GALLERY                                                      */
/* ─────────────────────────────────────────────────────────── */
export function GallerySection() {
  return (
    <section id="gallery" className="py-[110px]" style={{ background: '#050505' }}>
      <div className="max-w-[1180px] mx-auto px-[72px]">
        <div className="flex items-end justify-between mb-[60px]">
          <Reveal>
            <p className="eyebrow mb-3.5">From the Field</p>
            <h2 className="section-title">Kenya Through <em>Our Eyes</em></h2>
          </Reveal>
          <Reveal>
            <Link
              href="/#gallery"
              className="text-[12px] tracking-[0.08em] pb-1 cursor-none"
              style={{ color: '#D9A441', borderBottom: '1px solid rgba(217,164,65,0.35)', textDecoration: 'none' }}
            >
              Full gallery →
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Masonry-style grid */}
      <div
        className="px-[72px] max-w-[1320px] mx-auto"
        style={{ columns: 4, columnGap: 16 }}
      >
        {GALLERY_IMAGES.map((img, i) => (
          <Reveal key={img.src} delay={(i % 4) as 0|1|2|3} className="mb-4 break-inside-avoid">
            <div className="relative rounded-[14px] overflow-hidden group cursor-none">
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={i % 3 === 0 ? 540 : 300}
                className="w-full block object-cover transition-all duration-500 group-hover:scale-[1.03]"
                style={{ filter: 'brightness(0.88) saturate(1.05)' }}
              />
              {/* Caption on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                style={{ background: 'linear-gradient(0deg, rgba(5,5,5,0.75) 0%, transparent 100%)' }}
              >
                <span className="text-[11px] text-white/70 tracking-[0.05em]">{img.caption}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* TESTIMONIALS                                                 */
/* ─────────────────────────────────────────────────────────── */
export function TestimonialsSection() {
  return (
    <section className="px-[72px] py-[110px]">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex items-end justify-between mb-[60px]">
          <Reveal>
            <p className="eyebrow mb-3.5">Guest Stories</p>
            <h2 className="section-title">Voices from <em>the Wild</em></h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) as 0|1|2}>
              <div
                className="rounded-[22px] p-8 transition-all duration-300 cursor-none"
                style={{
                  background: 'rgba(255,255,255,0.055)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
              >
                <p className="text-[12px] tracking-[3px] mb-[18px]" style={{ color: '#D9A441' }}>
                  {'★'.repeat(t.rating)}
                </p>
                <p
                  className="mb-6"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 17, fontWeight: 300, fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.85)', lineHeight: 1.75,
                  }}
                >
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #D9A441, #8B5E1E)', color: '#050505' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white mb-0.5">{t.name}</p>
                    <p className="text-[11px] text-dim">{t.location} · {t.safari}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* CTA SECTION                                                  */
/* ─────────────────────────────────────────────────────────── */
export function CtaSection() {
  return (
    <div
      className="mx-14 mb-24 rounded-[30px] relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(217,164,65,0.12) 0%, transparent 70%), linear-gradient(135deg, #150900 0%, #251200 50%, #150900 100%)',
        border: '1px solid rgba(217,164,65,0.18)',
        padding: '90px 80px',
      }}
    >
      {/* Glow orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -80, right: -80, width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,164,65,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 relative">
        {/* Left */}
        <div className="max-w-[480px]">
          <p className="eyebrow mb-4">Begin Your Journey</p>
          <h2
            className="text-white mb-[18px]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(40px, 4.5vw, 58px)', fontWeight: 300, lineHeight: 1.06,
            }}
          >
            Your <em style={{ color: '#D9A441', fontStyle: 'italic' }}>African</em><br />
            Dream Awaits
          </h2>
          <p className="text-sm text-muted leading-[1.75] mb-9">
            Every safari we create is exclusive to you. Tell us the feeling you're searching for —
            awe, solitude, discovery, connection — and we will build the journey that delivers it.
            No templates. No crowds. No compromises.
          </p>
          <div className="flex gap-3.5">
            <Link href="/booking" className="btn-primary">
              Start Planning
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs" style={{ background: 'rgba(0,0,0,0.2)' }}>→</span>
            </Link>
            <Link href="/contact" className="btn-ghost">Speak to an Expert</Link>
          </div>
        </div>

        {/* Right stats */}
        <div className="flex flex-col gap-4 flex-shrink-0">
          {[
            { num: '27', label: 'Years guiding Kenya\'s wilderness' },
            { num: '99.4%', label: 'Guests who recommend us to a friend' },
          ].map(s => (
            <div
              key={s.num}
              className="rounded-[18px] px-8 py-6"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', minWidth: 230 }}
            >
              <p
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 48, fontWeight: 300, color: '#D9A441', lineHeight: 1, marginBottom: 6 }}
              >{s.num}</p>
              <p className="text-[11px] text-dim tracking-[0.08em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* BOOKING BAR (sticky)                                         */
/* ─────────────────────────────────────────────────────────── */
export function BookingBar() {
  const fields = [
    { icon: '📍', label: 'Destination',    value: 'Masai Mara' },
    { icon: '📅', label: 'Travel Dates',   value: 'Jul 24 — Aug 3, 2026' },
    { icon: '👥', label: 'Guests',         value: '2 Travelers' },
    { icon: '🏕️', label: 'Accommodation',  value: 'Luxury Tented Camp' },
  ]

  return (
    <div
      id="booking"
      className="sticky bottom-0 z-[900] flex items-center gap-0 px-[72px] py-[18px]"
      style={{
        background: 'rgba(8,5,0,0.94)',
        backdropFilter: 'blur(40px)',
        borderTop: '1px solid rgba(217,164,65,0.14)',
      }}
    >
      {fields.map((f, i) => (
        <div key={f.label} className="flex items-center gap-3 flex-1">
          <div
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[15px] flex-shrink-0"
            style={{ background: 'rgba(217,164,65,0.12)' }}
          >
            {f.icon}
          </div>
          <div>
            <p className="text-[10px] text-dim tracking-[0.10em] uppercase mb-[3px]">{f.label}</p>
            <p className="text-[13px] font-medium text-white">{f.value}</p>
          </div>
          {i < fields.length - 1 && (
            <div className="w-px h-8 ml-8 mr-8 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.08)' }} />
          )}
        </div>
      ))}
      <Link
        href="/booking"
        className="btn-primary ml-8 flex-shrink-0 text-[13px] px-8"
      >
        Explore Parks →
      </Link>
    </div>
  )
}
