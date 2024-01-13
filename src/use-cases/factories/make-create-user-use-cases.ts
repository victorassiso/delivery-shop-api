import { PrismaUsersReposity } from '@/repositories/prisma/prisma-users-repository'

import { CreateUserUseCase } from '../create-user-use-case'

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersReposity()
  const createUserUseCase = new CreateUserUseCase(usersRepository)
  return createUserUseCase
}
