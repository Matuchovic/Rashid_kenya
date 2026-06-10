'use client'

export function Logo() {
  return (
    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 20, textDecoration: 'none', flexShrink: 0 }}>
      {/* Animated emblem */}
      <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
        <svg viewBox="0 0 58 58" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="navElG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8B84E"/>
              <stop offset="100%" stopColor="#C08830"/>
            </linearGradient>
            <linearGradient id="navSunG" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE566"/>
              <stop offset="100%" stopColor="#D9A441"/>
            </linearGradient>
          </defs>
          <circle cx="29" cy="29" r="27.5" fill="none" stroke="#D9A441" strokeWidth="0.6" opacity="0.35" className="ring-outer"/>
          <circle cx="29" cy="29" r="23.5" fill="none" stroke="#D9A441" strokeWidth="0.25" opacity="0.2" className="ring-inner"/>
          <circle cx="29" cy="13" r="5" fill="url(#navSunG)" opacity="0.95" className="sun-orb"/>
          <g stroke="#F8B84E" strokeWidth="0.9" strokeLinecap="round" opacity="0.5">
            <line x1="29" y1="5"  x2="29" y2="3"/>
            <line x1="36" y1="8"  x2="37" y2="6"/>
            <line x1="22" y1="8"  x2="21" y2="6"/>
            <line x1="38" y1="14" x2="40" y2="14"/>
            <line x1="20" y1="14" x2="18" y2="14"/>
          </g>
          <line x1="5" y1="26" x2="53" y2="26" stroke="#D9A441" strokeWidth="0.3" opacity="0.2"/>
          <g fill="#C8922A" opacity="0.82" className="acacia-l">
            <rect x="5.5" y="26" width="2.5" height="16" rx="0.8"/>
            <ellipse cx="6.5" cy="22" rx="10" ry="4.5"/>
            <ellipse cx="0"   cy="24" rx="5.5" ry="3"/>
            <ellipse cx="13"  cy="23" rx="7"   ry="3.5"/>
            <ellipse cx="6.5" cy="18" rx="7"   ry="3.5"/>
          </g>
          <g fill="#B87820" opacity="0.62">
            <rect x="47" y="26" width="2" height="12" rx="0.6"/>
            <ellipse cx="48" cy="23" rx="8" ry="3.5"/>
            <ellipse cx="42" cy="25" rx="5" ry="2.5"/>
            <ellipse cx="54" cy="24" rx="6" ry="3"/>
          </g>
          <g fill="url(#navElG)" opacity="0.9">
            <ellipse cx="26" cy="37" rx="10" ry="7"/>
            <ellipse cx="18" cy="33" rx="6"  ry="5"/>
            <path d="M13,36 Q9,40 10,47 Q12,42 14,47 Q15,41 16,36Z"/>
            <ellipse cx="15" cy="31" rx="4" ry="5.5" fill="#C08830" opacity="0.85"/>
            <rect x="18" y="43" width="3.5" height="9"  rx="1.5"/>
            <rect x="23" y="43" width="3.5" height="9"  rx="1.5"/>
            <rect x="28" y="43" width="3.5" height="9"  rx="1.5"/>
            <rect x="33" y="43" width="3.5" height="8.5" rx="1.5"/>
          </g>
          <g fill="url(#navElG)" opacity="0.68">
            <path d="M43,16 L41,30 L46,30 L45,16Z"/>
            <ellipse cx="43.5" cy="15" rx="4" ry="3"/>
            <path d="M38,29 L36,49 L52,49 L50,29Z"/>
            <rect x="36" y="47" width="3" height="8.5" rx="1.4"/>
            <rect x="41" y="47" width="3" height="8.5" rx="1.4"/>
            <rect x="46" y="47" width="3" height="8.5" rx="1.4"/>
            <rect x="50" y="47" width="3" height="8"   rx="1.4"/>
          </g>
          <path d="M2,53 Q16,49 29,51 Q42,53 56,50 L56,58 L2,58Z" fill="#1a0e00" opacity="0.45"/>
        </svg>
        <style>{`
          @keyframes sunPulse { 0%,100%{opacity:.88} 50%{opacity:1} }
          @keyframes ringBreath { 0%,100%{opacity:.3} 50%{opacity:.6} }
          @keyframes swayL { 0%,100%{transform:rotate(0deg);transform-origin:6px 26px} 50%{transform:rotate(2deg);transform-origin:6px 26px} }
          @keyframes swayR { 0%,100%{transform:rotate(0deg);transform-origin:48px 26px} 50%{transform:rotate(-1.5deg);transform-origin:48px 26px} }
          .sun-orb{animation:sunPulse 3s ease-in-out infinite}
          .ring-outer{animation:ringBreath 5s ease-in-out infinite}
          .ring-inner{animation:ringBreath 5s ease-in-out infinite .8s}
          .acacia-l{animation:swayL 7s ease-in-out infinite}
        `}</style>
      </div>

      {/* Separator */}
      <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg,transparent,rgba(217,164,65,0.3),transparent)', flexShrink: 0 }}/>

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 17, fontWeight: 300, letterSpacing: '0.25em',
          background: 'linear-gradient(100deg,#F8B84E,#D9A441,#F8B84E)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'textShine 4s linear infinite',
        }}>RASHID ADVENTURES</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ height: 1, width: 24, background: 'linear-gradient(90deg,transparent,rgba(217,164,65,0.45))' }}/>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 9, fontStyle: 'italic', letterSpacing: '0.18em',
            color: 'rgba(217,164,65,0.6)'
          }}>Into the Heart of Africa</span>
          <div style={{ height: 1, width: 24, background: 'linear-gradient(90deg,rgba(217,164,65,0.45),transparent)' }}/>
        </div>
        <style>{`@keyframes textShine{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
      </div>
    </a>
  )
}
