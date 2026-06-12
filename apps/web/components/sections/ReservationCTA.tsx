'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import TransitionLink from '@/components/ui/TransitionLink'
import Reveal from '@/components/ui/Reveal'
import { StaggerReveal, StaggerItem } from '@/components/ui/Reveal'

export default function ReservationCTA() {
  return (
    <section
      className="relative py-32 px-6 overflow-hidden"
      style={{ backgroundColor: '#1C0A00' }}
    >
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=40&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(0)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, #1C0A00 30%, rgba(28,10,0,0.6) 100%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Reveal>
          <p
            className="text-base mb-4"
            style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: '#D4A853' }}
          >
            Join us for dinner
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="font-display mb-6"
            style={{
              fontSize: 'clamp(40px, 7vw, 96px)',
              color: '#F7F0E6',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            Reserve your<br />
            <span style={{ color: '#C4622D' }}>table tonight</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="text-lg mb-12 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(247,240,230,0.55)' }}
          >
            Tables fill quickly on weekends. Book ahead and we'll have everything
            ready for you.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <TransitionLink
              href="/reservations"
              className="px-12 py-4 text-sm tracking-widest uppercase font-medium transition-all
                         duration-300 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: '#C4622D',
                color: '#F7F0E6',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Book a Table
            </TransitionLink>
            <a
              href="tel:+9779801234567"
              className="px-12 py-4 text-sm tracking-widest uppercase font-medium transition-all
                         duration-300 hover:bg-cream/10 active:scale-95"
              style={{
                border: '1px solid rgba(247,240,230,0.3)',
                color: 'rgba(247,240,230,0.7)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Call Us
            </a>
          </div>
        </Reveal>

        {/* Opening hours strip */}
        <Reveal delay={0.4}>
          <div
            className="mt-16 pt-8 flex flex-wrap justify-center gap-8"
            style={{ borderTop: '1px solid rgba(247,240,230,0.08)' }}
          >
            {[
              { days: 'Mon – Fri', hours: '11 AM – 10 PM' },
              { days: 'Sat – Sun', hours: '10 AM – 11 PM' },
              { days: 'Bar', hours: 'Until midnight' },
            ].map((item) => (
              <div key={item.days} className="text-center">
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ fontFamily: 'var(--font-sans)', color: 'rgba(247,240,230,0.3)' }}
                >
                  {item.days}
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ fontFamily: 'var(--font-sans)', color: 'rgba(247,240,230,0.7)' }}
                >
                  {item.hours}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
