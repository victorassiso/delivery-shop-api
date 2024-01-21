import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { JoinInWorkspaceUseCase } from '../join-in-workspace-use-case'

export function makeJoinInWorkspaceUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const workspaceRepository = new PrismaWorkspacesRepository()
  const joinInWorkspaceUseCase = new JoinInWorkspaceUseCase(
    workspaceRepository,
    usersRepository,
  )
  return joinInWorkspaceUseCase
}
