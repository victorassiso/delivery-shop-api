import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { ProductsRepository } from '../products-repository'

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
}
