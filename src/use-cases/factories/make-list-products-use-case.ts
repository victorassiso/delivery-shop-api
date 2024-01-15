import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'

import { ListProductsUseCase } from '../list-products-use-case'

export function makeListProductsUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const listProductsUseCase = new ListProductsUseCase(productsRepository)
  return listProductsUseCase
}
