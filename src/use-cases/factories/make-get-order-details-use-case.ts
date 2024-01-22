import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'

import { GetOrderDetailsUseCase } from '../get-order-details-use-case'

export function makeGetOrderDetailsUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const getOrderDetailssUseCase = new GetOrderDetailsUseCase(ordersRepository)
  return getOrderDetailssUseCase
}
