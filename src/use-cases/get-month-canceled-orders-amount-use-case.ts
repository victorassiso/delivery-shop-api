import { OrdersRepository } from '@/repositories/orders-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface GetMonthCanceledOrdersAmountUseCaseRequest {
  workspaceId: string
}

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number
  percentualDiffFromLastMonth: number
}

export class GetMonthCanceledOrdersAmountUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private workspacesRepository: WorkspacesRepository,
  ) {}

  async execute({
    workspaceId,
  }: GetMonthCanceledOrdersAmountUseCaseRequest): Promise<GetMonthCanceledOrdersAmountResponse> {
    const workspace = await this.workspacesRepository.findById(workspaceId)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    const currentMonthCanceledOrders =
      await this.ordersRepository.getCurrentMonthCanceledOrders(workspaceId)
    const lastMonthCanceledOrders =
      await this.ordersRepository.getLastMonthCanceledOrders(workspaceId)

    const currentMonthCanceledOrdersAmount = currentMonthCanceledOrders.length
    const lastMonthCanceledOrdersAmount = lastMonthCanceledOrders.length
    const canceledAmountPercentualDiffFromLastMonth =
      lastMonthCanceledOrdersAmount
        ? 0
        : currentMonthCanceledOrdersAmount / lastMonthCanceledOrdersAmount - 1

    return {
      amount: currentMonthCanceledOrdersAmount,
      percentualDiffFromLastMonth: canceledAmountPercentualDiffFromLastMonth,
    }
  }
}
