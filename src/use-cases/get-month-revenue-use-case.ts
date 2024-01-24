import { OrdersRepository } from '@/repositories/orders-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface GetMonthRevenueUseCaseRequest {
  workspaceId: string
}

export interface GetMonthRevenueResponse {
  amount: number
  percentualDiffFromLastMonth: number
}

export class GetMonthRevenueUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private workspacesRepository: WorkspacesRepository,
  ) {}

  async execute({
    workspaceId,
  }: GetMonthRevenueUseCaseRequest): Promise<GetMonthRevenueResponse> {
    const workspace = await this.workspacesRepository.findById(workspaceId)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    const currentMonthOrders =
      await this.ordersRepository.getCurrentMonthOrders(workspaceId)
    const lastMonthOrders =
      await this.ordersRepository.getLastMonthOrders(workspaceId)

    const currentMonthRevenue = currentMonthOrders.reduce(
      (acc, cur) => acc + cur.total,
      0,
    )

    const lastMonthRevenue = lastMonthOrders.reduce(
      (acc, cur) => acc + cur.total,
      0,
    )

    const revenuePercentualDiffFromLastMonth =
      lastMonthRevenue === 0 ? 0 : currentMonthRevenue / lastMonthRevenue - 1

    return {
      amount: currentMonthRevenue,
      percentualDiffFromLastMonth: revenuePercentualDiffFromLastMonth,
    }
  }
}
