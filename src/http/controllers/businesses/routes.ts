import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createBusinessController } from './create-business-controller'

export async function businessRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/businesses', createBusinessController)
}
