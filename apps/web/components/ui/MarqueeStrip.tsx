export default function MarqueeStrip() {
  const items = [
    'Paila Restaurant & Bar',
    'Dal Bhat Tarkari',
    'Live Fire Cooking',
    'Craft Cocktails',
    'Thamel · Kathmandu',
    'Farm to Table',
    'Jhol Momo',
    'Himalayan Botanicals',
    'Live Music Fri & Sat',
    'Sekuwa Platter',
  ]

  // Duplicate for seamless loop
  const all = [...items, ...items]

  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{
        backgroundColor: '#1C0A00',
        borderColor: 'rgba(196,98,45,0.25)',
      }}
    >
      <div className="flex whitespace-nowrap marquee-track">
        {all.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 text-sm uppercase tracking-[0.15em]"
            style={{
              fontFamily: 'var(--font-sans)',
              color: i % 3 === 1 ? '#C4622D' : 'rgba(247,240,230,0.5)',
            }}
          >
            {item}
            <span style={{ color: '#C4622D', opacity: 0.6 }}>·</span>
          </span>
        ))}
      </div>

    </div>
  )
}
