import { client } from '@/lib/sanity'
import { HOMEPAGE_QUERY, FEATURED_ITEMS_QUERY, TESTIMONIALS_QUERY, GALLERY_QUERY } from '@/lib/sanity'
import Hero from '@/components/sections/Hero'
import MenuPreview from '@/components/sections/MenuPreview'
import About from '@/components/sections/About'
import Gallery from '@/components/sections/Gallery'
import Testimonials from '@/components/sections/Testimonials'
import ReservationCTA from '@/components/sections/ReservationCTA'

export const revalidate = 60

export default async function HomePage() {
  let homePage = null
  let featuredItems = []
  let testimonials = []
  let galleryImages = []

  try {
    ;[homePage, featuredItems, testimonials, galleryImages] = await Promise.all([
      client.fetch(HOMEPAGE_QUERY),
      client.fetch(FEATURED_ITEMS_QUERY),
      client.fetch(TESTIMONIALS_QUERY),
      client.fetch(GALLERY_QUERY),
    ])
  } catch {
    // Sanity not configured yet — render with fallback data
    console.log('Sanity not connected — rendering with fallback content')
  }

  return (
    <>
      <Hero data={homePage} />
      <About data={homePage} />
      <MenuPreview items={featuredItems} />
      <Gallery images={galleryImages} />
      <Testimonials testimonials={testimonials} />
      <ReservationCTA />
    </>
  )
}
