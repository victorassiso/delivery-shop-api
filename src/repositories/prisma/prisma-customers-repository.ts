import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import {
  CustomersQueryParams,
  CustomersRepository,
  FindByEmailProps,
  FindByPhoneProps,
} from '../customers-repository'

export class PrismaCustomersRepository implements CustomersRepository {
  async create(data: Prisma.CustomerUncheckedCreateInput) {
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

  async findByPhone({ phone, workspaceId }: FindByPhoneProps) {
    const customer = await prisma.customer.findFirst({
      where: {
        phone,
        workspaceId,
      },
    })

    return customer
  }

  async findByEmail({ email, workspaceId }: FindByEmailProps) {
    const customer = await prisma.customer.findFirst({
      where: {
        email,
        workspaceId,
      },
    })

    return customer
  }

  async query(data: CustomersQueryParams) {
    const customers = await prisma.customer.findMany({
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
        email: {
          contains: data.email,
          mode: 'insensitive',
        },
        phone: {
          contains: data.phone,
        },
        address: {
          contains: data.address,
          mode: 'insensitive',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return customers
  }
}
