import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { processOrderController } from './approve-order-controller'
import { cancelOrderController } from './cancel-order-controller'
// import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { createOrderController } from './create-order-controller'
import { deliverOrderController } from './deliver-order-controller'
import { dispatchOrderController } from './dispatch-order-controller'
import { getOrderDetailsController } from './get-order-details-controller'
import { getOrdersController } from './get-orders-controller'

export async function orderRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/orders', createOrderController)
  app.get('/orders', getOrdersController)
  app.get('/orders/:id', getOrderDetailsController)
  app.patch('/orders/:id/approve', processOrderController)
  app.patch('/orders/:id/cancel', cancelOrderController)
  app.patch('/orders/:id/deliver', deliverOrderController)
  app.patch('/orders/:id/dispatch', dispatchOrderController)
}
