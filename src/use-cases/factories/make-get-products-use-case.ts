import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { GetProductsUseCase } from '../get-products-use-case'

export function makeGetProductsUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const workspacesRepository = new PrismaWorkspacesRepository()
  const getProductsUseCase = new GetProductsUseCase(
    productsRepository,
    workspacesRepository,
  )
  return getProductsUseCase
}
