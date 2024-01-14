import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createBusinessController } from './create-business-controller'

export async function businessRoutes(app: FastifyInstance) {
  app.post('/businesses', createBusinessController)
  app.addHook('onRequest', verifyJWT)
}
