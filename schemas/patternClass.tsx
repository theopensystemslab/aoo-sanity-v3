import {defineType} from 'sanity'

const patternClass = defineType({
  name: 'patternClass',
  title: 'Pattern Class',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      description: 'A brief description of this class',
      type: 'text',
      rows: 3,
    },
    {
      name: 'color',
      title: 'Color',
      type: 'color',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
  ],
  preview: {
    select: {
      name: 'name',
      color: 'color.hex',
    },
    prepare: ({name, color}) => ({
      title: name,
      media: <div style={{backgroundColor: color, height: '100%', width: '100%'}} />,
    }),
  },
})

export default patternClass
