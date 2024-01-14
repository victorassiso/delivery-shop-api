import { PrismaBusinessesRepository } from '@/repositories/prisma/prisma-businesses-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'

import { CreateProductUseCase } from '../create-product-use-case'

export function makeCreateProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const businessesRepository = new PrismaBusinessesRepository()
  const createProductUseCase = new CreateProductUseCase(
    productsRepository,
    businessesRepository,
  )
  return createProductUseCase
}
