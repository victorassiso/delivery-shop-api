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

export interface OrderDetails {
  id: string
  status: OrderStatus
  total: number
  created_at: Date
  customer: {
    name: string
    email: string
    phone: string
  }
  orderItem: {
    id: string
    price: number
    quantity: number
    product: {
      name: string
    }
  }[]
}
export interface OrdersRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  findById(id: string): Promise<GetOrderResponse | null>
  findMany(params: GetOrderInput): Promise<GetOrderResponse[]>
  updateStatus({ id, status }: UpdateStatusInput): Promise<Order | null>
  getOrderDetails(id: string): Promise<OrderDetails | null>
}
