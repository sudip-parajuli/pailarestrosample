'use client'
/**
 * Hero.tsx — Video background version
 * Uses /public/herovid.mp4 as the hero background.
 * Falls back to Unsplash image if video fails to load or on slow connections.
 *
 * ZOOM TRANSITION (Spotify / Apple-style):
 *   As the user scrolls down, the video background scales from 1 → 1.18
 *   while the overlay darkens to near-black. This "zooms the world away"
 *   and naturally dissolves the hero before the About section appears.
 *   Driven by Framer Motion useScroll — zero JS polling, compositor-only.
 */
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import TransitionLink from '@/components/ui/TransitionLink'

const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85&auto=format&fit=crop'

export default function Hero({ data }: { data: any }) {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // ── Smooth spring wrapper so the zoom feels weighty, not snappy ──────────
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  })

  // ── Video zoom: 1.0 → 1.18 as hero scrolls out of view ──────────────────
  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.18])

  // ── Overlay deepens: rgba(28,10,0,0.55) → rgba(0,0,0,0.92) ──────────────
  // expressed as a 0→1 value fed to the overlay opacity
  const overlayExtra = useTransform(smoothProgress, [0, 0.8], [0, 0.45])

  // ── Content drifts up + fades as user scrolls past ───────────────────────
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  // ── Word-by-word headline ─────────────────────────────────────────────────
  const headline = data?.heroHeadline || 'Where every meal tells a story'
  const words = headline.split(' ')

  const wordVariants = {
    hidden: { opacity: 0, y: 44, rotateX: -18 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.85,
        delay: 0.4 + i * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Video background (zooms on scroll) ──────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: videoScale, transformOrigin: 'center center' }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_FALLBACK}
          aria-hidden="true"
        >
          <source src="/herovid.mp4" type="video/mp4" />
          {/* Fallback image if video not supported */}
          <img
            src={HERO_FALLBACK}
            alt="Paila Restaurant & Bar"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Base warmth overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(28, 10, 0, 0.55)' }}
        />
        {/* Gradient vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(28,10,0,0.2) 0%, transparent 40%, rgba(28,10,0,0.9) 100%)',
          }}
        />
        {/* Scroll-driven dark ingress — smoothly blacks out as hero exits */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: overlayExtra, backgroundColor: '#000' }}
        />
      </motion.div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y: contentY, opacity }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.15em' }}
          animate={{ opacity: 1, letterSpacing: '0.42em' }}
          transition={{ duration: 1.4, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-accent)',
            fontStyle: 'italic',
            color: '#D4A853',
            fontSize: '0.95rem',
            marginBottom: '1.75rem',
          }}
        >
          Kathmandu · Est. 2025
        </motion.p>

        {/* Headline — word by word with 3D rotateX */}
        <motion.h1
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 10vw, 130px)',
            fontWeight: 300,
            color: '#F7F0E6',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            perspective: '900px',
            marginBottom: '2rem',
          }}
        >
          {words.map((word: string, i: number) => (
            <motion.span
              key={i}
              className="inline-block"
              style={{ marginRight: '0.22em' }}
              variants={wordVariants}
              custom={i}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'rgba(237, 228, 216, 0.72)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            maxWidth: '38rem',
            margin: '0 auto 3rem',
          }}
        >
          {data?.heroSubline ||
            'A family restaurant & bar celebrating the flavors of Nepal'}
        </motion.p>

        {/* CTAs — uses TransitionLink for burn effect */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <TransitionLink
            href="/reservations"
            className="px-10 py-4 text-sm tracking-widest uppercase font-medium
                       transition-opacity duration-200 hover:opacity-85 active:scale-95 inline-block"
            style={{
              backgroundColor: '#C4622D',
              color: '#F7F0E6',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {data?.heroCTA || 'Reserve a Table'}
          </TransitionLink>

          <TransitionLink
            href="/menu"
            className="px-10 py-4 text-sm tracking-widest uppercase font-medium
                       transition-all duration-200 hover:bg-white/10 active:scale-95 inline-block"
            style={{
              border: '1px solid rgba(247,240,230,0.38)',
              color: '#F7F0E6',
              fontFamily: 'var(--font-sans)',
            }}
          >
            View Menu
          </TransitionLink>
        </motion.div>
      </motion.div>


    </section>
  )
}
