'use client'
import { useState } from 'react'
import { useLang } from '@/context/LanguageContext'

const FAQS = [
  {
    q: 'When is the best time to visit Kenya?',
    a: 'The best time is during the dry seasons: January–February and June–October. July–September is peak season for the Great Migration. Avoid April–May (long rains). Year-round is possible — each season has its magic.',
    qKey: 'faq_q1', aKey: 'faq_a1',
  },
  {
    q: 'What should I pack for a safari?',
    a: 'Light neutral clothing (khaki, olive, beige), a good hat, sunscreen, insect repellent, binoculars, and a camera. Layers for cool mornings. No bright colours — they disturb wildlife. Rashid provides all safari equipment.',
    qKey: 'faq_q2', aKey: 'faq_a2',
  },
  {
    q: 'Is safari safe for children?',
    a: 'Absolutely. Rashid has extensive experience with families. Game drives are in a secure 4×4 vehicle. Children love seeing elephants, giraffes and zebras up close. Minimum recommended age is 5 years.',
    qKey: 'faq_q3', aKey: 'faq_a3',
  },
  {
    q: 'How does payment work?',
    a: 'We discuss and agree on everything via WhatsApp first. Payment is flexible — bank transfer, cash, or other arrangements. No hidden fees. All prices are transparent and agreed before your trip.',
    qKey: 'faq_q4', aKey: 'faq_a4',
  },
  {
    q: 'How big are the groups?',
    a: 'All safaris are private — just you, your travel companions, and Rashid. No joining strangers on a bus. This allows full flexibility on timing, routes, and stops.',
    qKey: 'faq_q5', aKey: 'faq_a5',
  },
  {
    q: 'Do I need vaccinations?',
    a: 'Yellow fever vaccination is recommended. Malaria prophylaxis is advised — consult your doctor 4–6 weeks before travel. Rashid can advise on any specific health requirements for your itinerary.',
    qKey: 'faq_q6', aKey: 'faq_a6',
  },
]

export function FAQSection() {
  const { t } = useLang()
  const [open, setOpen] = useState(-1)

  return (
    <section id="faq" style={{
      background: '#050505',
      padding: 'clamp(60px,8vh,100px) 0',
      borderTop: '0.5px solid rgba(212,167,95,0.06)',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '0 clamp(20px,5vw,48px)', marginBottom: 'clamp(40px,6vh,56px)' }}>
        <div style={{ fontSize: 7, letterSpacing: '0.22em', color: 'rgba(212,167,95,0.4)', textTransform: 'uppercase', marginBottom: 14 }}>
          {t('faq_label') || 'Before You Go'}
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: 'clamp(28px,5vw,48px)',
          fontWeight: 200,
          color: '#F2E6D0',
          lineHeight: 1,
          margin: 0,
        }}>
          {t('faq_title') || 'Frequently Asked'}<br />
          <em style={{ color: '#D4A75F', fontStyle: 'italic' }}>{t('faq_title_em') || 'Questions'}</em>
        </h2>
      </div>

      {/* FAQ items */}
      <div style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '0 clamp(16px,5vw,48px)',
      }}>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            style={{
              borderBottom: '0.5px solid rgba(212,167,95,0.1)',
              overflow: 'hidden',
            }}
          >
            {/* Question */}
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 'clamp(18px,3vh,24px) 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                textAlign: 'left',
              }}
            >
              <span style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 'clamp(16px,2.5vw,20px)',
                fontWeight: 300,
                color: open === i ? '#D4A75F' : '#F2E6D0',
                lineHeight: 1.3,
                transition: 'color 0.3s ease',
              }}>
                {t(faq.qKey) || faq.q}
              </span>
              {/* Plus/minus icon */}
              <span style={{
                flexShrink: 0,
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: open === i ? '0.5px solid rgba(212,167,95,0.6)' : '0.5px solid rgba(212,167,95,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                background: open === i ? 'rgba(212,167,95,0.1)' : 'transparent',
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <line x1="6" y1="0" x2="6" y2="12" stroke="#D4A75F" strokeWidth="0.8"
                    style={{ opacity: open === i ? 0 : 1, transition: 'opacity 0.3s' }} />
                  <line x1="0" y1="6" x2="12" y2="6" stroke="#D4A75F" strokeWidth="0.8" />
                </svg>
              </span>
            </button>

            {/* Answer */}
            <div style={{
              maxHeight: open === i ? '300px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)',
            }}>
              <p style={{
                fontSize: 'clamp(13px,1.8vw,15px)',
                color: 'rgba(242,230,208,0.55)',
                lineHeight: 1.75,
                margin: '0 0 clamp(18px,3vh,24px)',
                paddingRight: 44,
              }}>
                {t(faq.aKey) || faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 'clamp(40px,6vh,56px)', padding: '0 clamp(20px,5vw,48px)' }}>
        <p style={{
          fontSize: 'clamp(12px,1.6vw,14px)',
          color: 'rgba(242,230,208,0.25)',
          marginBottom: 20,
          letterSpacing: '0.04em',
        }}>
          {t('faq_more') || 'Still have questions? Rashid answers personally.'}
        </p>
        
          href="https://wa.me/254718930587"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#F2E6D0',
            background: 'rgba(255,255,255,0.04)',
            padding: '12px 28px',
            borderRadius: 100,
            border: '0.5px solid rgba(242,230,208,0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {t('faq_cta') || 'Ask Rashid directly'} →
        </a>
      </div>
    </section>
  )
}
