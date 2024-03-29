/* eslint-disable prettier/prettier */
import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/products-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface GetProductsUseCaseRequest {
  workspaceId: string
  pageIndex?: number
  perPage?: number
  id?: string
  name?: string
  description?: string
  category?: string
  minPrice?: number
  maxPrice?: number
}

export interface GetProductsUseCaseResponse {
  products: Product[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export class GetProductsUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private workspacesRepository: WorkspacesRepository,
  ) {}

  async execute({
    workspaceId,
    pageIndex,
    perPage,
    id,
    name,
    category,
    description,
    minPrice,
    maxPrice,
  }: GetProductsUseCaseRequest): Promise<GetProductsUseCaseResponse> {
    const workspace = await this.workspacesRepository.findById(workspaceId)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    const products = await this.productsRepository.query({
      workspaceId,
      id,
      name,
      category,
      description,
      minPrice,
      maxPrice,
    })

    // eslint-disable-next-line prettier/prettier
    const slicedProducts: Product[] = perPage
      ? products.slice(
        (pageIndex || 0) * perPage,
        (pageIndex || 0) * perPage + perPage,
      )
      : products

    const meta = {
      pageIndex: pageIndex ?? 0,
      perPage: perPage ?? products.length,
      totalCount: products.length,
    }

    return {
      products: slicedProducts,
      meta,
    }
  }
}
