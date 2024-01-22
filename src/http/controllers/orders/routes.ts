import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

// import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { createOrderController } from './create-order-controller'

export async function orderRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/orders', createOrderController)
}
