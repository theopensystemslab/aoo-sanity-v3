import {defineType} from 'sanity'

const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'string',
      description: 'Unique identifier for this page',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title which will be displayed on the page',
    },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
  preview: {
    select: {
      title: 'slug',
    },
    prepare(selection) {
      return {
        title: selection.title,
      }
    },
  },
})

export default page
