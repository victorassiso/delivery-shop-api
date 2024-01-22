import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'

import { UpdateOrderStatusUseCase } from '../update-order-status-use-case'

export function makeUpdateOrderStatusUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(
    ordersRepository,
  )
  return updateOrderStatusUseCase
}
