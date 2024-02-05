import {defineType} from 'sanity'

const entry = defineType({
  name: 'entry',
  title: 'Entry',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      description:
        'This is what the URL will use, e.g. www.osl.com/new-forest-commons. Hit Generate or type a custom string.',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) =>
        // @ts-ignore
        Rule.required().custom((slug) => (/\s/g.test(slug.current) ? 'Cannot have spaces' : true)),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Innovative', value: 'innovative'},
          {title: 'Typical', value: 'typical'},
          {title: 'Historical', value: 'historical'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Terms',
      name: 'terms',
      type: 'array',
      description: "A list of the rules that comprise this model. Might not be 'complete'",
      of: [{type: 'term'}],
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'object',
      fields: [
        {
          title: 'File',
          name: 'file',
          type: 'image',
        },
        {
          title: 'Credit',
          name: 'credit',
          type: 'string',
          description: 'Describe the source of this image (to be displayed below it)',
        },
        {
          title: 'Source',
          name: 'source',
          type: 'url',
          description: 'Link to the source of the image',
          validation: (Rule) => Rule.uri(),
        },
      ],
    },
    // {
    //   name: 'description',
    //   title: 'Description',
    //   type: 'text',
    //   rows: 8,
    //   description:
    //     'A brief description of the model, identifying at high level what makes it interesting for the purposes of the Ownership Genome project.',
    // },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      description:
        'A brief description of the model, identifying at high level what makes it interesting for the purposes of the Ownership Genome project.',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'region',
          type: 'string',
          title: 'Region',
          description: 'A text description of where this model is / was used',
        },
        {name: 'geopoint', type: 'geopoint', title: 'Geopoint'},
      ],
    },
    // {
    //   name: 'boundary',
    //   title: 'Boundary',
    //   type: 'array',
    //   of: [{type: 'geopoint'}],
    //   components: {
    //     input: MapboxPolygonInput,
    //   },
    // },
    {
      name: 'dates',
      title: 'Dates',
      type: 'object',
      description: 'Approximate date range for the model',
      fields: [
        {
          name: 'start',
          title: 'Start',
          type: 'date',
          options: {
            dateFormat: 'YYYY',
          },
        },
        {
          name: 'end',
          title: 'End',
          type: 'date',
          options: {
            dateFormat: 'YYYY',
          },
        },
        {
          name: 'startYear',
          title: 'Start Year',
          type: 'number',
          description: 'Start year (use negative numbers for BCE)',
        },
        {
          name: 'endYear',
          title: 'End Year',
          type: 'number',
          description: 'End year (use negative numbers for BCE)',
        },
      ],
    },
    {
      name: 'references',
      title: 'References',
      description: 'A list of reference materials for learning more about this model',
      type: 'array',
      of: [
        {
          title: 'Reference',
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
    {
      name: 'tenureType',
      title: 'Tenure type',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Collective Ownership', value: 'collectiveOwnership'},
          {title: 'Leasehold', value: 'leasehold'},
          {title: 'Freehold', value: 'freehold'},
          {title: 'Renting', value: 'renting'},
          {title: 'Community Land Trust', value: 'communityLandTrust'},
          {title: 'Indigenous Recognition', value: 'indigenousRecognition'},
          {title: 'Commons', value: 'commons'},
          {title: 'Other', value: 'other'},
        ],
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'tags',
      options: {
        allowCreate: false,
        predefinedTags: [
          {label: 'References needed', value: 'referencesNeeded'},
          {label: 'Disputed', value: 'disputed'},
        ],
      },
    },
    {
      title: 'Rating',
      name: 'entryRating',
      type: 'reference',
      to: [{type: 'rating'}],
      options: {
        disableNew: true,
      },
    },
    {
      name: 'genome',
      title: 'Genome',
      type: 'genome',
      description: 'A representation of how strongly pattern classes apply to this entry',
    },
    {
      title: 'Contributors',
      name: 'contributors',
      type: 'array',
      description: 'A list of the contributors to this entry',
      of: [{type: 'contributor'}],
    },
  ],
})

export default entry
