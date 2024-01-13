import { Product } from '@prisma/client'

import { BusinessesRepository } from '@/repositories/businesses-repository'
import { ProductsRepository } from '@/repositories/products-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateProductUseCaseRequest {
  name: string
  category: string
  cost_price: number
  retail_price: number
  business_id: string
}

interface CreateProductUseCaseReply {
  product: Product
}

export class CreateProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private businessesRepository: BusinessesRepository,
  ) {}

  async execute({
    name,
    category,
    cost_price,
    retail_price,
    business_id,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseReply> {
    // Validate Business Id
    const business = await this.businessesRepository.findById(business_id)

    if (!business) {
      throw new ResourceNotFoundError()
    }

    // Create Product
    const product = await this.productsRepository.create({
      name,
      category,
      cost_price,
      retail_price,
      business_id,
    })

    return { product }
  }
}
