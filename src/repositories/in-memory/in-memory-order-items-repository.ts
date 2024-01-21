import { randomUUID } from 'node:crypto'

import { OrderItem, Prisma } from '@prisma/client'

import { OrderItemsRepository } from '../order-items-repository'

export class InMemoryOrderItemsRepository implements OrderItemsRepository {
  public items: OrderItem[] = []

  async create(data: Prisma.OrderItemUncheckedCreateInput) {
    const { order_id, workspace_id, product_id, quantity, price } = data

    const order: OrderItem = {
      id: randomUUID(),
      workspace_id,
      order_id,
      product_id,
      quantity,
      price,
      created_at: new Date(),
    }

    this.items.push(order)

    return order
  }

  async findByOrderId(order_id: string) {
    const orderItems = this.items.filter((item) => item.order_id === order_id)

    return orderItems
  }
}
