import { Order } from '@prisma/client'

import { CustomersRepository } from '@/repositories/customers-repository'
import { OrderItemsRepository } from '@/repositories/order-items-repository'
import { OrdersRepository } from '@/repositories/orders-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface OrderItemCreateInput {
  productId: string
  quantity: number
}

interface CreateOrderUseCaseRequest {
  customerId: string
  workspaceId: string
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
    customerId,
    workspaceId,
    items,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseReply> {
    // Validate customer
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new ResourceNotFoundError()
    }

    // Validate workspace
    const workspace = await this.workspacesRepository.findById(workspaceId)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    // Validate Products
    const itemsWithPrice = await Promise.all(
      items.map(async (item) => {
        const product = await this.productsRepository.findById(item.productId)

        if (!product) {
          throw new ResourceNotFoundError()
        }

        return {
          ...item,
          price: product.price,
        }
      }),
    )

    // Calculate Total
    const total = itemsWithPrice.reduce((acc, cur) => {
      return (acc += cur.price * cur.quantity)
    }, 0)

    // Create Order
    const order = await this.ordersRepository.create({
      customerId,
      workspaceId,
      total,
    })

    // Create Order Items
    await Promise.all(
      itemsWithPrice.map(async (item) => {
        const orderItem = await this.orderItemsRepository.create({
          orderId: order.id,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
          workspaceId,
        })

        return orderItem
      }),
    )

    return { order }
  }
}
