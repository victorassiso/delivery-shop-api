import { randomUUID } from 'node:crypto'

import { OrderItem, Prisma } from '@prisma/client'

import { OrderItemsRepository } from '../order-items-repository'

export class InMemoryOrderItemsRepository implements OrderItemsRepository {
  public items: OrderItem[] = []

  async create(data: Prisma.OrderItemUncheckedCreateInput) {
    const { orderId, workspaceId, productId, quantity, price } = data

    const order: OrderItem = {
      id: randomUUID(),
      workspaceId,
      orderId,
      productId,
      quantity,
      price,
      createdAt: new Date(),
    }

    this.items.push(order)

    return order
  }

  async findByOrderId(orderId: string) {
    const orderItems = this.items.filter((item) => item.orderId === orderId)

    return orderItems
  }
}
