import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/products-repository'

interface ListProductsUseCaseRequest {
  workspaceId: string
}

interface ListProductsUseCaseResponse {
  products: Product[]
}
export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    workspaceId,
  }: ListProductsUseCaseRequest): Promise<ListProductsUseCaseResponse> {
    const products = await this.productsRepository.list(workspaceId)

    return { products }
  }
}
