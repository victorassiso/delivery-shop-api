import { randomUUID } from 'node:crypto'

import { Prisma, Product } from '@prisma/client'

import { ProductsRepository } from '../products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const {
      name,
      category,
      description,
      cost_price,
      retail_price,
      workspace_id,
    } = data
    const now = new Date()

    const product: Product = {
      id: randomUUID(),
      name,
      category,
      description: description ?? '',
      cost_price,
      retail_price,
      workspace_id,
      created_at: now,
      updated_at: now,
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
