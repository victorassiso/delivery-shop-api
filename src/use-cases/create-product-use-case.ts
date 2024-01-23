import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/products-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateProductUseCaseRequest {
  name: string
  category: string
  description?: string | null
  price: number
  workspaceId: string
}

interface CreateProductUseCaseReply {
  product: Product
}

export class CreateProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private workspacesRepository: WorkspacesRepository,
  ) {}

  async execute({
    name,
    category,
    description,
    price,
    workspaceId,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseReply> {
    // Validate Workspace Id
    const workspace = await this.workspacesRepository.findById(workspaceId)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    // Create Product
    const product = await this.productsRepository.create({
      name,
      category,
      description,
      price,
      workspaceId,
    })

    return { product }
  }
}
