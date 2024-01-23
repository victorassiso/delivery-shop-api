import { Customer, Prisma } from '@prisma/client'

export interface FindByPhoneProps {
  phone: string
  workspaceId: string
}

export interface FindByEmailProps {
  email: string
  workspaceId: string
}

export interface CustomersQueryParams {
  workspaceId: string
  pageIndex?: number
  id?: string
  name?: string
  email?: string
  phone?: string
  address?: string
}
export interface CustomersRepository {
  create(data: Prisma.CustomerUncheckedCreateInput): Promise<Customer>
  findById(id: string): Promise<Customer | null>
  findByPhone(data: FindByPhoneProps): Promise<Customer | null>
  findByEmail(data: FindByEmailProps): Promise<Customer | null>
  query(data: CustomersQueryParams): Promise<Customer[]>
}
