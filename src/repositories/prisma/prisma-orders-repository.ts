import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { GetOrderInput, OrdersRepository } from '../orders-repository'

export class PrismaOrdersRepository implements OrdersRepository {
  async create(data: Prisma.OrderUncheckedCreateInput) {
    const order = await prisma.order.create({
      data,
    })

    return order
  }

  async findById(id: string) {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
    })

    return order
  }

  async findMany({
    workspace_id,
    customerName,
    status,
    skip,
    take,
  }: GetOrderInput) {
    const orders = await prisma.order.findMany({
      where: {
        workspace_id,
        customer: {
          name: customerName,
        },
        status,
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      skip,
      take,
    })

    return orders
  }
}
