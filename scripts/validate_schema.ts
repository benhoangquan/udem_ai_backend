import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Get schema types
import {schemaTypes} from '../schemaTypes'

interface SchemaValidationError {
  schema: string
  error: string
}

interface SanityField {
  name: string
  type: string
  to?: {type: string}[]
}

interface SanitySchema {
  name: string
  type: string
  fields?: SanityField[]
}

const validateSchema = async () => {
  console.log('Starting schema validation...')
  const errors: SchemaValidationError[] = []
  
  try {
    // Basic structure validation
    schemaTypes.forEach((schema: SanitySchema) => {
      // Required fields validation
      if (!schema.name) {
        errors.push({
          schema: JSON.stringify(schema),
          error: 'Schema missing name'
        })
      }
      if (!schema.type) {
        errors.push({
          schema: schema.name || 'unnamed',
          error: 'Schema missing type'
        })
      }
      if (!schema.fields) {
        errors.push({
          schema: schema.name || 'unnamed',
          error: 'Schema missing fields'
        })
      }

      // Field validation
      if (schema.fields) {
        schema.fields.forEach((field: SanityField, index: number) => {
          if (!field.name) {
            errors.push({
              schema: schema.name || 'unnamed',
              error: `Field at index ${index} missing name`
            })
          }
          if (!field.type) {
            errors.push({
              schema: schema.name || 'unnamed',
              error: `Field "${field.name || 'unnamed'}" missing type`
            })
          }
        })
      }

      // Reference validation
      if (schema.fields) {
        const references = schema.fields.filter((field: SanityField) => field.type === 'reference')
        references.forEach((ref: SanityField) => {
          if (!ref.to) {
            errors.push({
              schema: schema.name || 'unnamed',
              error: `Reference field "${ref.name || 'unnamed'}" missing 'to' property`
            })
          }
        })
      }
    })

    // Output results
    if (errors.length > 0) {
      console.error('\nSchema validation failed with the following errors:')
      errors.forEach(({schema, error}) => {
        console.error(`\nSchema: ${schema}`)
        console.error(`Error: ${error}`)
      })
      process.exit(1)
    }
    
    console.log('✅ Schema validation passed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Schema validation failed with unexpected error:', error)
    process.exit(1)
  }
}

validateSchema()