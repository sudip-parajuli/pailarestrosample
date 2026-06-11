import { defineType, defineField } from 'sanity'

export const menuCategory = defineType({
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Category Name', type: 'string' }),
    defineField({ name: 'slug',        title: 'Slug',          type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Description',   type: 'text', options: { rows: 2 } as never }),
    defineField({ name: 'order',       title: 'Display Order', type: 'number' }),
    defineField({
      name: 'type',
      title: 'Category Type',
      type: 'string',
      options: { list: ['food', 'drinks', 'specials'], layout: 'radio' },
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
})
