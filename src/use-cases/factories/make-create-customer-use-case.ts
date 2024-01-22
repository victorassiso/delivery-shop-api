import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { CreateCustomerUseCase } from '../create-customer-use-case'

export function makeCreateCustomerUseCase() {
  const customersRepository = new PrismaCustomersRepository()
  const workspacesRepository = new PrismaWorkspacesRepository()
  const createCustomerUseCase = new CreateCustomerUseCase(
    customersRepository,
    workspacesRepository,
  )
  return createCustomerUseCase
}
