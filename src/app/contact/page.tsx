'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'
import { Reveal } from '@/components/ui/Reveal'

const ENQUIRY_TYPES = [
  'Planning a new safari',
  'Requesting a custom itinerary',
  'Group booking (8+ guests)',
  'Honeymoon or special occasion',
  'Photography expedition',
  'General question',
]

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', type: '', message: '' })
  const [submitted, setSubmit] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmit(true)
  }

  return (
    <>
      {/* Hero */}
      <div
        className="relative flex items-end"
        style={{ height: '44vh', minHeight: 360, background: 'linear-gradient(180deg, #0c0500 0%, #1e0c00 45%, #050505 100%)' }}
      >
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(255,150,30,0.28) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1180px] mx-auto px-[72px] pb-16 w-full">
          <Reveal>
            <p className="eyebrow mb-4">Get in Touch</p>
            <h1 className="text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(44px, 5.5vw, 72px)', fontWeight: 300, lineHeight: 0.96 }}>
              Let's Design<br /><em style={{ color: '#D9A441', fontStyle: 'italic' }}>Your Safari</em>
            </h1>
          </Reveal>
        </div>
      </div>

      {/* Content */}
      <section className="px-[72px] py-[80px]">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-20">

          {/* Left info */}
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-sm text-muted leading-[1.85] mb-10">
                Our safari experts are available seven days a week. We respond to all enquiries within 4 hours during business hours (EAT, UTC+3).
              </p>
            </Reveal>

            {/* Contact cards */}
            <div className="flex flex-col gap-4 mb-10">
              {[
                { icon: '📞', title: 'Phone & WhatsApp', value: '+254 722 456 789', sub: 'Mon – Sun · 7am – 8pm EAT' },
                { icon: '✉️', title: 'Email',             value: 'hello@rashidadventures.com', sub: 'Response within 4 hours' },
                { icon: '📍', title: 'Nairobi Office',    value: 'Karen, Nairobi, Kenya', sub: 'Visits by appointment' },
              ].map(c => (
                <Reveal key={c.title}>
                  <div className="flex items-start gap-4 p-5 rounded-xl" style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'rgba(217,164,65,0.12)' }}>
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.10em] uppercase text-dim mb-1">{c.title}</p>
                      <p className="text-[13px] font-medium text-white">{c.value}</p>
                      <p className="text-[11px] text-dim mt-0.5">{c.sub}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Certifications */}
            <Reveal>
              <div className="p-5 rounded-xl" style={{ background: 'rgba(217,164,65,0.05)', border: '1px solid rgba(217,164,65,0.15)' }}>
                <p className="text-[10px] tracking-[0.12em] uppercase text-dim mb-3">Certified & Licensed</p>
                <div className="flex flex-col gap-2">
                  {['Kenya Tourism Board Licensed', 'KATO Member', 'Eco-Certified Operator', 'ABTA Registered'].map(c => (
                    <div key={c} className="flex items-center gap-2 text-[12px] text-muted">
                      <span className="text-[10px]" style={{ color: '#D9A441' }}>✓</span>{c}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            {!submitted ? (
              <Reveal>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-5">
                    {[
                      { label: 'Your Name',     key: 'name',  type: 'text',  placeholder: 'Full name' },
                      { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' },
                    ].map(f => (
                      <div key={f.key}>
                        <p className="text-[10px] tracking-[0.12em] uppercase text-dim mb-2">{f.label}</p>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          required
                          value={(form as any)[f.key]}
                          onChange={e => setForm(fo => ({ ...fo, [f.key]: e.target.value }))}
                          className="w-full rounded-xl px-5 py-4 text-sm text-white placeholder-white/20 outline-none cursor-none"
                          style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.10)' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-dim mb-2">Phone / WhatsApp</p>
                    <input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full rounded-xl px-5 py-4 text-sm text-white placeholder-white/20 outline-none cursor-none"
                      style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.10)' }}
                    />
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-dim mb-2">Type of Enquiry</p>
                    <select
                      value={form.type}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                      className="w-full rounded-xl px-5 py-4 text-sm text-white outline-none cursor-none appearance-none"
                      style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.10)', colorScheme: 'dark' }}
                    >
                      <option value="" disabled>Select an option…</option>
                      {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-dim mb-2">Tell Us Your Vision</p>
                    <textarea
                      rows={5}
                      placeholder="When do you want to travel? How many guests? What experience are you looking for? The more you share, the better we can design your safari."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full rounded-xl px-5 py-4 text-sm text-white placeholder-white/20 outline-none resize-none cursor-none"
                      style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.10)' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary justify-center text-center py-4">
                    Send Enquiry →
                  </button>
                  <p className="text-[11px] text-dim text-center">
                    We reply within 4 hours during business hours. No obligation.
                  </p>
                </form>
              </Reveal>
            ) : (
              <Reveal>
                <div className="text-center py-20">
                  <div className="text-6xl mb-6">🌍</div>
                  <h2 className="text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 40, fontWeight: 300 }}>
                    <em style={{ color: '#D9A441', fontStyle: 'italic' }}>Asante</em> — Thank You
                  </h2>
                  <p className="text-sm text-muted max-w-[360px] mx-auto leading-[1.75] mb-8">
                    Your message has been received. Our team will be in touch within 4 hours to begin designing your safari.
                  </p>
                  <Link href="/" className="btn-primary inline-flex">Return to Homepage →</Link>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
