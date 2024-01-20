import { randomUUID } from 'node:crypto'

import { Prisma, Product } from '@prisma/client'

import { ProductsRepository } from '../products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const { name, category, cost_price, retail_price, workspace_id } = data

    const product: Product = {
      id: randomUUID(),
      name,
      category,
      cost_price,
      retail_price,
      workspace_id,
      created_at: new Date(),
    }

    this.items.push(product)

    return product
  }

  async list(workspace_id: string) {
    const products = this.items.filter(
      (item) => item.workspace_id === workspace_id,
    )

    return products
  }
}
