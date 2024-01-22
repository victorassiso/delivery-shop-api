import { randomUUID } from 'node:crypto'

import { Customer, Order, Prisma } from '@prisma/client'

import {
  GetOrderInput,
  GetOrderResponse,
  OrdersRepository,
} from '../orders-repository'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []
  public customers: Customer[] = [
    {
      id: '1',
      workspace_id: 'w1',
      name: 'Name 1',
      phone: 'Phone 1',
      email: 'Email 1',
      address: 'Address 1',
      created_at: new Date(
        'Sun Jan 21 2024 21:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
      updated_at: new Date(
        'Sun Jan 21 2024 21:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
    },
    {
      id: '2',
      workspace_id: 'w2',
      name: 'Name 2',
      phone: 'Phone 2',
      email: 'Email 2',
      address: 'Address 2',
      created_at: new Date(
        'Sun Jan 21 2024 18:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
      updated_at: new Date(
        'Sun Jan 21 2024 18:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
    },
    {
      id: '3',
      workspace_id: 'w3',
      name: 'Name 3',
      phone: 'Phone 3',
      email: 'Email 3',
      address: 'Address 3',
      created_at: new Date(
        'Sun Jan 21 2024 15:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
      updated_at: new Date(
        'Sun Jan 21 2024 15:17:51 GMT-0300 (Hora padrão de Brasília)',
      ),
    },
  ]

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

  async findById(id: string) {
    const order = this.items.find((item) => item.id === id)

    if (!order) {
      return null
    }

    const customer = this.customers.find(
      (item) => item.id === order.customer_id,
    )

    return {
      ...order,
      customer: {
        name: customer ? customer.name : '',
      },
    }
  }

  async findMany(params: GetOrderInput) {
    const { customerName, status, skip, take } = params

    // Include customer name

    let orders: GetOrderResponse[] = this.items.map((order) => {
      const customer = this.customers.find(
        (customer) => customer.id === order.customer_id,
      )

      return {
        ...order,
        customer: {
          name: customer ? customer.name : '',
        },
      }
    })

    // Filter by customer name
    if (customerName) {
      orders = orders.filter((item) => item.customer.name === customerName)
    }

    // filter by status
    if (status) {
      orders = orders.filter((item) => item.status === status)
    }

    // Sort by Date
    orders.sort((a: GetOrderResponse, b: GetOrderResponse) => {
      if (a.created_at > b.created_at) {
        return -1
      }
      if (a.created_at < b.created_at) {
        return 1
      }
      return 0
    })

    orders.slice(skip, take)

    return orders
  }
}
