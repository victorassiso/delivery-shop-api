import fastify from 'fastify'

import { prisma } from './lib/prisma'
import { Router } from './router'

export const app = fastify()

app.register(Router)
