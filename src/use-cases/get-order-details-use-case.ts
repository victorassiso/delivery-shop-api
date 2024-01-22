import {
  OrderDetails,
  OrdersRepository,
} from '@/repositories/orders-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface GetOrdersUseCaseRequest {
  orderId: string
}

export interface GetOrderDetailsResponse {
  orderDetails: OrderDetails
}

export class GetOrderDetailsUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: GetOrdersUseCaseRequest): Promise<GetOrderDetailsResponse> {
    const orderDetails = await this.ordersRepository.getOrderDetails(orderId)

    if (!orderDetails) {
      throw new ResourceNotFoundError()
    }

    return { orderDetails }
  }
}
