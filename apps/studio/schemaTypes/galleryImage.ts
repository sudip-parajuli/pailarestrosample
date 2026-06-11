import { defineType, defineField } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({ name: 'image',   title: 'Image',         type: 'image', options: { hotspot: true } }),
    defineField({ name: 'caption', title: 'Caption',       type: 'string' }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['food', 'ambiance', 'team', 'events'] },
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
})

const FALLBACK_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', caption: 'Jhol Momo', category: 'food' },
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', caption: 'Main dining room', category: 'ambiance' },
  { url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800', caption: 'Dal Bhat plating', category: 'food' },
  { url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800', caption: 'The bar counter', category: 'ambiance' },
  { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', caption: 'Sekuwa off the charcoal', category: 'food' },
  { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', caption: 'Kitchen team', category: 'team' },
]
