import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { GetMonthOrdersAmountUseCase } from '../get-month-orders-amount-use-case'

export function makeGetMonthOrdersAmountUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const workspacesRepository = new PrismaWorkspacesRepository()
  const getMonthOrdersAmountsUseCase = new GetMonthOrdersAmountUseCase(
    ordersRepository,
    workspacesRepository,
  )
  return getMonthOrdersAmountsUseCase
}
