import { defineType, defineField, defineArrayMember } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'string',
      description: 'e.g. March 2024',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'string',
      description: 'e.g. March 2026 — leave empty for current position',
    }),
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'orderAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'role',
      startDate: 'startDate',
    },
    prepare({ title, subtitle, startDate }) {
      return {
        title,
        subtitle: [subtitle, startDate]
          .filter(Boolean)
          .join(' · '),
      };
    },
  },
});
