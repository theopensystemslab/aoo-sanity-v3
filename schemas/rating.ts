import {defineType} from 'sanity'

const rating = defineType({
  title: 'Rating',
  name: 'rating',
  type: 'document',
  description: 'something',
  fields: [
    {
      title: 'Grade',
      name: 'grade',
      type: 'string',
    },
    {
      title: 'Criteria',
      name: 'criteria',
      type: 'text',
    },
  ],
})

export default rating
