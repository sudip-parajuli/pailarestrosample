'use client'
import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { urlFor } from '@/lib/sanity'
import { StaggerReveal, StaggerItem } from '@/components/ui/Reveal'
import Reveal from '@/components/ui/Reveal'

// ─── Fallback images (Unsplash — warm food/Nepal restaurant vibe) ────────────
// Replace these with real Paila photos once client provides them
const FALLBACK_IMAGES = [
  {
    _id: 'f1',
    url: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80&auto=format&fit=crop',
    caption: 'Jhol Momo — steamed dumplings in spiced broth',
    category: 'food',
  },
  {
    _id: 'f2',
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop',
    caption: 'The main dining room',
    category: 'ambiance',
  },
  {
    _id: 'f3',
    url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80&auto=format&fit=crop',
    caption: 'Dal Bhat Tarkari plating',
    category: 'food',
  },
  {
    _id: 'f4',
    url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80&auto=format&fit=crop',
    caption: 'The bar counter — craft cocktails',
    category: 'ambiance',
  },
  {
    _id: 'f5',
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&auto=format&fit=crop',
    caption: 'Sekuwa off the charcoal',
    category: 'food',
  },
  {
    _id: 'f6',
    url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80&auto=format&fit=crop',
    caption: 'Our kitchen team',
    category: 'team',
  },
  {
    _id: 'f7',
    url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80&auto=format&fit=crop',
    caption: 'Himalayan-inspired cocktails',
    category: 'ambiance',
  },
  {
    _id: 'f8',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80&auto=format&fit=crop',
    caption: 'Friday evening live music',
    category: 'events',
  },
  {
    _id: 'f9',
    url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80&auto=format&fit=crop',
    caption: 'Sel Roti dessert',
    category: 'food',
  },
]

const FILTERS = ['all', 'food', 'ambiance', 'team', 'events'] as const
type Filter = (typeof FILTERS)[number]

interface GalleryProps {
  images?: any[]
}

export default function Gallery({ images }: GalleryProps) {
  const [active, setActive] = useState<Filter>('all')
  const [lightbox, setLightbox] = useState<string | null>(null)

  // Use Sanity images if available, otherwise fallback
  const allImages =
    images && images.length > 0
      ? images.map((img) => ({
          _id: img._id,
          url: urlFor(img.image).width(800).height(600).quality(80).url(),
          caption: img.caption || '',
          category: img.category || 'food',
        }))
      : FALLBACK_IMAGES

  const filtered =
    active === 'all' ? allImages : allImages.filter((img) => img.category === active)

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F7F0E6' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-14">
          <p
            className="text-base mb-3"
            style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: '#C4622D' }}
          >
            Moments at Paila
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#1C0A00' }}
          >
            The Gallery
          </h2>
        </Reveal>

        {/* Filter tabs */}
        <Reveal delay={0.1} className="flex gap-2 justify-center flex-wrap mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="relative px-5 py-2 text-sm uppercase tracking-widest transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-sans)',
                color: active === f ? '#F7F0E6' : '#9A8F84',
              }}
            >
              {active === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0"
                  style={{ backgroundColor: '#1C0A00' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </Reveal>

        {/* Masonry grid with layout animation */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                  // Make some items span 2 rows for masonry feel
                  className={`group relative overflow-hidden cursor-pointer ${
                    i % 5 === 0 ? 'md:row-span-2' : ''
                  }`}
                  style={{ aspectRatio: i % 5 === 0 ? '3/4' : '4/3' }}
                  onClick={() => setLightbox(img.url)}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                    style={{ background: 'linear-gradient(to top, rgba(28,10,0,0.85), transparent)' }}
                  >
                    <p
                      className="text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      style={{ fontFamily: 'var(--font-sans)', color: '#F7F0E6' }}
                    >
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(28,10,0,0.95)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="Gallery image"
              className="max-w-full max-h-[90vh] object-contain"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-cream/60 hover:text-cream text-2xl transition-colors"
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
