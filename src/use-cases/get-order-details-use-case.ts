import {
  OrderDetails,
  OrdersRepository,
} from '@/repositories/orders-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface GetOrdersUseCaseRequest {
  id: string
}

export interface GetOrderDetailsResponse {
  orderDetails: OrderDetails
}

export class GetOrderDetailsUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
  }: GetOrdersUseCaseRequest): Promise<GetOrderDetailsResponse> {
    const orderDetails = await this.ordersRepository.getOrderDetails(id)

    if (!orderDetails) {
      throw new ResourceNotFoundError()
    }

    return { orderDetails }
  }
}
