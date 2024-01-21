import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import {
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

  async findByPhone({ phone, workspace_id }: FindByPhoneProps) {
    const customer = await prisma.customer.findFirst({
      where: {
        phone,
        workspace_id,
      },
    })

    return customer
  }

  async findByEmail({ email, workspace_id }: FindByEmailProps) {
    const customer = await prisma.customer.findFirst({
      where: {
        email,
        workspace_id,
      },
    })

    return customer
  }
}
