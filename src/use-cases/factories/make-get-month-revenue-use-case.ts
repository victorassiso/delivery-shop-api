import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { GetMonthRevenueUseCase } from '../get-month-revenue-use-case'

export function makeGetMonthRevenueUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const workspacesRepository = new PrismaWorkspacesRepository()
  const getMonthRevenuesUseCase = new GetMonthRevenueUseCase(
    ordersRepository,
    workspacesRepository,
  )
  return getMonthRevenuesUseCase
}
