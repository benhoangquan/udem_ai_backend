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

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Add your custom structure here
            ...schemaTypes.map((type) => S.listItem().title(type.title).child(S.document().schemaType(type.name))),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Prevent new documents from being created if the document is already published
    productionUrl: async (prev, context) => {
      const {slug, _type} = context.document
      if (!slug || typeof slug !== 'object' || !('current' in slug) || typeof slug.current !== 'string') return prev

      const url = new URL('/api/preview', location.origin)
      url.searchParams.set('type', _type)
      url.searchParams.set('slug', slug.current)

      return url.toString()
    },
  },
})
