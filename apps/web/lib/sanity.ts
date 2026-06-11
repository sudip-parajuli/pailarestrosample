import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Validate projectId — must be a-z, 0-9, dashes only
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const SANITY_CONNECTED = /^[a-z0-9-]+$/.test(rawProjectId)

export const client = SANITY_CONNECTED
  ? createClient({
      projectId: rawProjectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : createClient({
      projectId: 'placeholder',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    })

export const isSanityConnected = SANITY_CONNECTED

const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)

// ── GROQ Queries ────────────────────────────────────────────

export const HOMEPAGE_QUERY = `
  *[_type == "homePage"][0] {
    heroHeadline, heroSubline, heroCTA, heroImage, heroVideo,
    aboutText, aboutImage, features
  }
`

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    restaurantName, tagline, phone, email, address,
    openingHours, socialLinks, googleMapsEmbedUrl
  }
`

export const MENU_QUERY = `
  *[_type == "menuCategory"] | order(order asc) {
    _id, title, description, type,
    "items": *[_type == "menuItem" && references(^._id) && available == true] | order(_createdAt asc) {
      _id, name, description, price, tags, featured,
      image { asset->{ url }, hotspot }
    }
  }
`

export const FEATURED_ITEMS_QUERY = `
  *[_type == "menuItem" && featured == true][0...6] {
    _id, name, description, price, tags,
    image { asset->{ url }, hotspot },
    "category": category->{ title }
  }
`

export const GALLERY_QUERY = `
  *[_type == "galleryImage"] | order(order asc) {
    _id, caption, category,
    image { asset->{ url }, hotspot }
  }
`

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && featured == true] {
    _id, name, quote, rating, source
  }
`
