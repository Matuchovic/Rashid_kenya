const ITEMS = [
  'Great Migration · Masai Mara',
  'Big Five Game Drives · Amboseli',
  'Hot Air Balloon Safaris at Sunrise',
  'Luxury Tented Camps · Tsavo',
  'Maasai Cultural Experiences',
  'Wildlife Photography Tours',
  'Private Conservancy Access',
  'Guided Night Game Drives',
]

export function TickerStrip() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="w-full overflow-hidden py-2.5" style={{ background: '#D9A441' }}>
      <div className="ticker-track inline-flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-8 text-[11px] font-medium tracking-[0.14em] uppercase"
            style={{ color: '#050505' }}
          >
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(0,0,0,0.35)' }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
