import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { PrismaOrderItemsRepository } from '@/repositories/prisma/prisma-order-items-repository'
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { CreateOrderUseCase } from '../create-order-use-case'

export function makeCreateOrderUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const workspacesRepository = new PrismaWorkspacesRepository()
  const productsRepository = new PrismaProductsRepository()
  const orderItemsRepository = new PrismaOrderItemsRepository()
  const customersRepository = new PrismaCustomersRepository()
  const createOrderUseCase = new CreateOrderUseCase(
    ordersRepository,
    workspacesRepository,
    productsRepository,
    orderItemsRepository,
    customersRepository,
  )
  return createOrderUseCase
}
