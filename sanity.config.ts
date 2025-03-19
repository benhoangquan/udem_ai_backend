import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import env from './sanity.env'

export default defineConfig({
  name: 'default',
  title: 'udemai_website_v2',

  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: env.apiVersion,

  basePath: '/studio',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  }
})
