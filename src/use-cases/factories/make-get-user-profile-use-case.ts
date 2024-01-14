import { PrismaUsersReposity } from '@/repositories/prisma/prisma-users-repository'

import { GetUserProfileUseCase } from '../get-user-profile-use-case'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersReposity()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  return getUserProfileUseCase
}
