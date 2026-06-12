'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'

const FALLBACK_TESTIMONIALS = [
  {
    _id: 't1',
    name: 'Priya S.',
    quote:
      'The Jhol Momo transported me back to the streets of Kathmandu. Every bite was warm, spicy, and deeply satisfying. Paila is an absolute gem.',
    rating: 5,
    source: 'Google',
  },
  {
    _id: 't2',
    name: 'Rohan M.',
    quote:
      "The Sekuwa Platter was extraordinary — the charcoal smoke, the mint chutney, the perfectly charred edges. I've been to a lot of restaurants in Thamel. Paila is something different.",
    rating: 5,
    source: 'Facebook',
  },
  {
    _id: 't3',
    name: 'Anita K.',
    quote:
      "We booked a table for our anniversary and the team made it feel genuinely special. The Paila Old Fashioned with jaggery and cardamom was unlike anything I've tasted. We'll be back.",
    rating: 5,
    source: 'Google',
  },
]

const DIRECTION = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
}

export default function Testimonials({ testimonials }: { testimonials?: any[] }) {
  const items =
    testimonials && testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS
  const [[index, direction], setSlide] = useState([0, 0])

  const paginate = (dir: number) => {
    setSlide(([cur]) => [(cur + dir + items.length) % items.length, dir])
  }

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000)
    return () => clearInterval(timer)
  }, [items.length])

  const current = items[index]

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#2A1810' }}>
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p
            className="text-base mb-3"
            style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: '#D4A853' }}
          >
            What Guests Say
          </p>
          <h2
            className="font-display mb-16"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#F7F0E6' }}
          >
            Voices from the Table
          </h2>
        </Reveal>

        {/* Quote */}
        <div className="relative min-h-[180px] flex items-center justify-center overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.blockquote
              key={current._id}
              custom={direction}
              variants={DIRECTION}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute px-4"
            >
              <p
                className="text-xl md:text-2xl leading-relaxed mb-8"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  color: 'rgba(247,240,230,0.9)',
                  fontStyle: 'italic',
                }}
              >
                "{current.quote}"
              </p>

              <div className="flex flex-col items-center gap-3">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <span key={i} style={{ color: '#D4A853' }}>★</span>
                  ))}
                </div>
                <p
                  className="text-sm font-medium"
                  style={{ fontFamily: 'var(--font-sans)', color: '#F7F0E6' }}
                >
                  {current.name}
                </p>
                <p
                  className="text-xs uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-sans)', color: 'rgba(247,240,230,0.35)' }}
                >
                  via {current.source}
                </p>
              </div>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <button
            onClick={() => paginate(-1)}
            className="w-10 h-10 border flex items-center justify-center transition-colors hover:bg-cream/10"
            style={{ borderColor: 'rgba(247,240,230,0.2)', color: 'rgba(247,240,230,0.6)' }}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide([i, i > index ? 1 : -1])}
                className="transition-all duration-300"
                style={{
                  width: i === index ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: i === index ? '#C4622D' : 'rgba(247,240,230,0.25)',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="w-10 h-10 border flex items-center justify-center transition-colors hover:bg-cream/10"
            style={{ borderColor: 'rgba(247,240,230,0.2)', color: 'rgba(247,240,230,0.6)' }}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
