import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_MODULE: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.coerce.number().default(3333),
  BASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data