'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'
import Reveal from '@/components/ui/Reveal'

const ABOUT_FALLBACK_IMG =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop'

const STATS = [
  { value: 40, suffix: '+', label: 'Dishes on menu' },
  { value: 12, suffix: '', label: 'Craft cocktails' },
  { value: 100, suffix: '%', label: 'Locally sourced' },
  { value: 7, suffix: ' days', label: 'Open weekly' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={{ textContent: '0' } as any}
        animate={inView ? { textContent: value } as any : {}}
        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
        onUpdate={(latest: any) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(Number(latest.textContent)) + suffix
          }
        }}
      >
        0
      </motion.span>
    </motion.span>
  )
}

export default function About({ data }: { data: any }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const aboutImg = data?.aboutImage
    ? urlFor(data.aboutImage).width(900).quality(85).url()
    : ABOUT_FALLBACK_IMG

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 overflow-hidden"
      style={{ backgroundColor: '#2A1810' }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* ── Image with parallax ────────────────────────────────────── */}
        <Reveal direction="left">
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.img
              src={aboutImg}
              alt="Inside Paila Restaurant"
              className="w-full h-[115%] object-cover object-center absolute top-[-7.5%]"
              style={{ y: imgY }}
            />
            {/* Decorative corner frame */}
            <div
              className="absolute inset-4 border pointer-events-none"
              style={{ borderColor: 'rgba(212,168,83,0.2)' }}
            />
          </div>
        </Reveal>

        {/* ── Text content ──────────────────────────────────────────── */}
        <div>
          <Reveal delay={0.1}>
            <p
              className="text-base mb-4"
              style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: '#D4A853' }}
            >
              Our Story
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h2
              className="font-display mb-8"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                color: '#F7F0E6',
                lineHeight: 1.05,
              }}
            >
              A family table,<br />open to all
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div
              className="text-base leading-relaxed space-y-4 mb-10"
              style={{ fontFamily: 'var(--font-sans)', color: 'rgba(237,228,216,0.65)' }}
            >
              {data?.aboutText ? (
                <PortableText value={data.aboutText} />
              ) : (
                <>
                  <p>
                    Paila began as a dream shared around a kitchen table — a place where the
                    warmth of Nepali hospitality meets the vibrancy of modern dining.
                  </p>
                  <p>
                    Every dish we serve carries the memory of a grandmother's recipe, refined
                    with care for the table you share with us. We source our ingredients from
                    local farms in the Kathmandu Valley, and our bar celebrates the botanical
                    wealth of the Himalayas.
                  </p>
                </>
              )}
            </div>
          </Reveal>

          {/* ── Stats grid ──────────────────────────────────────────── */}
          <Reveal delay={0.3}>
            <div className="grid grid-cols-2 gap-6">
              {(data?.features?.length > 0
                ? data.features.map((f: any, i: number) => ({ ...STATS[i], label: f.title, value: STATS[i]?.value || 0 }))
                : STATS
              ).map((stat, i) => (
                <div
                  key={i}
                  className="pt-5"
                  style={{ borderTop: '1px solid rgba(247,240,230,0.08)' }}
                >
                  <p
                    className="mb-1"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.5rem',
                      fontWeight: 300,
                      color: '#C4622D',
                      lineHeight: 1,
                    }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-sans)', color: 'rgba(247,240,230,0.4)' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
