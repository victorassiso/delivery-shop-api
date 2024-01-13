import { randomUUID } from 'node:crypto'

import { Prisma, Product } from '@prisma/client'

import { ProductsRepository } from '../products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const { name, category, cost_price, retail_price, business_id } = data

    const product: Product = {
      id: randomUUID(),
      name,
      category,
      cost_price,
      retail_price,
      business_id,
      created_at: new Date(),
    }

    this.items.push(product)

    return product
  }

  async list() {
    const products = this.items

    return products
  }
}
