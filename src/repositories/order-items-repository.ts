import { OrderItem, Prisma } from '@prisma/client'

export interface OrderItemsRepository {
  create(data: Prisma.OrderItemUncheckedCreateInput): Promise<OrderItem>
  findByOrderId(order_id: string): Promise<OrderItem[]>
}
