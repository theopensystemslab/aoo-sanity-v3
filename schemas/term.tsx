import {defineType} from 'sanity'
import {IntentLink} from 'sanity/router'

const term = defineType({
  title: 'Term',
  name: 'term',
  type: 'object',
  fields: [
    {
      title: 'Pattern',
      name: 'pattern',
      type: 'reference',
      to: [{type: 'pattern'}],
      description: (
        <>
          {"If you don't see a pattern name that fits this term "}
          <IntentLink intent="create" params={{type: 'pattern'}} target="_blank">
            create it here
          </IntentLink>
        </>
      ),
    },
    {
      title: 'Description',
      name: 'description',
      description: 'A description of how this pattern applies in this particular model',
      type: 'string',
    },
    {
      hidden: true,
      title: 'Rights Intensity',
      name: 'rightsIntensity',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      description:
        'On a scale of 0 - 5, how strongly does this term confer rights to use, change, or live in peace on the property?',
    },
    {
      hidden: true,
      title: 'Obligation Intensity',
      name: 'obligationIntensity',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      description:
        'On a scale of 0 - 5, how strongly does this term denote an obligation to the land, community, or state?',
    },
    {
      title: 'Strength',
      name: 'strength',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      description:
        "On a scale of 1 - 5, how strongly does this term denote it's right / limitation / obligation?",
    },
    {
      name: 'termLegalMechanisms',
      title: 'Legal Mechanism(s)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'legalMechanism'}]}],
      description: 'Legal mechanism(s) being used to enact this right or obligation',
    },
  ],
  preview: {
    select: {
      title: 'pattern.name',
    },
    prepare(selection) {
      return {
        title: selection.title,
      }
    },
  },
})

export default term
