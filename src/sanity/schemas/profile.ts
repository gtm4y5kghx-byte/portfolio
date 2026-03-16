import { defineType, defineField, defineArrayMember } from 'sanity';

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              validation: (rule) => rule.required(),
              options: {
                list: [
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
});
