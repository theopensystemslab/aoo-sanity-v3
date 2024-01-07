import React from 'react'
import {defineField, defineType} from 'sanity'

const pattern = defineType({
  name: 'pattern',
  title: 'Pattern',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      description:
        'A brief, plain english statement that communicates the gist of that pattern (e.g. Use it or lose it)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      description: 'A general / universal description of the pattern',
      type: 'text',
      rows: 5,
    },
    {
      name: 'class',
      title: 'Class',
      type: 'reference',
      to: [{type: 'patternClass'}],
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Right', value: 'right'},
          {title: 'Limitation', value: 'limitation'},
          {title: 'Obligation', value: 'obligation'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'image',
      // accept: ".svg",
      description: 'SVG icon representing this pattern',
    }),
  ],
  orderings: [
    {
      title: 'Class',
      name: 'class',
      by: [{field: 'class.order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      name: 'name',
      className: 'class.name',
      color: 'class.color.hex',
    },
    prepare: ({name: title, className: subtitle, color}) => ({
      title,
      subtitle,
      media: <div style={{backgroundColor: color, height: '100%', width: '100%'}} />,
    }),
  },
})

export default pattern
