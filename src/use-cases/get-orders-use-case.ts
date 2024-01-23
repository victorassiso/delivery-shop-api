import { OrderStatus } from '@prisma/client'

import { OrdersRepository } from '@/repositories/orders-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface OrderResponse {
  orderId: string
  createdAt: Date
  status: OrderStatus
  customerName: string
  total: number
}

export interface GetOrdersUseCaseRequest {
  workspaceId: string
  pageIndex?: number
  orderId?: string
  customerName?: string
  status?: OrderStatus
}

export interface GetOrdersUseCaseResponse {
  orders: OrderResponse[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export class GetOrdersUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private workspacesRepository: WorkspacesRepository,
  ) {}

  async execute({
    workspaceId,
    pageIndex,
    orderId,
    customerName,
    status,
  }: GetOrdersUseCaseRequest): Promise<GetOrdersUseCaseResponse> {
    const workspace = await this.workspacesRepository.findById(workspaceId)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    const orders = await this.ordersRepository.query({
      workspaceId,
      orderId,
      customerName,
      status,
    })

    const formatedOrders: OrderResponse[] = orders.map((item) => {
      return {
        orderId: item.id,
        createdAt: item.createdAt,
        status: item.status,
        customerName: item.customer.name,
        total: item.total,
      }
    })

    const slicedOrders: OrderResponse[] = formatedOrders.slice(
      (pageIndex || 0) * 10,
      (pageIndex || 0) * 10 + 10,
    )

    const meta = {
      pageIndex: pageIndex ?? 0,
      perPage: 10,
      totalCount: formatedOrders.length,
    }

    return {
      orders: slicedOrders,
      meta,
    }
  }
}
