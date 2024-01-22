import { Order, OrderStatus } from '@prisma/client'

import { OrdersRepository } from '@/repositories/orders-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateOrderStatusUseCaseRequest {
  id: string
  status: OrderStatus
}

interface UpdateOrderStatusUseCaseResponse {
  order: Order
}

export class UpdateOrderStatusUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
    status,
  }: UpdateOrderStatusUseCaseRequest): Promise<UpdateOrderStatusUseCaseResponse> {
    const order = await this.ordersRepository.updateStatus({ id, status })

    if (!order) {
      throw new ResourceNotFoundError()
    }

    return { order }
  }
}
