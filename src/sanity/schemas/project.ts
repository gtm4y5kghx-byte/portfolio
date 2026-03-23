import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Text Only', value: 'textOnly' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projectImage',
      title: 'Project Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.displayMode === 'textOnly',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { displayMode?: string };
          if (parent?.displayMode === 'image' && !value) {
            return 'Image is required when display mode is "Image"';
          }
          return true;
        }),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Live project URL',
    }),
    defineField({
      name: 'repositories',
      title: 'Source Code',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'projectImage' },
  },
});
