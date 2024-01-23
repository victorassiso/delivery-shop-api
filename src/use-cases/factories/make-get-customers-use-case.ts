import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { GetCustomersUseCase } from '../get-customers-use-case'

export function makeGetCustomersUseCase() {
  const customersRepository = new PrismaCustomersRepository()
  const workspacesRepository = new PrismaWorkspacesRepository()
  const getCustomersUseCase = new GetCustomersUseCase(
    customersRepository,
    workspacesRepository,
  )
  return getCustomersUseCase
}
