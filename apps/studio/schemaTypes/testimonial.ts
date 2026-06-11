import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name',     title: 'Customer Name', type: 'string' }),
    defineField({ name: 'quote',    title: 'Quote',         type: 'text', options: { rows: 4 } as never }),
    defineField({ name: 'rating',   title: 'Rating (1–5)', type: 'number', validation: r => r.min(1).max(5) }),
    defineField({ name: 'source',   title: 'Source',        type: 'string', options: { list: ['Google', 'Facebook', 'Direct'] } }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: false }),
  ],
})
