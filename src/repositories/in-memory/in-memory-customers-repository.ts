import { Customer, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import {
  CustomersRepository,
  FindByEmailProps,
  FindByPhoneProps,
} from '../customers-repository'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async create(data: Prisma.CustomerUncheckedCreateInput) {
    const { workspace_id, name, phone, email, address } = data

    const now = new Date()
    const customer: Customer = {
      id: randomUUID(),
      workspace_id,
      name,
      phone,
      email,
      address,
      created_at: now,
      updated_at: now,
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

  async findByPhone({ phone, workspace_id }: FindByPhoneProps) {
    const customer = this.items.find(
      (item) => item.phone === phone && item.workspace_id === workspace_id,
    )

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmail({ email, workspace_id }: FindByEmailProps) {
    const customer = this.items.find(
      (item) => item.email === email && item.workspace_id === workspace_id,
    )

    if (!customer) {
      return null
    }

    return customer
  }
}
