import { Business, Prisma } from '@prisma/client'

export interface BusinessesRepository {
  create(data: Prisma.BusinessCreateInput): Promise<Business>
  findByCode(code: string): Promise<Business | null>
}
