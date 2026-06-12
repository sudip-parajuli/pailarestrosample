'use client'
import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FormData = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  occasion: string
  requests: string
}

const TIMES = [
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM',
]

const OCCASIONS = [
  'None', 'Birthday', 'Anniversary', 'Date Night',
  'Business Dinner', 'Family Gathering', 'Other',
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  background: 'rgba(247,240,230,0.06)',
  border: '1px solid rgba(247,240,230,0.15)',
  color: '#F7F0E6',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
  outline: 'none',
  borderRadius: 0,
  transition: 'border-color 0.2s ease, background 0.2s ease',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.7rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(247,240,230,0.45)',
  marginBottom: '8px',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

export default function ReservationForm() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', date: '',
    time: '', guests: '2', occasion: 'None', requests: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  function set(field: keyof FormData, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate(): boolean {
    const e: Partial<FormData> = {}
    if (!form.name.trim())  e.name  = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.date)         e.date  = 'Please pick a date'
    if (!form.time)         e.time  = 'Please choose a time'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Simulate network delay — replace with your API call / Sanity mutation
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const focusStyle = {
    borderColor: '#C4622D',
    background: 'rgba(196,98,45,0.07)',
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center py-20 px-6"
      >
        <div
          className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full"
          style={{ border: '1px solid #C4622D' }}
        >
          <span style={{ fontSize: '2rem' }}>✓</span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 300,
            color: '#F7F0E6',
            marginBottom: '1rem',
          }}
        >
          You're on the list
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(247,240,230,0.55)', maxWidth: '380px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          We've received your request for <strong style={{ color: '#D4A853' }}>{form.guests} guests</strong> on{' '}
          <strong style={{ color: '#D4A853' }}>{form.date}</strong> at{' '}
          <strong style={{ color: '#D4A853' }}>{form.time}</strong>.
          A confirmation will be sent to <strong style={{ color: '#D4A853' }}>{form.email}</strong>.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(247,240,230,0.3)' }}>
          Questions? Call us at{' '}
          <a href="tel:+9779801234567" style={{ color: '#C4622D' }}>+977 980 123 4567</a>
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Name */}
        <Field label="Full Name *">
          <input
            type="text"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="Aisha Rana"
            style={{ ...inputStyle, ...(errors.name ? { borderColor: '#e55' } : {}) }}
            onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={e => Object.assign(e.currentTarget.style, {
              borderColor: errors.name ? '#e55' : 'rgba(247,240,230,0.15)',
              background: 'rgba(247,240,230,0.06)',
            })}
          />
          {errors.name && <p style={{ color: '#e77', fontSize: '0.75rem', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.name}</p>}
        </Field>

        {/* Email */}
        <Field label="Email Address *">
          <input
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="aisha@example.com"
            style={{ ...inputStyle, ...(errors.email ? { borderColor: '#e55' } : {}) }}
            onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={e => Object.assign(e.currentTarget.style, {
              borderColor: errors.email ? '#e55' : 'rgba(247,240,230,0.15)',
              background: 'rgba(247,240,230,0.06)',
            })}
          />
          {errors.email && <p style={{ color: '#e77', fontSize: '0.75rem', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.email}</p>}
        </Field>

        {/* Phone */}
        <Field label="Phone Number *">
          <input
            type="tel"
            value={form.phone}
            onChange={e => set('phone', e.target.value)}
            placeholder="+977 98X XXX XXXX"
            style={{ ...inputStyle, ...(errors.phone ? { borderColor: '#e55' } : {}) }}
            onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={e => Object.assign(e.currentTarget.style, {
              borderColor: errors.phone ? '#e55' : 'rgba(247,240,230,0.15)',
              background: 'rgba(247,240,230,0.06)',
            })}
          />
          {errors.phone && <p style={{ color: '#e77', fontSize: '0.75rem', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.phone}</p>}
        </Field>

        {/* Guests */}
        <Field label="Number of Guests *">
          <select
            value={form.guests}
            onChange={e => set('guests', e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' as 'none' }}
            onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={e => Object.assign(e.currentTarget.style, {
              borderColor: 'rgba(247,240,230,0.15)',
              background: 'rgba(247,240,230,0.06)',
            })}
          >
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <option key={n} value={n} style={{ background: '#1C0A00' }}>
                {n} {n === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
            <option value="10+" style={{ background: '#1C0A00' }}>10+ Guests (call us)</option>
          </select>
        </Field>

        {/* Date */}
        <Field label="Preferred Date *">
          <input
            type="date"
            value={form.date}
            min={today}
            onChange={e => set('date', e.target.value)}
            style={{
              ...inputStyle,
              colorScheme: 'dark',
              ...(errors.date ? { borderColor: '#e55' } : {}),
            }}
            onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={e => Object.assign(e.currentTarget.style, {
              borderColor: errors.date ? '#e55' : 'rgba(247,240,230,0.15)',
              background: 'rgba(247,240,230,0.06)',
            })}
          />
          {errors.date && <p style={{ color: '#e77', fontSize: '0.75rem', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.date}</p>}
        </Field>

        {/* Time */}
        <Field label="Preferred Time *">
          <select
            value={form.time}
            onChange={e => set('time', e.target.value)}
            style={{
              ...inputStyle,
              cursor: 'pointer',
              appearance: 'none' as 'none',
              ...(errors.time ? { borderColor: '#e55' } : {}),
            }}
            onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={e => Object.assign(e.currentTarget.style, {
              borderColor: errors.time ? '#e55' : 'rgba(247,240,230,0.15)',
              background: 'rgba(247,240,230,0.06)',
            })}
          >
            <option value="" style={{ background: '#1C0A00' }}>Select a time</option>
            {TIMES.map(t => (
              <option key={t} value={t} style={{ background: '#1C0A00' }}>{t}</option>
            ))}
          </select>
          {errors.time && <p style={{ color: '#e77', fontSize: '0.75rem', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>{errors.time}</p>}
        </Field>
      </div>

      {/* Occasion */}
      <div className="mb-6">
        <Field label="Special Occasion">
          <select
            value={form.occasion}
            onChange={e => set('occasion', e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' as 'none' }}
            onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={e => Object.assign(e.currentTarget.style, {
              borderColor: 'rgba(247,240,230,0.15)',
              background: 'rgba(247,240,230,0.06)',
            })}
          >
            {OCCASIONS.map(o => (
              <option key={o} value={o} style={{ background: '#1C0A00' }}>{o}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Special Requests */}
      <div className="mb-10">
        <Field label="Special Requests or Dietary Notes">
          <textarea
            value={form.requests}
            onChange={e => set('requests', e.target.value)}
            placeholder="Allergies, high chair needed, window table preference…"
            rows={4}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={e => Object.assign(e.currentTarget.style, {
              borderColor: 'rgba(247,240,230,0.15)',
              background: 'rgba(247,240,230,0.06)',
            })}
          />
        </Field>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '18px 24px',
          backgroundColor: loading ? 'rgba(196,98,45,0.5)' : '#C4622D',
          color: '#F7F0E6',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s ease, opacity 0.2s ease',
        }}
        onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.backgroundColor = '#a84f24' }}
        onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.backgroundColor = '#C4622D' }}
      >
        {loading ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '14px', height: '14px', border: '2px solid rgba(247,240,230,0.3)',
              borderTopColor: '#F7F0E6', borderRadius: '50%',
              display: 'inline-block', animation: 'spin 0.8s linear infinite',
            }} />
            Sending Request…
          </span>
        ) : 'Confirm Reservation'}
      </button>

      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: '0.72rem',
        color: 'rgba(247,240,230,0.25)', textAlign: 'center', marginTop: '16px',
      }}>
        We'll confirm via email within 2 hours. For same-day bookings please call us.
      </p>
    </form>
  )
}
