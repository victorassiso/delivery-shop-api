import { Prisma, Product } from '@prisma/client'

export interface ProductQueryParams {
  workspaceId: string
  id?: string
  name?: string
  description?: string
  category?: string
  minPrice?: number
  maxPrice?: number
}

export interface ProductsRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  list(workspace_id: string): Promise<Product[]>
  findById(id: string): Promise<Product | null>
  query(data: ProductQueryParams): Promise<Product[]>
}
