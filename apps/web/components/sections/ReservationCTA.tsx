'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ReservationCTA() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '2', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire up to a form backend (Formspree / email / etc.)
    console.log('Reservation request:', form)
    setSubmitted(true)
  }

  return (
    <section
      id="reservation-cta"
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-charcoal)' }}
    >
      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-display whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: 'clamp(100px, 18vw, 260px)',
            color: 'rgba(196,98,45,0.05)',
            letterSpacing: '-0.04em',
          }}
        >
          PAILA
        </span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <p className="font-accent italic text-sm mb-3 tracking-[0.25em] uppercase"
          style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-gold)' }}>
          Join Us Tonight
        </p>
        <h2 className="text-display font-display mb-4"
          style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-cream)' }}>
          Reserve Your Table
        </h2>
        <p className="font-sans text-sm mb-12" style={{ color: 'rgba(237,228,216,0.6)' }}>
          Call us at <a href="tel:+977XXXXXXXXXX" className="underline hover:text-cream transition-colors" style={{ color: 'var(--color-gold)' }}>+977 XX XXXX XXXX</a> or fill in the form below.
        </p>

        {submitted ? (
          <div className="py-16">
            <span className="text-5xl block mb-6">🙏</span>
            <p className="font-display text-3xl mb-3"
              style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-cream)' }}>
              Dhanyabad!
            </p>
            <p className="font-sans text-sm" style={{ color: 'rgba(237,228,216,0.6)' }}>
              We&apos;ve received your request. Our team will confirm within a few hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {/* Name */}
            <div className="sm:col-span-2">
              <label htmlFor="res-name" className="block font-sans text-xs tracking-widest uppercase mb-2"
                style={{ color: 'var(--color-mist)' }}>
                Full Name *
              </label>
              <input
                id="res-name"
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-3 font-sans text-sm outline-none focus:ring-1"
                style={{
                  backgroundColor: 'rgba(247,240,230,0.06)',
                  border: '1px solid rgba(247,240,230,0.12)',
                  color: 'var(--color-cream)',
                  '--tw-ring-color': 'var(--color-copper)',
                } as React.CSSProperties}
                placeholder="Your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="res-phone" className="block font-sans text-xs tracking-widest uppercase mb-2"
                style={{ color: 'var(--color-mist)' }}>
                Phone *
              </label>
              <input
                id="res-phone"
                type="tel"
                required
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full px-4 py-3 font-sans text-sm outline-none focus:ring-1"
                style={{
                  backgroundColor: 'rgba(247,240,230,0.06)',
                  border: '1px solid rgba(247,240,230,0.12)',
                  color: 'var(--color-cream)',
                } as React.CSSProperties}
                placeholder="+977..."
              />
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="res-guests" className="block font-sans text-xs tracking-widest uppercase mb-2"
                style={{ color: 'var(--color-mist)' }}>
                Guests *
              </label>
              <select
                id="res-guests"
                required
                value={form.guests}
                onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                className="w-full px-4 py-3 font-sans text-sm outline-none"
                style={{
                  backgroundColor: 'rgba(247,240,230,0.06)',
                  border: '1px solid rgba(247,240,230,0.12)',
                  color: 'var(--color-cream)',
                }}
              >
                {['1','2','3','4','5','6','7','8+'].map(n => (
                  <option key={n} value={n} style={{ backgroundColor: 'var(--color-charcoal)' }}>{n} {n === '1' ? 'guest' : 'guests'}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="sm:col-span-2">
              <label htmlFor="res-date" className="block font-sans text-xs tracking-widest uppercase mb-2"
                style={{ color: 'var(--color-mist)' }}>
                Preferred Date *
              </label>
              <input
                id="res-date"
                type="date"
                required
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 font-sans text-sm outline-none"
                style={{
                  backgroundColor: 'rgba(247,240,230,0.06)',
                  border: '1px solid rgba(247,240,230,0.12)',
                  color: 'var(--color-cream)',
                  colorScheme: 'dark',
                }}
              />
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label htmlFor="res-message" className="block font-sans text-xs tracking-widest uppercase mb-2"
                style={{ color: 'var(--color-mist)' }}>
                Special Requests
              </label>
              <textarea
                id="res-message"
                rows={3}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full px-4 py-3 font-sans text-sm outline-none resize-none"
                style={{
                  backgroundColor: 'rgba(247,240,230,0.06)',
                  border: '1px solid rgba(247,240,230,0.12)',
                  color: 'var(--color-cream)',
                }}
                placeholder="Allergies, celebrations, seating preferences..."
              />
            </div>

            {/* Submit */}
            <div className="sm:col-span-2">
              <button
                id="res-submit"
                type="submit"
                className="w-full py-4 font-sans text-sm tracking-widest uppercase bg-copper text-cream hover:opacity-90 transition-all duration-300"
              >
                Send Request
              </button>
            </div>

            <p className="sm:col-span-2 font-sans text-xs text-center" style={{ color: 'var(--color-mist)' }}>
              Or visit us in person — <Link href="/contact" className="underline hover:text-cream transition-colors">see directions</Link>
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
