import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { ProductQueryParams, ProductsRepository } from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({
      data,
    })

    return product
  }

  async list(workspaceId: string) {
    const products = await prisma.product.findMany({
      where: {
        workspaceId,
      },
      orderBy: { createdAt: 'desc' },
    })

    return products
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })

    return product
  }

  async query(data: ProductQueryParams) {
    const products = await prisma.product.findMany({
      where: {
        workspaceId: data.workspaceId,
        id: {
          contains: data.id,
        },
        name: {
          contains: data.name,
        },
        description: {
          contains: data.description,
        },
        category: {
          contains: data.category,
        },
        price: {
          gte: data.minPrice,
          lte: data.maxPrice,
        },
      },
      orderBy: [{ name: 'asc' }],
    })
    return products
  }
}
