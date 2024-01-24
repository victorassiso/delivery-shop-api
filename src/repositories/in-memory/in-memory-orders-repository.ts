import { randomUUID } from 'node:crypto'

import { $Enums, Customer, Order, Prisma } from '@prisma/client'

import {
  OrderDetails,
  OrdersQueryParams,
  OrdersQueryResponse,
  OrdersRepository,
  UpdateStatusInput,
} from '../orders-repository'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []
  public customers: Customer[] = [
    {
      id: '1',
      workspaceId: 'w1',
      name: 'Name 1',
      phone: 'Phone 1',
      email: 'Email 1',
      address: 'Address 1',
      createdAt: new Date(
        'Sun Jan 21 2024 21:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
      updatedAt: new Date(
        'Sun Jan 21 2024 21:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
    },
    {
      id: '2',
      workspaceId: 'w2',
      name: 'Name 2',
      phone: 'Phone 2',
      email: 'Email 2',
      address: 'Address 2',
      createdAt: new Date(
        'Sun Jan 21 2024 18:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
      updatedAt: new Date(
        'Sun Jan 21 2024 18:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
    },
    {
      id: '3',
      workspaceId: 'w3',
      name: 'Name 3',
      phone: 'Phone 3',
      email: 'Email 3',
      address: 'Address 3',
      createdAt: new Date(
        'Sun Jan 21 2024 15:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
      updatedAt: new Date(
        'Sun Jan 21 2024 15:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
    },
  ]

  async create(data: Prisma.OrderUncheckedCreateInput) {
    const { customerId, workspaceId, total } = data
    const now = new Date()

    const order: Order = {
      id: randomUUID(),
      workspaceId,
      total,
      customerId,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    }

    this.items.push(order)

    return order
  }

  async findById(id: string) {
    const order = this.items.find((item) => item.id === id)

    if (!order) {
      return null
    }

    const customer = this.customers.find((item) => item.id === order.customerId)

    return {
      ...order,
      customer: {
        name: customer ? customer.name : '',
      },
    }
  }

  async query(params: OrdersQueryParams) {
    const { workspaceId, customerName, status } = params

    // Include customer name
    let orders: OrdersQueryResponse[] = this.items.map((order) => {
      const customer = this.customers.find(
        (customer) => customer.id === order.customerId,
      )

      return {
        ...order,
        customer: {
          name: customer ? customer.name : '',
        },
      }
    })
    // Filter by workspaceId
    orders = orders.filter((item) => item.workspaceId === workspaceId)

    // Filter by customer name
    if (customerName) {
      orders = orders.filter((item) => item.customer.name === customerName)
    }

    // filter by status
    if (status) {
      orders = orders.filter((item) => item.status === status)
    }

    // Sort by Date
    orders.sort((a: OrdersQueryResponse, b: OrdersQueryResponse) => {
      if (a.createdAt > b.createdAt) {
        return -1
      }
      if (a.createdAt < b.createdAt) {
        return 1
      }
      return 0
    })

    return orders
  }

  async updateStatus({ id, status }: UpdateStatusInput) {
    let order = null

    this.items = this.items.map((item) => {
      if (item.id === id) {
        order = { ...item, status }
        return order
      } else {
        return item
      }
    })

    return order
  }

  async getOrderDetails(id: string) {
    const order = this.items.find((item) => item.id === id)

    if (!order) {
      return null
    }

    const orderDetails: OrderDetails = {
      id: order.id,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      customer: {
        name: 'Customer Name',
        email: 'Customer Email',
        phone: 'Customer Phone',
      },
      orderItems: [
        {
          id: '1',
          price: 9.99,
          quantity: 2,
          product: {
            name: 'Product Name',
          },
        },
      ],
    }

    return orderDetails
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCurrentMonthOrders(_workspaceId: string): Promise<
    {
      id: string
      total: number
      status: $Enums.OrderStatus
      workspaceId: string
      customerId: string
      createdAt: Date
      updatedAt: Date
    }[]
  > {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTodayOrders(_workspaceId: string): Promise<
    {
      id: string
      total: number
      status: $Enums.OrderStatus
      workspaceId: string
      customerId: string
      createdAt: Date
      updatedAt: Date
    }[]
  > {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLastMonthOrders(_workspaceId: string): Promise<
    {
      id: string
      total: number
      status: $Enums.OrderStatus
      workspaceId: string
      customerId: string
      createdAt: Date
      updatedAt: Date
    }[]
  > {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getYesterdayOrders(_workspaceId: string): Promise<
    {
      id: string
      total: number
      status: $Enums.OrderStatus
      workspaceId: string
      customerId: string
      createdAt: Date
      updatedAt: Date
    }[]
  > {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCurrentMonthCanceledOrders(_workspaceId: string): Promise<
    {
      id: string
      total: number
      status: $Enums.OrderStatus
      workspaceId: string
      customerId: string
      createdAt: Date
      updatedAt: Date
    }[]
  > {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLastMonthCanceledOrders(_workspaceId: string): Promise<
    {
      id: string
      total: number
      status: $Enums.OrderStatus
      workspaceId: string
      customerId: string
      createdAt: Date
      updatedAt: Date
    }[]
  > {
    throw new Error('Method not implemented.')
  }
}
