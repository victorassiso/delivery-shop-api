import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { BusinessesRepository } from '../businesses-repository'

export class PrismaBusinessesRepository implements BusinessesRepository {
  async create(data: Prisma.BusinessCreateInput) {
    const business = await prisma.business.create({
      data,
    })

    return business
  }

  async findByCode(code: string) {
    const business = await prisma.business.findUnique({
      where: {
        code,
      },
    })

    return business
  }
}
