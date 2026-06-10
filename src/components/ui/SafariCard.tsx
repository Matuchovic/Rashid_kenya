import Image from 'next/image'
import Link from 'next/link'
import { Safari } from '@/lib/data'

interface SafariCardProps {
  safari: Safari
  large?: boolean
}

export function SafariCard({ safari, large = false }: SafariCardProps) {
  return (
    <div className="safari-card group cursor-none">
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: large ? '3/4' : '4/3' }}
      >
        <Image
          src={safari.image}
          alt={safari.imageAlt}
          fill
          sizes={large ? '(max-width:1024px) 100vw, 50vw' : '(max-width:1024px) 50vw, 33vw'}
          className="card-image"
          priority={large}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, rgba(5,5,5,0.55) 0%, transparent 50%)' }}
        />
        {/* Badge */}
        <span
          className="absolute top-4 left-4 rounded-full px-3.5 py-1.5 text-[10px] font-medium tracking-[0.10em] uppercase"
          style={{
            background: 'rgba(5,5,5,0.72)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#D9A441',
          }}
        >
          {safari.badgeEmoji} {safari.badge}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 pb-7">
        <p className="text-[10px] font-medium tracking-[0.14em] uppercase mb-2.5" style={{ color: '#D9A441' }}>
          {safari.tag}
        </p>
        <h3
          className="text-white mb-2.5"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 300, lineHeight: 1.2 }}
        >
          {safari.name}
        </h3>
        {large && (
          <p className="text-[12px] text-muted leading-[1.7] mb-0">{safari.description}</p>
        )}
        <div
          className="flex justify-between items-center mt-5 pt-[18px]"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span className="text-[11px] text-dim flex items-center gap-1.5">
            ⏱ {safari.duration} · {safari.accommodation}
          </span>
          <span className="text-sm font-medium" style={{ color: '#D9A441' }}>
            From ${safari.price.toLocaleString()}
            <span className="text-[10px] font-normal text-dim"> / person</span>
          </span>
        </div>
        <Link
          href={`/safaris/${safari.slug}`}
          className="mt-4 flex items-center justify-center w-full py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-none"
          style={{
            background: 'rgba(217,164,65,0.10)',
            border: '1px solid rgba(217,164,65,0.22)',
            color: '#D9A441',
          }}
        >
          View Safari Details →
        </Link>
      </div>
    </div>
  )
}
