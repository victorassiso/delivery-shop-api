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
        id: {
          contains: data.id,
        },
        name: {
          contains: data.name,
        },
        email: {
          contains: data.email,
        },
        phone: {
          contains: data.phone,
        },
        address: {
          contains: data.address,
        },
      },
    })

    return customers
  }
}
