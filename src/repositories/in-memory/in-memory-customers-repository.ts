import { Customer, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import {
  CustomersQueryParams,
  CustomersRepository,
  FindByEmailProps,
  FindByPhoneProps,
} from '../customers-repository'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async create(data: Prisma.CustomerUncheckedCreateInput) {
    const { workspaceId, name, phone, email, address } = data

    const now = new Date()
    const customer: Customer = {
      id: randomUUID(),
      workspaceId,
      name,
      phone,
      email,
      address,
      createdAt: now,
      updatedAt: now,
    }

    this.items.push(customer)

    return customer
  }

  async findById(id: string) {
    const customer = this.items.find((item) => item.id === id)

    if (!customer) {
      return null
    }

    return customer
  }

  async findByPhone({ phone, workspaceId }: FindByPhoneProps) {
    const customer = this.items.find(
      (item) => item.phone === phone && item.workspaceId === workspaceId,
    )

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmail({ email, workspaceId }: FindByEmailProps) {
    const customer = this.items.find(
      (item) => item.email === email && item.workspaceId === workspaceId,
    )

    if (!customer) {
      return null
    }

    return customer
  }

  // TODO:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async query(data: CustomersQueryParams) {
    throw new Error('Not implemented yet')
    return this.items
  }
}
