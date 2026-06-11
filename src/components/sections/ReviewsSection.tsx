'use client'
import { useState, useEffect } from 'react'
import { useLang } from '@/context/LanguageContext'

type Review = { id: string; name: string; country: string; text: string; stars: number; date: string }

function Stars({ n, interactive, onChange }: { n: number; interactive?: boolean; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i}
          onClick={() => interactive && onChange && onChange(i)}
          onMouseEnter={() => interactive && setHover(i)}
          onMouseLeave={() => interactive && setHover(0)}
          style={{ fontSize: interactive ? 22 : 14, cursor: interactive ? 'pointer' : 'default', color: i <= (hover || n) ? '#D4A75F' : 'rgba(212,167,95,0.2)', transition: 'color 0.15s' }}
        >★</span>
      ))}
    </div>
  )
}

export function ReviewsSection() {
  const { t } = useLang()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ name: '', country: '', text: '', stars: 5 })
  const [adminMode, setAdminMode] = useState(false)
  const [adminPwd, setAdminPwd] = useState('')

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => { setReviews(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.country || !form.text) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const newReview = await res.json()
        setReviews(prev => [newReview, ...prev])
        setForm({ name: '', country: '', text: '', stars: 5 })
        setSuccess(true)
        setTimeout(() => setSuccess(false), 4000)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const deleteReview = async (id: string) => {
    const res = await fetch('/api/reviews', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password: adminPwd }),
    })
    if (res.ok) setReviews(prev => prev.filter(r => r.id !== id))
    else alert('Wrong password')
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)',
    border: '0.5px solid rgba(212,167,95,0.2)', borderRadius: 8,
    padding: '12px 16px', color: '#F2E6D0', fontSize: 13,
    fontFamily: "'Inter',sans-serif", outline: 'none', boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
  }

  return (
    <section id="reviews" style={{ background: '#050505', padding: 'clamp(60px,8vh,100px) 0', borderTop: '0.5px solid rgba(212,167,95,0.06)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px,5vw,48px)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vh,56px)' }}>
          <div style={{ fontSize: 7, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.4)', textTransform: 'uppercase', marginBottom: 14 }}>Safari Stories</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(28px,5vw,48px)', fontWeight: 200, color: '#F2E6D0', lineHeight: 1, margin: 0 }}>
            What Our Guests<br /><em style={{ color: '#D4A75F', fontStyle: 'italic' }}>Say</em>
          </h2>
        </div>

        {/* Reviews grid */}
        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(212,167,95,0.3)', fontSize: 12, padding: '40px 0' }}>Loading...</div>
        ) : reviews.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(242,230,208,0.2)', fontSize: 13, padding: '40px 0', fontStyle: 'italic' }}>Be the first to share your experience</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16, marginBottom: 56 }}>
            {reviews.map(r => (
              <div key={r.id} style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(212,167,95,0.1)', borderRadius: 14, padding: '20px 22px', position: 'relative' }}>
                {adminMode && (
                  <button onClick={() => deleteReview(r.id)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,60,60,0.1)', border: '0.5px solid rgba(255,60,60,0.3)', color: 'rgba(255,100,100,0.8)', fontSize: 10, cursor: 'pointer', borderRadius: 6, padding: '3px 8px' }}>Delete</button>
                )}
                <Stars n={r.stars} />
                <p style={{ fontSize: 13, color: 'rgba(242,230,208,0.6)', lineHeight: 1.7, margin: '12px 0 16px', fontStyle: 'italic' }}>"{r.text}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: '#D4A75F', letterSpacing: '0.06em' }}>{r.name}</div>
                    <div style={{ fontSize: 9, color: 'rgba(242,230,208,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>{r.country}</div>
                  </div>
                  <div style={{ fontSize: 9, color: 'rgba(242,230,208,0.2)', letterSpacing: '0.08em' }}>{r.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form */}
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 7, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>Share Your Story</div>
            <div style={{ fontSize: 11, color: 'rgba(242,230,208,0.25)', letterSpacing: '0.06em' }}>Your experience helps others discover Kenya</div>
          </div>

          {success ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: '#D4A75F', fontSize: 14 }}>
              ✓ Thank you! Your review has been published.
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input placeholder="Your name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} style={inputStyle} maxLength={60} />
                <input placeholder="Country" value={form.country} onChange={e => setForm(f => ({...f, country: e.target.value}))} style={inputStyle} maxLength={40} />
              </div>
              <textarea placeholder="Share your safari experience..." value={form.text} onChange={e => setForm(f => ({...f, text: e.target.value}))} style={{...inputStyle, minHeight: 100, resize: 'vertical'}} maxLength={500} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, color: 'rgba(242,230,208,0.35)', letterSpacing: '0.08em' }}>Rating:</span>
                <Stars n={form.stars} interactive onChange={v => setForm(f => ({...f, stars: v}))} />
              </div>
              <button type="submit" disabled={submitting || !form.name || !form.country || !form.text} style={{ background: submitting ? 'rgba(212,167,95,0.3)' : '#D4A75F', color: '#050505', border: 'none', borderRadius: 100, padding: '14px 32px', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer', fontWeight: 500, transition: 'all 0.2s', marginTop: 4 }}>
                {submitting ? 'Sending...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>

        {/* Admin toggle */}
        <div style={{ textAlign: 'center', marginTop: 48, paddingTop: 24, borderTop: '0.5px solid rgba(212,167,95,0.05)' }}>
          {!adminMode ? (
            <button onClick={() => setAdminMode(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 8, color: 'rgba(242,230,208,0.1)', letterSpacing: '0.12em' }}>Admin</button>
          ) : (
            <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <input type="password" placeholder="Admin password" value={adminPwd} onChange={e => setAdminPwd(e.target.value)} style={{ ...inputStyle, width: 180, fontSize: 11 }} />
              <button onClick={() => { setAdminMode(false); setAdminPwd('') }} style={{ background: 'none', border: '0.5px solid rgba(242,230,208,0.1)', color: 'rgba(242,230,208,0.3)', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', fontSize: 10 }}>Cancel</button>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
