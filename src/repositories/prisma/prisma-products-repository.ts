import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { prisma } from '@/lib/prisma'

import {
  ProductQueryParams,
  ProductsRepository,
  ProductUpdateProps,
} from '../products-repository'

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
          mode: 'insensitive',
        },
        name: {
          contains: data.name,
          mode: 'insensitive',
        },
        description: {
          contains: data.description,
          mode: 'insensitive',
        },
        category: {
          contains: data.category,
          mode: 'insensitive',
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

  async update({ id, category, description, name, price }: ProductUpdateProps) {
    try {
      const product = await prisma.product.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          category,
          price,
        },
      })
      return product
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null
      }

      throw error
    }
  }
}
