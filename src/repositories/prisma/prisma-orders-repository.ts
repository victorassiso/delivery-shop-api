import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import {
  OrderDetails,
  OrdersQueryParams,
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

  async query(data: OrdersQueryParams) {
    const orders = await prisma.order.findMany({
      where: {
        workspaceId: data.workspaceId,
        id: {
          contains: data.orderId,
        },
        customer: {
          name: {
            contains: data.customerName,
          },
        },
        status: data.status,
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
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
        createdAt: true,
        customer: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        orderItems: {
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

  async getCurrentMonthOrders(workspaceId: string) {
    const currentDate = new Date()
    const startOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    )
    const endOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    )

    const orders = await prisma.order.findMany({
      where: {
        workspaceId,
        createdAt: {
          gte: startOfCurrentMonth,
          lt: endOfCurrentMonth,
        },
      },
    })

    return orders
  }

  async getLastMonthOrders(workspaceId: string) {
    const currentDate = new Date()
    const startOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    )
    const endOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    )

    const orders = await prisma.order.findMany({
      where: {
        workspaceId,
        createdAt: {
          gte: startOfLastMonth,
          lt: endOfLastMonth,
        },
      },
    })

    return orders
  }

  async getTodayOrders(workspaceId: string) {
    const currentDate = new Date()
    const startOftoday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDay(),
    )
    const endOftoday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDay() + 1,
    )

    const orders = await prisma.order.findMany({
      where: {
        workspaceId,
        createdAt: {
          gte: startOftoday,
          lt: endOftoday,
        },
      },
    })

    return orders
  }

  async getYesterdayOrders(workspaceId: string) {
    const currentDate = new Date()
    const startOfyesterday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDay() - 1,
    )
    const endOfyesterday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDay(),
    )

    const orders = await prisma.order.findMany({
      where: {
        workspaceId,
        createdAt: {
          gte: startOfyesterday,
          lt: endOfyesterday,
        },
      },
    })

    return orders
  }

  async getCurrentMonthCanceledOrders(workspaceId: string) {
    const currentDate = new Date()
    const startOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    )
    const endOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    )

    const orders = await prisma.order.findMany({
      where: {
        workspaceId,
        status: 'canceled',
        createdAt: {
          gte: startOfCurrentMonth,
          lt: endOfCurrentMonth,
        },
      },
    })

    return orders
  }

  async getLastMonthCanceledOrders(workspaceId: string) {
    const currentDate = new Date()
    const startOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    )
    const endOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    )

    const orders = await prisma.order.findMany({
      where: {
        workspaceId,
        status: 'canceled',
        createdAt: {
          gte: startOfLastMonth,
          lt: endOfLastMonth,
        },
      },
    })

    return orders
  }
}
