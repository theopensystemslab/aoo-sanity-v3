import {defineType} from 'sanity'

const legalMechanism = defineType({
  title: 'Legal Mechanism',
  name: 'legalMechanism',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Legal References',
      name: 'legalReferences',
      type: 'array',
      of: [
        {
          title: 'Legal Reference',
          type: 'object',
          fields: [
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
            {
              title: 'Source',
              name: 'source',
              description: 'The name of the author or source',
              type: 'string',
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              validation: (Rule) => Rule.uri(),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
    prepare(selection) {
      return {
        title: selection.title,
      }
    },
  },
})

export default legalMechanism
