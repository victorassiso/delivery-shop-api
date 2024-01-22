import { Order, OrderStatus, Prisma } from '@prisma/client'

export interface GetOrderInput {
  customerName?: string
  status?: OrderStatus
  skip: number
  take: number
}

export interface GetOrderResponse extends Order {
  customer: {
    name: string
  }
}

export interface OrdersRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  findById(id: string): Promise<GetOrderResponse | null>
  findMany(params: GetOrderInput): Promise<GetOrderResponse[]>
}
