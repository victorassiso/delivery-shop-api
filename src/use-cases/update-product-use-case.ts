import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/products-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateProductUseCaseRequest {
  id: string
  name?: string
  description?: string
  category?: string
  price?: number
}

interface UpdateProductUseCaseResponse {
  product: Product
}

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
    name,
    category,
    description,
    price,
  }: UpdateProductUseCaseRequest): Promise<UpdateProductUseCaseResponse> {
    const product = await this.productsRepository.update({
      id,
      name,
      category,
      description,
      price,
    })

    console.log({ productUseCase: product })

    if (!product) {
      throw new ResourceNotFoundError()
    }

    return { product }
  }
}
