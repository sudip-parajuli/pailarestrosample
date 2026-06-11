import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'restaurantName', title: 'Restaurant Name', type: 'string' }),
    defineField({ name: 'tagline',        title: 'Tagline',         type: 'string' }),
    defineField({ name: 'phone',          title: 'Phone Number',    type: 'string' }),
    defineField({ name: 'email',          title: 'Email',           type: 'string' }),
    defineField({ name: 'address',        title: 'Address',         type: 'text', options: { rows: 3 } as never }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [{
        type: 'object',
        name: 'hourEntry',
        fields: [
          { name: 'days',  title: 'Days',  type: 'string' },
          { name: 'hours', title: 'Hours', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'facebook',  title: 'Facebook URL',  type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
      ],
    }),
    defineField({ name: 'googleMapsEmbedUrl', title: 'Google Maps Embed URL', type: 'url' }),
  ],
})
