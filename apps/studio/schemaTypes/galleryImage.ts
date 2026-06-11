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
