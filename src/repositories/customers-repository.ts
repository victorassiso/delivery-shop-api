import { Customer, Prisma } from '@prisma/client'

export interface CustomersRepository {
  create(data: Prisma.CustomerCreateInput): Promise<Customer>
  findById(id: string): Promise<Customer | null>
  findByPhone(phone: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
}
