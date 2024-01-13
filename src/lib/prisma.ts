import { PrismaClient } from '@prisma/client'
import { env } from 'src/env'

export const prisma = new PrismaClient({
  log: env.NODE_MODULE === 'development' ? ['query'] : [],
})
