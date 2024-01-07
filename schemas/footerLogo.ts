import {defineType} from 'sanity'

const footerLogo = defineType({
  title: 'Footer Logo',
  name: 'footerLogo',
  type: 'document',
  description: 'Logos which appear in the footer of the site',
  fields: [
    {
      title: 'Logo',
      name: 'logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      description: 'A description of the logo. This will be used as alt text for the image',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Order',
      name: 'order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
  ],
})

export default footerLogo
