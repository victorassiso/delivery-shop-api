import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { processOrderController } from './approve-order-controller'
import { cancelOrderController } from './cancel-order-controller'
// import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { createOrderController } from './create-order-controller'
import { deliverOrderController } from './deliver-order-controller'
import { dispatchOrderController } from './dispatch-order-controller'
import { getOrdersController } from './get-orders-controller'

export async function orderRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/orders', createOrderController)
  app.get('/orders', getOrdersController)
  app.patch('/orders/:orderId/approve', processOrderController)
  app.patch('/orders/:orderId/cancel', cancelOrderController)
  app.patch('/orders/:orderId/deliver', deliverOrderController)
  app.patch('/orders/:orderId/dispatch', dispatchOrderController)
}
