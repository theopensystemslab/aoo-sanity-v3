import {defineField, defineType} from 'sanity'

// `terms[] { strength, pattern-> { type, class-> { name } } } } { _id, terms[pattern.class.name == "${pattern}" && pattern.type == "${type}"]} { _id, "sum": math::sum(terms[].strength), "numTerms": count(terms[])`

const query = (pattern: any, type: any) =>
  // Get all terms for an entry, using joins to get term.pattern.class.name
  `terms[] { strength, pattern-> { type, class-> { name } } } }` +
  // Filter on patterns matching the given name and type
  `{ _id, terms[pattern.class.name == "${pattern}" && pattern.type == "${type}"]}` +
  // Re-project to a more useable shape
  `{ _id, "termStrength": terms[].strength`

const patternType = (pattern: any, type: any) =>
  defineField({
    title: type,
    name: type.toLowerCase(),
    type: 'computedNumber',
    // inputComponent: ComputedField,
    options: {
      // editable: false,

      buttonText: 'Regenerate',
      documentQuerySelection: query(pattern, type.toLowerCase()),
      reduceQueryResult: (result: any) => {
        const sum = result.termStrength.reduce((a: number, b: number) => a + b, 0)
        const avg = sum / result.termStrength.length
        return avg || 0
      },
    },
  })

const genomeField = (patternTitle: string, patternName: string | null = null) => ({
  title: patternTitle,
  name: patternName || patternTitle.toLowerCase(),
  type: 'object',
  fields: [patternType(patternTitle, 'Right'), patternType(patternTitle, 'Obligation')],
})

const genome = defineType({
  title: 'Genome',
  name: 'genome',
  type: 'object',
  fields: [
    genomeField('Rent'),
    genomeField('Transfer'),
    genomeField('Administration'),
    genomeField('Eligibility'),
    genomeField('Security of tenure', 'securityOfTenure'),
    genomeField('Develop'),
    genomeField('Stewardship'),
    genomeField('Use'),
  ],
})

export default genome
