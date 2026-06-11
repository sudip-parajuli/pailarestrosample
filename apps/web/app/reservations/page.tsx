import type { Metadata } from 'next'
import ReservationCTA from '@/components/sections/ReservationCTA'

export const metadata: Metadata = {
  title: 'Reservations | Paila Restaurant & Bar',
  description: 'Book a table at Paila Restaurant & Bar in Kathmandu. Reserve online or call us.',
}

export default function ReservationsPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        className="pt-36 pb-20 px-6 text-center"
        style={{ backgroundColor: 'var(--color-ember)' }}
      >
        <p className="font-accent italic text-sm mb-3 tracking-[0.25em] uppercase"
          style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-gold)' }}>
          Join Us
        </p>
        <h1 className="text-display font-display"
          style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-cream)' }}>
          Reservations
        </h1>
        <div className="divider-gold mt-6" />
        <p className="font-sans text-sm mt-6 max-w-md mx-auto"
          style={{ color: 'rgba(237,228,216,0.6)' }}>
          We recommend booking in advance, especially on weekends.
          Walk-ins welcome based on availability.
        </p>
      </div>

      {/* Full reservation form section */}
      <ReservationCTA />

      {/* Info strip */}
      <div className="py-16 px-6" style={{ backgroundColor: 'var(--color-bone)' }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            { icon: '🕐', title: 'Dinner Hours', text: 'Mon–Fri: 6PM–10PM\nSat–Sun: 5PM–11PM' },
            { icon: '👥', title: 'Large Groups', text: 'For groups of 8+, please call us directly to arrange a private dining experience.' },
            { icon: '🎂', title: 'Special Occasions', text: 'Birthdays, anniversaries, celebrations — mention it in your request.' },
          ].map((item) => (
            <div key={item.title}>
              <span className="text-3xl block mb-3">{item.icon}</span>
              <p className="font-display text-xl mb-2"
                style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-ember)' }}>
                {item.title}
              </p>
              <p className="font-sans text-sm leading-relaxed whitespace-pre-line"
                style={{ color: 'var(--color-mist)' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
