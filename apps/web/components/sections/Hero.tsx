'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

interface HeroData {
  heroHeadline?: string
  heroSubline?: string
  heroCTA?: string
  heroImage?: object
}

export default function Hero({ data }: { data: HeroData | null }) {
  const bgImage = data?.heroImage
    ? urlFor(data.heroImage as Parameters<typeof urlFor>[0]).width(1920).quality(85).url()
    : null

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-ember)' }}
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        {bgImage ? (
          <img src={bgImage} alt="Paila Restaurant ambiance" className="img-bleed" />
        ) : (
          /* Decorative fallback — atmospheric gradient */
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, #1C0A00 0%, #2A1810 40%, #3D1F0D 70%, #1C0A00 100%)',
            }}
          >
            {/* Subtle texture lines */}
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(212,168,83,0.3) 40px, rgba(212,168,83,0.3) 41px)',
              }}
            />
          </div>
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(28,10,0,0.62)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-accent italic text-gold text-sm mb-6 tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-gold)' }}
        >
          Kathmandu &nbsp;·&nbsp; Est. 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-hero font-display text-cream mb-8"
          style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-cream)' }}
        >
          {data?.heroHeadline ?? (
            <>Where every meal<br />tells a story</>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.35 }}
          className="font-sans text-lg mb-12 max-w-xl mx-auto"
          style={{ color: 'rgba(237,228,216,0.75)' }}
        >
          {data?.heroSubline ?? 'A family restaurant & bar celebrating the flavors of Nepal'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            id="hero-cta-reserve"
            href="/reservations"
            className="px-10 py-4 font-sans text-sm tracking-widest uppercase bg-copper text-cream hover:opacity-90 transition-all duration-300"
          >
            {data?.heroCTA ?? 'Reserve a Table'}
          </Link>
          <Link
            id="hero-cta-menu"
            href="/menu"
            className="px-10 py-4 font-sans text-sm tracking-widest uppercase border border-cream/50 text-cream hover:bg-cream/10 transition-all duration-300"
          >
            View Menu
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-sans text-xs tracking-widest uppercase" style={{ color: 'rgba(247,240,230,0.45)' }}>
          Scroll
        </span>
        <motion.div
          className="w-px bg-cream/30"
          style={{ height: 48, background: 'rgba(247,240,230,0.3)' }}
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  )
}
