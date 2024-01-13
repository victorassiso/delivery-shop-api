import { Business, Prisma } from '@prisma/client'

import { BusinessesRepository } from '../businesses-repository'

export class InMemoryBusinessesRepository implements BusinessesRepository {
  public items: Business[] = []

  async create(data: Prisma.BusinessCreateInput) {
    const { name, code } = data

    const business: Business = {
      id: 'business-1',
      name,
      code,
      created_at: new Date(),
    }

    this.items.push(business)

    return business
  }

  async findByCode(code: string) {
    const business = this.items.find((item) => item.code === code)

    if (!business) {
      return null
    }

    return business
  }

  async findById(id: string) {
    const business = this.items.find((item) => item.id === id)

    if (!business) {
      return null
    }

    return business
  }
}
