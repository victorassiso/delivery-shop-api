import { Customer, Prisma } from '@prisma/client'

export interface FindByPhoneProps {
  phone: string
  workspace_id: string
}

export interface FindByEmailProps {
  email: string
  workspace_id: string
}
export interface CustomersRepository {
  create(data: Prisma.CustomerUncheckedCreateInput): Promise<Customer>
  findById(id: string): Promise<Customer | null>
  findByPhone({
    phone,
    workspace_id,
  }: FindByPhoneProps): Promise<Customer | null>
  findByEmail({
    email,
    workspace_id,
  }: FindByEmailProps): Promise<Customer | null>
}
