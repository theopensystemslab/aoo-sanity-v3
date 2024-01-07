import {defineType} from 'sanity'

const contributor = defineType({
  title: 'Contributor',
  name: 'contributor',
  type: 'object',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    },
    {
      title: 'Organisation',
      name: 'organisation',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare(selection) {
      return {
        title: selection.title,
      }
    },
  },
})

export default contributor
