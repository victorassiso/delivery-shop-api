import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { CreateProductUseCase } from '../create-product-use-case'

export function makeCreateProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const workspacesRepository = new PrismaWorkspacesRepository()
  const createProductUseCase = new CreateProductUseCase(
    productsRepository,
    workspacesRepository,
  )
  return createProductUseCase
}
