import { OrderStatus } from '@prisma/client'

import {
  GetOrderResponse,
  OrdersRepository,
} from '@/repositories/orders-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

interface OrderResponse {
  orderId: string
  createdAt: Date
  status: OrderStatus
  customerName: string
  total: number
}

export interface GetOrdersUseCaseRequest {
  workspace_id: string
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
    workspace_id,
    pageIndex,
    orderId,
    customerName,
    status,
  }: GetOrdersUseCaseRequest): Promise<GetOrdersUseCaseResponse> {
    let orders: GetOrderResponse[]

    if (orderId) {
      const order = await this.ordersRepository.findById(orderId)
      if (order) {
        orders = [order]
      } else {
        orders = []
      }
    } else {
      orders = await this.ordersRepository.findMany({
        workspace_id,
        customerName,
        status,
        skip: pageIndex ? (pageIndex - 1) * 10 : 0,
        take: 10,
      })
    }

    const formatedOrders: OrderResponse[] = orders.map((item) => {
      return {
        orderId: item.id,
        createdAt: item.created_at,
        status: item.status,
        customerName: item.customer.name,
        total: item.total,
      }
    })

    const meta = {
      pageIndex: pageIndex ?? 1,
      perPage: 10,
      totalCount: formatedOrders.length,
    }

    return {
      orders: formatedOrders,
      meta,
    }
  }
}
