import { defineType, defineField } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline',           type: 'string' }),
    defineField({ name: 'heroSubline',  title: 'Hero Subline',            type: 'string' }),
    defineField({ name: 'heroCTA',      title: 'Hero CTA Button Text',    type: 'string' }),
    defineField({
      name: 'heroVideo', title: 'Hero Background (Video or Image)', type: 'file',
      options: { accept: 'video/*,image/*' },
    }),
    defineField({ name: 'heroImage',  title: 'Hero Background Image (fallback)', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'aboutText', title: 'About / Story Text', type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'aboutImage', title: 'About Section Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'features', title: 'Features / Highlights', type: 'array',
      of: [{
        type: 'object',
        name: 'feature',
        fields: [
          { name: 'icon',  title: 'Icon (emoji or text)', type: 'string' },
          { name: 'title', title: 'Title',                type: 'string' },
          { name: 'text',  title: 'Description',          type: 'text' },
        ],
      }],
    }),
  ],
})
