import { PrismaBusinessesRepository } from '@/repositories/prisma/prisma-businesses-repository'
import { PrismaUsersReposity } from '@/repositories/prisma/prisma-users-repository'

import { CreateBusinessUseCase } from '../create-business-use-case'

export function makeCreateBusinessUseCase() {
  const usersRepository = new PrismaUsersReposity()
  const businessRepository = new PrismaBusinessesRepository()
  const makeCreateBusinessUseCase = new CreateBusinessUseCase(
    businessRepository,
    usersRepository,
  )
  return makeCreateBusinessUseCase
}
