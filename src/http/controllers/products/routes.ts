import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

import { createProductController } from './create-product-controller'

export async function productsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post(
    '/products',
    { onRequest: [verifyUserRole('admin')] },
    createProductController,
  )
}
