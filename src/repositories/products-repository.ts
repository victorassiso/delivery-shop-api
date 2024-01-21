import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  list(workspace_id: string): Promise<Product[]>
  findById(id: string): Promise<Product | null>
}
