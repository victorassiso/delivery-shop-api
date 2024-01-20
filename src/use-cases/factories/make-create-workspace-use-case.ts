import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { CreateWorkspaceUseCase } from '../create-workspace-use-case'

export function makeCreateWorkspaceUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const workspaceRepository = new PrismaWorkspacesRepository()
  const makeCreateWorkspaceUseCase = new CreateWorkspaceUseCase(
    workspaceRepository,
    usersRepository,
  )
  return makeCreateWorkspaceUseCase
}
