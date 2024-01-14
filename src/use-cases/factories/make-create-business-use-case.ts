import { PrismaBusinessesRepository } from '@/repositories/prisma/prisma-businesses-repository'
import { PrismaUsersReposity } from '@/repositories/prisma/prisma-users-repository'

import { CreateBusinessUseCase } from '../create-business-use-case'

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersReposity()
  const businessRepository = new PrismaBusinessesRepository()
  const createBusinessUseCase = new CreateBusinessUseCase(
    businessRepository,
    usersRepository,
  )
  return createBusinessUseCase
}
