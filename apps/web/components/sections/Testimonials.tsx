'use client'
import { useState } from 'react'

interface Testimonial {
  _id: string
  name: string
  quote: string
  rating?: number
  source?: string
}

export default function Testimonials({ testimonials }: { testimonials?: Testimonial[] }) {
  const [active, setActive] = useState(0)
  const items = testimonials?.length ? testimonials : SAMPLE_TESTIMONIALS

  const prev = () => setActive(i => (i - 1 + items.length) % items.length)
  const next = () => setActive(i => (i + 1) % items.length)

  const current = items[active]

  return (
    <section id="testimonials" className="py-24 px-6" style={{ backgroundColor: 'var(--color-ember)' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <p className="font-accent italic text-sm mb-3 tracking-[0.25em] uppercase"
          style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-gold)' }}>
          What Guests Say
        </p>
        <h2 className="text-heading font-display mb-16"
          style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-cream)' }}>
          Voices from the Table
        </h2>

        {/* Quote */}
        <div className="relative min-h-[200px] flex flex-col items-center justify-center">
          {/* Large decorative quote mark */}
          <span
            className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-8xl leading-none select-none pointer-events-none"
            style={{ fontFamily: 'var(--font-family-display)', color: 'rgba(212,168,83,0.15)' }}
          >
            &ldquo;
          </span>

          <blockquote
            key={active}
            className="font-accent italic text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl animate-fade-in"
            style={{ fontFamily: 'var(--font-family-accent)', color: 'rgba(237,228,216,0.9)' }}
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* Stars */}
          {current.rating && (
            <div className="flex gap-1 justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: i < current.rating! ? 'var(--color-gold)' : 'rgba(212,168,83,0.2)' }}>
                  ★
                </span>
              ))}
            </div>
          )}

          <p className="font-sans text-sm font-medium" style={{ color: 'var(--color-cream)' }}>
            {current.name}
          </p>
          {current.source && (
            <p className="font-sans text-xs mt-1" style={{ color: 'var(--color-mist)' }}>
              via {current.source}
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            id="testimonial-prev"
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center transition-colors"
            style={{ border: '1px solid rgba(247,240,230,0.2)', color: 'rgba(247,240,230,0.6)' }}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                id={`testimonial-dot-${i}`}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  backgroundColor: i === active ? 'var(--color-gold)' : 'rgba(212,168,83,0.25)',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            id="testimonial-next"
            onClick={next}
            className="w-10 h-10 flex items-center justify-center transition-colors"
            style={{ border: '1px solid rgba(247,240,230,0.2)', color: 'rgba(247,240,230,0.6)' }}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    _id: 't1',
    name: 'Priya S.',
    quote: 'The Jhol Momo transported me back to the streets of Kathmandu. Every bite was warm, spicy, and deeply satisfying. Paila is an absolute gem.',
    rating: 5,
    source: 'Google',
  },
  {
    _id: 't2',
    name: 'Marcus T.',
    quote: 'I have traveled across Nepal for three weeks and Paila served me the most memorable Dal Bhat of the entire trip. The ghee alone deserves an award.',
    rating: 5,
    source: 'Google',
  },
  {
    _id: 't3',
    name: 'Anisha G.',
    quote: 'The atmosphere is cinematic — warm, dark, intimate. And then the Sekuwa arrived and I forgot everything else. Will be back every visit.',
    rating: 5,
    source: 'Facebook',
  },
]
