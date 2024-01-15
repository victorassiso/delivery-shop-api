import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/products-repository'

interface ListProductsUseCaseRequest {
  business_id: string
}

interface ListProductsUseCaseResponse {
  products: Product[]
}
export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ business_id }: ListProductsUseCaseRequest) {
    const products = this.productsRepository.list(business_id)

    return products
  }
}
