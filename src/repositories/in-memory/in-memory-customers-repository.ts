import { Customer, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { CustomersRepository } from '../customers-repository'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async create(data: Prisma.CustomerCreateInput) {
    const { name, phone, email, address } = data

    const now = new Date()
    const customer: Customer = {
      id: randomUUID(),
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

  async findByPhone(phone: string) {
    const customer = this.items.find((item) => item.phone === phone)

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmail(email: string) {
    const customer = this.items.find((item) => item.email === email)

    if (!customer) {
      return null
    }

    return customer
  }
}
