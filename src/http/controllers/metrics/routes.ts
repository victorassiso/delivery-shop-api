import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { getDayOrdersAmountController } from './get-day-orders-amount-controller'
import { getMonthCanceledOrdersAmountController } from './get-month-canceled-orders-amount-controller'
import { getMonthOrdersAmountController } from './get-month-orders-amount-controller'
import { getMonthRevenueController } from './get-month-revenue-controller'

export async function metricRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/metrics/month-revenue', getMonthRevenueController)
  app.get('/metrics/month-orders-amount', getMonthOrdersAmountController)
  app.get('/metrics/day-orders-amount', getDayOrdersAmountController)
  app.get(
    '/metrics/month-canceled-orders-amount',
    getMonthCanceledOrdersAmountController,
  )
}
