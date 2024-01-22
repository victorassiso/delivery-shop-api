import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

// import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { createCustomerController } from './create-customer-controller'

export async function customerRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/customers', createCustomerController)
}
