import type { Metadata } from 'next'
import Gallery from '@/components/sections/Gallery'
import { client, GALLERY_QUERY } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Gallery | Paila Restaurant & Bar',
  description: 'Browse our gallery of food, ambiance, team and events at Paila Restaurant Kathmandu.',
}

export const revalidate = 60

export default async function GalleryPage() {
  let images = []
  try {
    images = await client.fetch(GALLERY_QUERY)
  } catch {
    console.log('Sanity not connected — rendering with fallback gallery images')
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bone)', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        className="pt-36 pb-20 px-6 text-center"
        style={{ backgroundColor: 'var(--color-ember)' }}
      >
        <p className="font-accent italic text-sm mb-3 tracking-[0.25em] uppercase"
          style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-gold)' }}>
          A Visual Story
        </p>
        <h1 className="text-display font-display"
          style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-cream)' }}>
          The Gallery
        </h1>
        <div className="divider-gold mt-6" />
      </div>

      <Gallery images={images} />
    </div>
  )
}
