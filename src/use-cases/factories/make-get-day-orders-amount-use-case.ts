import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { GetDayOrdersAmountUseCase } from '../get-day-orders-amount-use-case'

export function makeGetDayOrdersAmountUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const workspacesRepository = new PrismaWorkspacesRepository()
  const getDayOrdersAmountsUseCase = new GetDayOrdersAmountUseCase(
    ordersRepository,
    workspacesRepository,
  )
  return getDayOrdersAmountsUseCase
}
