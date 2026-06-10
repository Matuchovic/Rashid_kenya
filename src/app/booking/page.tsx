'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SAFARIS } from '@/lib/data'
import { Logo } from '@/components/ui/Logo'

const STEPS = ['Destination', 'Dates', 'Guests', 'Accommodation', 'Summary', 'Checkout']

const ACCOMMODATIONS = [
  { id: 'standard', name: 'Tented Camp', desc: 'Authentic bush experience with comfortable amenities', price: 0, icon: '🏕️' },
  { id: 'luxury',   name: 'Luxury Lodge', desc: 'Five-star lodge with private plunge pool and full service', price: 1200, icon: '✨' },
  { id: 'ultra',    name: 'Ultra-Premium Villa', desc: 'Exclusive private villa, personal chef, and butler service', price: 3500, icon: '👑' },
]

export default function BookingPage() {
  const [step, setStep]             = useState(0)
  const [selectedSafari, setSafari] = useState<string>('')
  const [dates, setDates]           = useState({ start: '', end: '' })
  const [guests, setGuests]         = useState({ adults: 2, children: 0, infants: 0 })
  const [accommodation, setAccom]   = useState('luxury')
  const [submitted, setSubmitted]   = useState(false)
  const [form, setForm]             = useState({ name: '', email: '', requests: '' })

  const safari = SAFARIS.find(s => s.slug === selectedSafari)
  const accom  = ACCOMMODATIONS.find(a => a.id === accommodation)
  const basePrice = safari?.price ?? 0
  const accomAdj  = accom?.price ?? 0
  const totalPrice = (basePrice + accomAdj) * (guests.adults + guests.children)

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const prevStep = () => setStep(s => Math.max(s - 1, 0))

  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>
      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 px-12 py-5 flex items-center justify-between"
        style={{ background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(40px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Logo size="sm" />
        <Link href="/" className="text-[11px] text-dim hover:text-white transition-colors cursor-none tracking-[0.06em]">
          ← Back to site
        </Link>
      </div>

      {/* Progress bar */}
      <div className="fixed top-[68px] left-0 right-0 z-40 px-12 py-4" style={{ background: 'rgba(5,5,5,0.85)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-[800px] mx-auto flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <button
                onClick={() => i < step && setStep(i)}
                className="flex flex-col items-center gap-1.5 cursor-none group"
                style={{ opacity: i > step ? 0.35 : 1 }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium transition-all"
                  style={{
                    background: i < step ? '#D9A441' : i === step ? 'rgba(217,164,65,0.2)' : 'rgba(255,255,255,0.07)',
                    border: i === step ? '1.5px solid #D9A441' : '1.5px solid transparent',
                    color: i < step ? '#050505' : i === step ? '#D9A441' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-[9px] tracking-[0.08em] uppercase" style={{ color: i === step ? '#D9A441' : 'rgba(255,255,255,0.35)' }}>
                  {s}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-2" style={{ background: i < step ? 'rgba(217,164,65,0.5)' : 'rgba(255,255,255,0.08)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="pt-[156px] pb-24 max-w-[800px] mx-auto px-8">

        {/* STEP 0 — Destination */}
        {step === 0 && (
          <div>
            <h2 className="text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 44, fontWeight: 300 }}>
              Choose your <em style={{ color: '#D9A441', fontStyle: 'italic' }}>safari</em>
            </h2>
            <p className="text-sm text-muted mb-10">Select the experience that calls to you.</p>
            <div className="flex flex-col gap-4">
              {SAFARIS.map(s => (
                <button
                  key={s.slug}
                  onClick={() => setSafari(s.slug)}
                  className="flex items-center gap-5 p-5 rounded-2xl text-left transition-all duration-200 cursor-none"
                  style={{
                    background: selectedSafari === s.slug ? 'rgba(217,164,65,0.08)' : '#0a0600',
                    border: `1.5px solid ${selectedSafari === s.slug ? 'rgba(217,164,65,0.5)' : 'rgba(255,255,255,0.07)'}`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0"
                    style={{ background: 'rgba(217,164,65,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}
                  >
                    {s.badgeEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] tracking-[0.10em] uppercase mb-1" style={{ color: '#D9A441' }}>{s.tag}</p>
                    <p className="text-[15px] font-medium text-white truncate">{s.name}</p>
                    <p className="text-[12px] text-muted mt-0.5">{s.duration} · {s.accommodation}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-medium" style={{ color: '#D9A441' }}>From ${s.price.toLocaleString()}</p>
                    <p className="text-[10px] text-dim">per person</p>
                  </div>
                  {selectedSafari === s.slug && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs ml-2 flex-shrink-0" style={{ background: '#D9A441', color: '#050505' }}>✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1 — Dates */}
        {step === 1 && (
          <div>
            <h2 className="text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 44, fontWeight: 300 }}>
              When are you <em style={{ color: '#D9A441', fontStyle: 'italic' }}>travelling</em>?
            </h2>
            <p className="text-sm text-muted mb-10">Choose your travel window. We recommend at least 7 nights.</p>

            {safari && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[11px] font-medium" style={{ background: 'rgba(217,164,65,0.12)', color: '#D9A441', border: '1px solid rgba(217,164,65,0.25)' }}>
                📅 Best season: {safari.bestSeason}
              </div>
            )}

            <div className="grid grid-cols-2 gap-5">
              {['Arrival Date', 'Departure Date'].map((label, i) => (
                <div key={label}>
                  <p className="text-[10px] tracking-[0.12em] uppercase text-dim mb-2">{label}</p>
                  <input
                    type="date"
                    value={i === 0 ? dates.start : dates.end}
                    onChange={e => setDates(d => i === 0 ? { ...d, start: e.target.value } : { ...d, end: e.target.value })}
                    className="w-full rounded-xl px-5 py-4 text-sm text-white bg-transparent outline-none cursor-none"
                    style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.12)', colorScheme: 'dark' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — Guests */}
        {step === 2 && (
          <div>
            <h2 className="text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 44, fontWeight: 300 }}>
              Who's <em style={{ color: '#D9A441', fontStyle: 'italic' }}>joining you</em>?
            </h2>
            <p className="text-sm text-muted mb-10">Our safaris accommodate groups of up to 8 guests for an intimate experience.</p>
            <div className="flex flex-col gap-4">
              {(Object.keys(guests) as (keyof typeof guests)[]).map(key => (
                <div key={key} className="flex items-center justify-between p-6 rounded-2xl" style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <p className="text-[14px] font-medium text-white capitalize">{key}</p>
                    <p className="text-[11px] text-dim mt-0.5">
                      {key === 'adults' ? 'Age 18+' : key === 'children' ? 'Age 3–17' : 'Under 3'}
                    </p>
                  </div>
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => setGuests(g => ({ ...g, [key]: Math.max(key === 'adults' ? 1 : 0, g[key] - 1) }))}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-colors cursor-none"
                      style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}
                    >−</button>
                    <span className="text-lg font-medium text-white w-5 text-center">{guests[key]}</span>
                    <button
                      onClick={() => setGuests(g => ({ ...g, [key]: g[key] + 1 }))}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-colors cursor-none"
                      style={{ background: 'rgba(217,164,65,0.15)', color: '#D9A441' }}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — Accommodation */}
        {step === 3 && (
          <div>
            <h2 className="text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 44, fontWeight: 300 }}>
              Your <em style={{ color: '#D9A441', fontStyle: 'italic' }}>home</em> in the wild
            </h2>
            <p className="text-sm text-muted mb-10">All options include game drives, all meals, and park fees.</p>
            <div className="flex flex-col gap-4">
              {ACCOMMODATIONS.map(a => (
                <button
                  key={a.id}
                  onClick={() => setAccom(a.id)}
                  className="flex items-center gap-5 p-6 rounded-2xl text-left transition-all duration-200 cursor-none"
                  style={{
                    background: accommodation === a.id ? 'rgba(217,164,65,0.08)' : '#0a0600',
                    border: `1.5px solid ${accommodation === a.id ? 'rgba(217,164,65,0.5)' : 'rgba(255,255,255,0.07)'}`,
                  }}
                >
                  <span className="text-3xl">{a.icon}</span>
                  <div className="flex-1">
                    <p className="text-[15px] font-medium text-white mb-1">{a.name}</p>
                    <p className="text-[12px] text-muted">{a.desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {a.price > 0
                      ? <p className="text-sm font-medium" style={{ color: '#D9A441' }}>+${a.price.toLocaleString()}/person</p>
                      : <p className="text-sm font-medium text-white">Included</p>
                    }
                  </div>
                  {accommodation === a.id && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs ml-2" style={{ background: '#D9A441', color: '#050505' }}>✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 — Summary */}
        {step === 4 && safari && (
          <div>
            <h2 className="text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 44, fontWeight: 300 }}>
              Your <em style={{ color: '#D9A441', fontStyle: 'italic' }}>journey</em> summary
            </h2>
            <p className="text-sm text-muted mb-10">Review the details before completing your reservation.</p>
            <div className="rounded-2xl p-7 mb-6" style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Safari',         value: safari.name },
                  { label: 'Duration',       value: safari.duration },
                  { label: 'Arrival',        value: dates.start || '—' },
                  { label: 'Departure',      value: dates.end   || '—' },
                  { label: 'Adults',         value: guests.adults.toString() },
                  { label: 'Children',       value: guests.children.toString() },
                  { label: 'Accommodation',  value: accom?.name ?? '—' },
                  { label: 'Base price',     value: `$${safari.price.toLocaleString()} / person` },
                  ...(accom && accom.price > 0 ? [{ label: 'Accommodation upgrade', value: `+$${accom.price.toLocaleString()} / person` }] : []),
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-[13px] py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="text-dim">{row.label}</span>
                    <span className="text-white font-medium">{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-3">
                  <span className="text-sm font-medium text-white">Total estimated</span>
                  <span className="text-xl font-medium" style={{ color: '#D9A441', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-dim">A 20% deposit is required to confirm. Full amount due 60 days before departure.</p>
          </div>
        )}

        {/* STEP 5 — Checkout */}
        {step === 5 && !submitted && (
          <div>
            <h2 className="text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 44, fontWeight: 300 }}>
              Complete your <em style={{ color: '#D9A441', fontStyle: 'italic' }}>reservation</em>
            </h2>
            <p className="text-sm text-muted mb-10">Our safari team will confirm your booking within 24 hours.</p>
            <div className="flex flex-col gap-5">
              {[
                { label: 'Full Name',     key: 'name',  type: 'text',  placeholder: 'Your full name' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' },
              ].map(field => (
                <div key={field.key}>
                  <p className="text-[10px] tracking-[0.12em] uppercase text-dim mb-2">{field.label}</p>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={(form as any)[field.key]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full rounded-xl px-5 py-4 text-sm text-white placeholder-white/20 outline-none cursor-none"
                    style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>
              ))}
              <div>
                <p className="text-[10px] tracking-[0.12em] uppercase text-dim mb-2">Special Requests</p>
                <textarea
                  rows={4}
                  placeholder="Dietary needs, mobility considerations, special occasions..."
                  value={form.requests}
                  onChange={e => setForm(f => ({ ...f, requests: e.target.value }))}
                  className="w-full rounded-xl px-5 py-4 text-sm text-white placeholder-white/20 outline-none resize-none cursor-none"
                  style={{ background: '#0a0600', border: '1px solid rgba(255,255,255,0.12)' }}
                />
              </div>
              <div className="rounded-xl p-4 text-sm text-muted" style={{ background: 'rgba(217,164,65,0.06)', border: '1px solid rgba(217,164,65,0.18)' }}>
                💳 Payment is processed securely after booking confirmation from our team.
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {step === 5 && submitted && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🦁</div>
            <h2 className="text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 44, fontWeight: 300 }}>
              <em style={{ color: '#D9A441', fontStyle: 'italic' }}>Karibu!</em> Welcome to Kenya.
            </h2>
            <p className="text-sm text-muted max-w-[420px] mx-auto leading-[1.75] mb-8">
              Your enquiry has been received. Our safari team will contact you within 24 hours
              to confirm your booking and begin crafting your journey.
            </p>
            <Link href="/" className="btn-primary inline-flex">Back to Homepage →</Link>
          </div>
        )}

        {/* Navigation buttons */}
        {!(step === 5 && submitted) && (
          <div className="flex justify-between mt-12">
            <button
              onClick={prevStep}
              className="btn-ghost"
              style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
            >
              ← Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={nextStep}
                disabled={step === 0 && !selectedSafari}
                className="btn-primary disabled:opacity-40"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                disabled={!form.name || !form.email}
                className="btn-primary disabled:opacity-40"
              >
                Confirm Reservation →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
