import { defineType, defineField, defineArrayMember } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoImage',
      title: 'Default OG Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'footerContent',
      title: 'Footer Content',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'siteTitle' },
  },
});
