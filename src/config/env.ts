import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VITE_API_URL: z.string().url().default('http://localhost:3000/api'),
  VITE_APP_URL: z.string().url().default('http://localhost:5173'),
  VITE_APP_MOCK_API: z
    .string()
    .default('false')
    .transform(val => val === 'true'),
  VITE_MOCK_API: z
    .string()
    .default('false')
    .transform(val => val === 'true'),
  VITE_ENABLE_DEVTOOLS: z
    .string()
    .default('false')
    .transform(val => val === 'true'),
  VITE_ENABLE_MSW: z
    .string()
    .default('false')
    .transform(val => val === 'true'),
})

function createEnv() {
  const parsed = envSchema.safeParse({
    NODE_ENV: import.meta.env.NODE_ENV,
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_APP_URL: import.meta.env.VITE_APP_URL,
    VITE_APP_MOCK_API: import.meta.env.VITE_APP_MOCK_API,
    VITE_MOCK_API: import.meta.env.VITE_MOCK_API,
    VITE_ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS,
    VITE_ENABLE_MSW: import.meta.env.VITE_ENABLE_MSW,
  })

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables')
  }

  return parsed.data
}

export const env = createEnv()