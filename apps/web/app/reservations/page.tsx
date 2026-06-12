import type { Metadata } from 'next'
import ReservationForm from '@/components/sections/ReservationForm'

export const metadata: Metadata = {
  title: 'Reservations | Paila Restaurant & Bar',
  description: 'Book a table at Paila Restaurant & Bar in Kathmandu. Reserve online or call us.',
}

export default function ReservationsPage() {
  return (
    <div style={{ backgroundColor: '#F7F0E6', minHeight: '100vh' }}>

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <div
        className="pt-36 pb-20 px-6 text-center relative overflow-hidden"
        style={{ backgroundColor: '#1C0A00' }}
      >
        {/* faint background image */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=40&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0)',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,10,0,0.5) 0%, #1C0A00 100%)' }} />

        <div className="relative z-10">
          <p
            className="text-sm mb-4 uppercase tracking-[0.3em]"
            style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: '#D4A853' }}
          >
            Join Us
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 8vw, 100px)',
              fontWeight: 300,
              color: '#F7F0E6',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            Reserve Your<br />
            <span style={{ color: '#C4622D' }}>Table</span>
          </h1>
          <div style={{ width: '48px', height: '1px', background: '#D4A853', margin: '24px auto' }} />
          <p
            className="text-sm max-w-sm mx-auto"
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(247,240,230,0.5)', lineHeight: 1.7 }}
          >
            We recommend booking in advance, especially on weekends.
            Walk-ins welcome based on availability.
          </p>
        </div>
      </div>

      {/* ── Main content: form + sidebar ─────────────────────────────────── */}
      <div className="px-6 py-20" style={{ backgroundColor: '#2A1810' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_340px] gap-16 items-start">

          {/* Form card */}
          <div>
            <p
              className="text-sm mb-2 uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-sans)', color: 'rgba(247,240,230,0.35)' }}
            >
              Booking Request
            </p>
            <h2
              className="mb-10"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 300,
                color: '#F7F0E6',
                letterSpacing: '-0.01em',
              }}
            >
              Tell us about your visit
            </h2>
            <ReservationForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-8 md:pt-16">

            {/* Contact block */}
            <div
              className="p-6"
              style={{ border: '1px solid rgba(247,240,230,0.1)', background: 'rgba(247,240,230,0.03)' }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: 'var(--font-sans)', color: '#D4A853' }}
              >
                Prefer to call?
              </p>
              <a
                href="tel:+9779801234567"
                className="block text-2xl mb-1 hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'var(--font-display)', color: '#F7F0E6', fontWeight: 300 }}
              >
                +977 980 123 4567
              </a>
              <p
                className="text-xs"
                style={{ fontFamily: 'var(--font-sans)', color: 'rgba(247,240,230,0.35)' }}
              >
                Available during dining hours
              </p>
            </div>

            {/* Hours */}
            <div
              className="p-6"
              style={{ border: '1px solid rgba(247,240,230,0.1)', background: 'rgba(247,240,230,0.03)' }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: 'var(--font-sans)', color: '#D4A853' }}
              >
                Opening Hours
              </p>
              <div className="space-y-3">
                {[
                  { days: 'Mon – Fri', hours: '11 AM – 10 PM' },
                  { days: 'Sat – Sun', hours: '10 AM – 11 PM' },
                  { days: 'Bar', hours: 'Until midnight' },
                ].map(row => (
                  <div key={row.days} className="flex justify-between items-baseline">
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'rgba(247,240,230,0.4)' }}>
                      {row.days}
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#F7F0E6' }}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div
              className="p-6"
              style={{ border: '1px solid rgba(247,240,230,0.1)', background: 'rgba(247,240,230,0.03)' }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ fontFamily: 'var(--font-sans)', color: '#D4A853' }}
              >
                Location
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(247,240,230,0.65)', lineHeight: 1.7 }}>
                Paila Restaurant & Bar<br />
                Kathmandu, Nepal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Info strip ───────────────────────────────────────────────────── */}
      <div className="py-16 px-6" style={{ backgroundColor: '#EDE4D8' }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            { icon: '🕐', title: 'Dining Hours', text: 'Mon–Fri: 11AM–10PM\nSat–Sun: 10AM–11PM' },
            { icon: '👥', title: 'Large Groups', text: 'For groups of 10+, please call us directly to arrange a private dining experience.' },
            { icon: '🎂', title: 'Special Occasions', text: 'Birthdays, anniversaries, celebrations — mention it in your booking request.' },
          ].map(item => (
            <div key={item.title}>
              <span className="text-3xl block mb-3">{item.icon}</span>
              <p
                className="text-xl mb-2"
                style={{ fontFamily: 'var(--font-display)', color: '#C4622D', fontWeight: 400 }}
              >
                {item.title}
              </p>
              <p
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ fontFamily: 'var(--font-sans)', color: '#9A8F84' }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
