import { Order } from '@prisma/client'

import { CustomersRepository } from '@/repositories/customers-repository'
import { OrderItemsRepository } from '@/repositories/order-items-repository'
import { OrdersRepository } from '@/repositories/orders-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface OrderItemCreateInput {
  product_id: string
  quantity: number
}

interface CreateOrderUseCaseRequest {
  customer_id: string
  workspace_id: string
  items: OrderItemCreateInput[]
}

interface CreateOrderUseCaseReply {
  order: Order
}

export class CreateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private workspacesRepository: WorkspacesRepository,
    private productsRepository: ProductsRepository,
    private orderItemsRepository: OrderItemsRepository,
    private customersRepository: CustomersRepository,
  ) {}

  async execute({
    customer_id,
    workspace_id,
    items,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseReply> {
    // Validate customer
    const customer = await this.customersRepository.findById(customer_id)

    if (!customer) {
      throw new ResourceNotFoundError()
    }

    // Validate workspace
    const workspace = await this.workspacesRepository.findById(workspace_id)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    // Validate Products
    const itemsWithPrice = await Promise.all(
      items.map(async (item) => {
        const product = await this.productsRepository.findById(item.product_id)

        if (!product) {
          throw new ResourceNotFoundError()
        }

        return {
          ...item,
          price: product.retail_price,
        }
      }),
    )

    // Calculate Total
    const total = itemsWithPrice.reduce((acc, cur) => {
      return (acc += cur.price * cur.quantity)
    }, 0)

    // Create Order
    const order = await this.ordersRepository.create({
      customer_id,
      workspace_id,
      total,
    })

    // Create Order Items
    await Promise.all(
      itemsWithPrice.map(async (item) => {
        const orderItem = await this.orderItemsRepository.create({
          order_id: order.id,
          price: (await item).price,
          product_id: (await item).product_id,
          quantity: (await item).quantity,
          workspace_id,
        })

        return orderItem
      }),
    )

    return { order }
  }
}
