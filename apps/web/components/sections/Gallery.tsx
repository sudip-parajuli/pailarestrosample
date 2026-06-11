'use client'
import { useState } from 'react'
import { urlFor } from '@/lib/sanity'

interface GalleryImage {
  _id: string
  caption?: string
  category?: string
  image?: { asset?: { url?: string } }
}

const CATEGORIES = ['all', 'food', 'ambiance', 'team', 'events'] as const

export default function Gallery({ images }: { images?: GalleryImage[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const displayImages = images?.length ? images : SAMPLE_GALLERY
  const filtered = activeCategory === 'all'
    ? displayImages
    : displayImages.filter(img => img.category === activeCategory)

  return (
    <section id="gallery" className="py-24 px-6" style={{ backgroundColor: 'var(--color-bone)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-accent italic text-sm mb-3 tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-copper)' }}>
            Moments at Paila
          </p>
          <h2 className="text-display font-display"
            style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-ember)' }}>
            The Gallery
          </h2>
          <div className="divider-gold mt-6" />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              id={`gallery-filter-${cat}`}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                border: `1px solid ${activeCategory === cat ? 'var(--color-ember)' : 'var(--color-mist)'}`,
                backgroundColor: activeCategory === cat ? 'var(--color-ember)' : 'transparent',
                color: activeCategory === cat ? 'var(--color-cream)' : 'var(--color-mist)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <div
              key={img._id}
              className="break-inside-avoid overflow-hidden group relative"
            >
              {img.image?.asset?.url ? (
                <img
                  src={urlFor(img.image as Parameters<typeof urlFor>[0]).width(600).quality(80).url()}
                  alt={img.caption ?? 'Paila Gallery'}
                  className={`img-bleed w-full group-hover:scale-105 transition-transform duration-700 ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                />
              ) : (
                <div
                  className={`w-full flex items-center justify-center ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                  style={{ backgroundColor: `hsl(${20 + i * 8}, 30%, ${15 + i * 3}%)` }}
                >
                  <span className="text-3xl opacity-40">{GALLERY_EMOJIS[i % GALLERY_EMOJIS.length]}</span>
                </div>
              )}
              {/* Caption overlay */}
              {img.caption && (
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(28,10,0,0.7) 0%, transparent 50%)' }}>
                  <p className="font-sans text-xs text-cream/90">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const GALLERY_EMOJIS = ['🍛', '🥘', '🫙', '🌿', '🍷', '🍢', '✨', '🔥', '🎶']

const SAMPLE_GALLERY: GalleryImage[] = [
  { _id: 'g1', caption: 'Jhol Momo in broth',       category: 'food' },
  { _id: 'g2', caption: 'The main dining room',       category: 'ambiance' },
  { _id: 'g3', caption: 'Dal Bhat plating',           category: 'food' },
  { _id: 'g4', caption: 'Friday evening live music',  category: 'events' },
  { _id: 'g5', caption: 'Our kitchen team',           category: 'team' },
  { _id: 'g6', caption: 'Sekuwa off the charcoal',    category: 'food' },
  { _id: 'g7', caption: 'The bar counter',            category: 'ambiance' },
  { _id: 'g8', caption: 'Himalayan-inspired cocktails', category: 'ambiance' },
  { _id: 'g9', caption: 'Harvest dinner event',       category: 'events' },
]
