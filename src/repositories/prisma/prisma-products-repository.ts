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

  async list(business_id: string) {
    const products = await prisma.product.findMany({
      where: {
        business_id,
      },
    })

    return products
  }
}
