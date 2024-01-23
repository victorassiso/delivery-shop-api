import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { OrderItemsRepository } from '../order-items-repository'

export class PrismaOrderItemsRepository implements OrderItemsRepository {
  async create(data: Prisma.OrderItemUncheckedCreateInput) {
    const orderItem = await prisma.orderItem.create({
      data,
    })

    return orderItem
  }

  async findByOrderId(orderId: string) {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId,
      },
    })

    return orderItems
  }
}
