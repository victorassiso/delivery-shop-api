import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { GetMonthCanceledOrdersAmountUseCase } from '../get-month-canceled-orders-amount-use-case'

export function makeGetMonthCanceledOrdersAmountUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const workspacesRepository = new PrismaWorkspacesRepository()
  const getMonthCanceledOrdersAmountsUseCase =
    new GetMonthCanceledOrdersAmountUseCase(
      ordersRepository,
      workspacesRepository,
    )
  return getMonthCanceledOrdersAmountsUseCase
}
