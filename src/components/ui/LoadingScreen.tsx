'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [litCount, setLitCount] = useState(0)

  useEffect(() => {
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 2.2 + 0.8
      if (p >= 100) {
        p = 100
        clearInterval(iv)
        setTimeout(() => { setLeaving(true); setTimeout(onComplete, 1000) }, 600)
      }
      setPct(Math.min(Math.round(p), 100))
      setLitCount(Math.floor(Math.min(p, 99) / 20))
    }, 55)
    return () => clearInterval(iv)
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-end',
      background: '#000',
      opacity: leaving ? 0 : 1,
      transition: leaving ? 'opacity 1s ease' : 'none',
      overflow: 'hidden',
    }}>

      {/* Fullscreen photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/bigfive.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        animation: 'ldrKen 8s ease-in-out infinite alternate',
      }} />

      {/* Fire atmosphere */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 90% 70% at 50% 25%, rgba(255,130,0,0.15) 0%, rgba(150,60,0,0.08) 45%, transparent 70%)',
        animation: 'ldrEmber 4s ease-in-out infinite',
      }} />

      {/* Dark bottom vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(0deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.7) 22%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.5) 100%)',
      }} />

      {/* Side vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)',
      }} />

      {/* Loading UI — bottom */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 0,
        paddingBottom: 48, width: '100%',
        animation: 'ldrFadeUp 1s ease 0.5s both',
      }}>

        {/* LOADING text */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13, fontWeight: 300,
          letterSpacing: '0.55em',
          color: 'rgba(217,164,65,0.7)',
          textTransform: 'uppercase',
          marginBottom: 18,
        }}>Loading</div>

        {/* Gold progress bar */}
        <div style={{
          width: 'min(520px, 80vw)',
          height: 2,
          background: 'rgba(255,255,255,0.06)',
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0,
            height: '100%',
            width: pct + '%',
            background: 'linear-gradient(90deg, #C08020, #D9A441, #F8E060, #D9A441, #C08020)',
            backgroundSize: '200% auto',
            boxShadow: '0 0 12px rgba(217,164,65,0.8), 0 0 24px rgba(217,164,65,0.4)',
            borderRadius: 2,
            transition: 'width 0.08s ease',
            animation: 'ldrShimmer 1.5s linear infinite',
          }} />
          {/* Glow tip */}
          <div style={{
            position: 'absolute', top: -3, height: 8,
            width: 20, borderRadius: '50%',
            background: 'rgba(248,224,96,0.9)',
            boxShadow: '0 0 16px 6px rgba(217,164,65,0.8)',
            left: `calc(${pct}% - 10px)`,
            transition: 'left 0.08s ease',
          }} />
        </div>

        {/* Percentage */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14, fontWeight: 200,
          letterSpacing: '0.2em',
          color: 'rgba(217,164,65,0.6)',
          marginBottom: 24,
        }}>{pct} %</div>

        {/* 5 animal icons */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {[
            { emoji: '🦁', label: 'Lion',     at: 0  },
            { emoji: '🐘', label: 'Elephant', at: 20 },
            { emoji: '🦏', label: 'Rhino',    at: 40 },
            { emoji: '🐆', label: 'Leopard',  at: 60 },
            { emoji: '🐃', label: 'Buffalo',  at: 80 },
          ].map((a, i) => {
            const lit = pct >= a.at
            return (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 6,
                transition: 'all 0.5s ease',
                opacity: lit ? 1 : 0.18,
                transform: lit ? 'scale(1.1)' : 'scale(0.9)',
              }}>
                <div style={{
                  fontSize: 28,
                  filter: lit
                    ? 'drop-shadow(0 0 8px rgba(217,164,65,0.9)) drop-shadow(0 0 16px rgba(217,164,65,0.5))'
                    : 'grayscale(1)',
                  transition: 'filter 0.5s ease',
                }}>{a.emoji}</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 8, letterSpacing: '0.18em',
                  color: lit ? 'rgba(217,164,65,0.65)' : 'rgba(255,255,255,0.15)',
                  textTransform: 'uppercase',
                  transition: 'color 0.5s ease',
                }}>{a.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes ldrKen {
          0%  { transform: scale(1)    translate(0,    0);    }
          100%{ transform: scale(1.07) translate(-1%, 0.5%); }
        }
        @keyframes ldrEmber {
          0%,100%{ opacity: 0.7; }
          50%    { opacity: 1;   }
        }
        @keyframes ldrFadeUp {
          from{ opacity:0; transform:translateY(20px); }
          to  { opacity:1; transform:translateY(0);    }
        }
        @keyframes ldrShimmer {
          0%  { background-position: 200% center; }
          100%{ background-position: -100% center; }
        }
      `}</style>
    </div>
  )
}
