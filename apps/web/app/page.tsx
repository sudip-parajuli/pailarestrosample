import { client } from '@/lib/sanity'
import {
  HOMEPAGE_QUERY,
  FEATURED_ITEMS_QUERY,
  TESTIMONIALS_QUERY,
  GALLERY_QUERY,
} from '@/lib/sanity'
import Hero from '@/components/sections/Hero'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import About from '@/components/sections/About'
import MenuPreview from '@/components/sections/MenuPreview'
import Gallery from '@/components/sections/Gallery'
import Testimonials from '@/components/sections/Testimonials'
import ReservationCTA from '@/components/sections/ReservationCTA'

// ISR: revalidate page every 60 seconds when Sanity content changes
export const revalidate = 60

export default async function HomePage() {
  const [homePage, featuredItems, testimonials, galleryImages] = await Promise.all([
    client.fetch(HOMEPAGE_QUERY).catch(() => null),
    client.fetch(FEATURED_ITEMS_QUERY).catch(() => []),
    client.fetch(TESTIMONIALS_QUERY).catch(() => []),
    client.fetch(GALLERY_QUERY).catch(() => []),
  ])

  return (
    <>
      {/* 1. Cinematic hero with parallax + word reveal */}
      <Hero data={homePage} />

      {/* 2. Scrolling marquee strip — between hero and about */}
      <MarqueeStrip />

      {/* 3. About / story with parallax image + animated stat counters */}
      <About data={homePage} />

      {/* 4. Featured menu items with 3D tilt hover */}
      <MenuPreview items={featuredItems} />

      {/* 5. Gallery with working category filters + lightbox */}
      <Gallery images={galleryImages} />

      {/* 6. Testimonials carousel — auto-advancing, 3 reviews */}
      <Testimonials testimonials={testimonials} />

      {/* 7. Reservation CTA with background texture */}
      <ReservationCTA />
    </>
  )
}
