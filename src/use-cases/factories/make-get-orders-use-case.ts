import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { GetOrdersUseCase } from '../get-orders-use-case'

export function makeGetOrdersUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const workspacesRepository = new PrismaWorkspacesRepository()
  const getOrdersUseCase = new GetOrdersUseCase(
    ordersRepository,
    workspacesRepository,
  )
  return getOrdersUseCase
}
