import { defineType, defineField } from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({ name: 'name',        title: 'Item Name',   type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', options: { rows: 3 } as never }),
    defineField({ name: 'price',       title: 'Price (NPR)', type: 'number' }),
    defineField({ name: 'image',       title: 'Photo',       type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'category', title: 'Category', type: 'reference', to: [{ type: 'menuCategory' }],
    }),
    defineField({
      name: 'tags', title: 'Tags', type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['veg', 'vegan', 'spicy', 'bestseller', 'new', 'gluten-free'] },
    }),
    defineField({ name: 'available', title: 'Available',          type: 'boolean', initialValue: true }),
    defineField({ name: 'featured',  title: 'Feature on Homepage', type: 'boolean', initialValue: false }),
  ],
})
