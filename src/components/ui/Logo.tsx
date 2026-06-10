import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 38

  return (
    <Link href="/" className="flex items-center gap-3 no-underline flex-shrink-0">
      {/* SVG Logo Mark — stylized R with acacia tree */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer ring */}
        <circle cx="19" cy="19" r="17.5" stroke="#D9A441" strokeWidth="0.8" opacity="0.5" />

        {/* R letterform */}
        <path
          d="M11 27V11H18C21.3137 11 24 13.6863 24 17C24 19.419 22.5984 21.5187 20.5476 22.5476L24.5 27H21L17.5 23H14V27H11Z"
          fill="#D9A441"
          opacity="0.95"
        />
        {/* R counter */}
        <path
          d="M14 14V20H18C19.6569 20 21 18.6569 21 17C21 15.3431 19.6569 14 18 14H14Z"
          fill="#050505"
        />

        {/* Acacia branch — left */}
        <path d="M26 10C26 10 24.5 8.5 22.5 9.5" stroke="#D9A441" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        {/* Acacia branch — right */}
        <path d="M26 10C26 10 27.5 8 29 9"       stroke="#D9A441" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        {/* Acacia trunk top */}
        <path d="M26 10V13"                        stroke="#D9A441" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        {/* Canopy dots */}
        <circle cx="22.5" cy="9"  r="1.5" fill="#D9A441" opacity="0.55" />
        <circle cx="29.5" cy="8.5" r="1.5" fill="#D9A441" opacity="0.45" />
      </svg>

      <div className="flex flex-col leading-none gap-[3px]">
        <span
          className="text-white uppercase tracking-[0.16em]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: size === 'sm' ? 12 : 14, fontWeight: 400 }}
        >
          Rashid Adventures
        </span>
        <span
          className="text-gold font-medium uppercase tracking-[0.22em]"
          style={{ fontSize: size === 'sm' ? 8 : 9 }}
        >
          Kenya · Est. 1997
        </span>
      </div>
    </Link>
  )
}
