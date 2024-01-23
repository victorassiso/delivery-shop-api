import { randomUUID } from 'node:crypto'

import { Prisma, Product } from '@prisma/client'

import { ProductsRepository } from '../products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const { name, category, description, price, workspaceId } = data
    const now = new Date()

    const product: Product = {
      id: randomUUID(),
      name,
      category,
      description: description ?? null,
      price,
      workspaceId,
      createdAt: now,
      updatedAt: now,
    }

    this.items.push(product)

    return product
  }

  async list(workspaceId: string) {
    const products = this.items.filter(
      (item) => item.workspaceId === workspaceId,
    )

    return products
  }

  async findById(id: string) {
    const product = this.items.find((item) => item.id === id)

    if (!product) {
      return null
    }

    return product
  }
}
