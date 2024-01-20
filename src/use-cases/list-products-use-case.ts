import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/products-repository'

interface ListProductsUseCaseRequest {
  workspace_id: string
}

interface ListProductsUseCaseResponse {
  products: Product[]
}
export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    workspace_id,
  }: ListProductsUseCaseRequest): Promise<ListProductsUseCaseResponse> {
    const products = await this.productsRepository.list(workspace_id)

    return { products }
  }
}
