import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string(),
  DEV_DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)
if (_env.success === false) {
  console.error('❌ Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data

if (env.NODE_ENV === 'development' && env.DEV_DATABASE_URL) {
  env.DATABASE_URL = env.DEV_DATABASE_URL
}

console.log({
  ...env,
  JWT_SECRET: '**********',
})
