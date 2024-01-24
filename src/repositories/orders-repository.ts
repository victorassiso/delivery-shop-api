import { Order, OrderStatus, Prisma } from '@prisma/client'

export interface OrdersQueryParams {
  workspaceId: string
  orderId?: string
  customerName?: string
  status?: OrderStatus
}

export interface OrdersQueryResponse extends Order {
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
  createdAt: Date
  customer: {
    name: string
    email: string
    phone: string
  }
  orderItems: {
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
  findById(id: string): Promise<Order | null>
  query(data: OrdersQueryParams): Promise<OrdersQueryResponse[]>
  updateStatus({ id, status }: UpdateStatusInput): Promise<Order | null>
  getOrderDetails(id: string): Promise<OrderDetails | null>
  getCurrentMonthOrders(workspaceId: string): Promise<Order[]>
  getTodayOrders(workspaceId: string): Promise<Order[]>
  getLastMonthOrders(workspaceId: string): Promise<Order[]>
  getYesterdayOrders(workspaceId: string): Promise<Order[]>
  getCurrentMonthCanceledOrders(workspaceId: string): Promise<Order[]>
  getLastMonthCanceledOrders(workspaceId: string): Promise<Order[]>
}
