import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { RemoveWorkspaceUseCase } from '../remove-workspace-use-case'

export function makeRemoveWorkspaceUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const removeWorkspaceUseCase = new RemoveWorkspaceUseCase(usersRepository)
  return removeWorkspaceUseCase
}
