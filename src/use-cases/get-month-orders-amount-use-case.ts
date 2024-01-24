import { OrdersRepository } from '@/repositories/orders-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface GetMonthOrdersAmountUseCaseRequest {
  workspaceId: string
}

export interface GetMonthOrdersAmountResponse {
  amount: number
  percentualDiffFromLastMonth: number
}

export class GetMonthOrdersAmountUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private workspacesRepository: WorkspacesRepository,
  ) {}

  async execute({
    workspaceId,
  }: GetMonthOrdersAmountUseCaseRequest): Promise<GetMonthOrdersAmountResponse> {
    const workspace = await this.workspacesRepository.findById(workspaceId)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    const currentMonthOrders =
      await this.ordersRepository.getCurrentMonthOrders(workspaceId)
    const lastMonthOrders =
      await this.ordersRepository.getLastMonthOrders(workspaceId)

    const currentMonthOrdersAmount = currentMonthOrders.length
    const lastMonthOrdersAmount = lastMonthOrders.length
    const amountPercentualDiffFromLastMonth =
      lastMonthOrdersAmount === 0
        ? 0
        : currentMonthOrdersAmount / lastMonthOrdersAmount - 1

    return {
      amount: currentMonthOrdersAmount,
      percentualDiffFromLastMonth: amountPercentualDiffFromLastMonth,
    }
  }
}
