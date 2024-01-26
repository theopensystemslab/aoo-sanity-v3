import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {sanityComputedField} from 'sanity-plugin-computed-field'
import {tags} from 'sanity-plugin-tags'
import {colorInput} from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'Ownership Genome',

  projectId: '9zzdj3qn',
  dataset: 'staging',

  plugins: [structureTool(), visionTool(), sanityComputedField(), tags(), colorInput()],

  schema: {
    types: schemaTypes,
  },
})
