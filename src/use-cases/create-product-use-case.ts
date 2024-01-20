import { Product } from '@prisma/client'

import { ProductsRepository } from '@/repositories/products-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateProductUseCaseRequest {
  name: string
  category: string
  description?: string | null
  cost_price: number
  retail_price: number
  workspace_id: string
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
    cost_price,
    retail_price,
    workspace_id,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseReply> {
    // Validate Workspace Id
    const workspace = await this.workspacesRepository.findById(workspace_id)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    // Create Product
    const product = await this.productsRepository.create({
      name,
      category,
      description,
      cost_price,
      retail_price,
      workspace_id,
    })

    return { product }
  }
}
