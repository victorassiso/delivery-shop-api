import { randomUUID } from 'node:crypto'

import { Order, Prisma } from '@prisma/client'

import { OrdersRepository } from '../orders-repository'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(data: Prisma.OrderUncheckedCreateInput) {
    const { customer_id, workspace_id, total } = data
    const now = new Date()

    const order: Order = {
      id: randomUUID(),
      workspace_id,
      total,
      customer_id,
      status: 'pending',
      created_at: now,
      updated_at: now,
    }

    this.items.push(order)

    return order
  }
}
