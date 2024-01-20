import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { UpdateWorkspaceUseCase } from '../update-workspace-use-case'

export function makeCreateWorkspaceUseCase() {
  const workspaceRepository = new PrismaWorkspacesRepository()
  const makeUpdateWorkspaceUseCase = new UpdateWorkspaceUseCase(
    workspaceRepository,
  )
  return makeUpdateWorkspaceUseCase
}
