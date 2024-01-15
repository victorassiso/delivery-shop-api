import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

// import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { createProductController } from './create-product-controller'
import { listProductsController } from './list-products-controller'

export async function productRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/products', createProductController)
  app.get('/products', listProductsController)
}
