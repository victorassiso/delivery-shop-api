import { OrdersRepository } from '@/repositories/orders-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface GetDayOrdersAmountUseCaseRequest {
  workspaceId: string
}

export interface GetDayOrdersAmountResponse {
  amount: number
  percentualDiffFromYesterday: number
}

export class GetDayOrdersAmountUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private workspacesRepository: WorkspacesRepository,
  ) {}

  async execute({
    workspaceId,
  }: GetDayOrdersAmountUseCaseRequest): Promise<GetDayOrdersAmountResponse> {
    const workspace = await this.workspacesRepository.findById(workspaceId)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    const todayOrders = await this.ordersRepository.getTodayOrders(workspaceId)
    const yesterdayOrders =
      await this.ordersRepository.getYesterdayOrders(workspaceId)

    const todayOrdersAmount = todayOrders.length
    const yesterdayOrdersAmount = yesterdayOrders.length
    const amountPercentualDiffFromYesterday =
      yesterdayOrdersAmount === 0
        ? 0
        : todayOrdersAmount / yesterdayOrdersAmount - 1

    return {
      amount: todayOrdersAmount,
      percentualDiffFromYesterday: amountPercentualDiffFromYesterday,
    }
  }
}
