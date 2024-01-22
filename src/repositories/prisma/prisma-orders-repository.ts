import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import {
  GetOrderInput,
  OrderDetails,
  OrdersRepository,
  UpdateStatusInput,
} from '../orders-repository'

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

  async findMany({ workspace_id, customerName, status }: GetOrderInput) {
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
    })

    return orders
  }

  async updateStatus({ id, status }: UpdateStatusInput) {
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })

    return order
  }

  async getOrderDetails(id: string) {
    const order: OrderDetails | null = await prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        total: true,
        created_at: true,
        customer: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        orderItem: {
          select: {
            id: true,
            price: true,
            quantity: true,
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    return order
  }
}
