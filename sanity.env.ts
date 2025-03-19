/**
 * Environment configuration for Sanity
 */

interface SanityEnvironment {
  dataset: string
  projectId: string
  apiVersion: string
}

interface Environments {
  development: SanityEnvironment
  staging: SanityEnvironment
  production: SanityEnvironment
}

const environments: Environments = {
  development: {
    dataset: 'development',
    projectId: process.env.SANITY_PROJECT_ID || 'v0v3j485',
    apiVersion: '2023-05-03',
  },
  staging: {
    dataset: 'staging',
    projectId: process.env.SANITY_PROJECT_ID || 'v0v3j485',
    apiVersion: '2023-05-03',
  },
  production: {
    dataset: 'production',
    projectId: process.env.SANITY_PROJECT_ID || 'v0v3j485',
    apiVersion: '2023-05-03',
  },
}

// Validate environment
const env = process.env.SANITY_STUDIO_API_ENVIRONMENT || 'development'
if (!Object.keys(environments).includes(env)) {
  throw new Error(`Invalid environment: ${env}. Must be one of: ${Object.keys(environments).join(', ')}`)
}

// Validate required environment variables
if (!process.env.SANITY_PROJECT_ID) {
  console.warn('Warning: SANITY_PROJECT_ID environment variable is not set. Using default value.')
}

export default environments[env as keyof Environments]