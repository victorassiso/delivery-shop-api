import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CustomersRepository } from '../customers-repository'

export class PrismaCustomersRepository implements CustomersRepository {
  async create(data: Prisma.CustomerCreateInput) {
    const customer = await prisma.customer.create({
      data,
    })

    return customer
  }

  async findById(id: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    })

    return customer
  }

  async findByPhone(phone: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        phone,
      },
    })

    return customer
  }

  async findByEmail(email: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    })

    return customer
  }
}
