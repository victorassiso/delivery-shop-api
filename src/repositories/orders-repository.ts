import { Order, OrderStatus, Prisma } from '@prisma/client'

export interface GetOrderInput {
  workspace_id: string
  customerName?: string
  status?: OrderStatus
}

export interface GetOrderResponse extends Order {
  customer: {
    name: string
  }
}

export interface UpdateStatusInput {
  id: string
  status: OrderStatus
}
export interface OrdersRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  findById(id: string): Promise<GetOrderResponse | null>
  findMany(params: GetOrderInput): Promise<GetOrderResponse[]>
  updateStatus({ id, status }: UpdateStatusInput): Promise<Order | null>
}
