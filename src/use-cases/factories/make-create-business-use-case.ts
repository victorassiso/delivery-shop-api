import { PrismaBusinessesRepository } from '@/repositories/prisma/prisma-businesses-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { CreateBusinessUseCase } from '../create-business-use-case'

export function makeCreateBusinessUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const businessRepository = new PrismaBusinessesRepository()
  const makeCreateBusinessUseCase = new CreateBusinessUseCase(
    businessRepository,
    usersRepository,
  )
  return makeCreateBusinessUseCase
}
