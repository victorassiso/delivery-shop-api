import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { UpdateWorkspaceUseCase } from '../update-workspace-use-case'

export function makeUpdateWorkspaceUseCase() {
  const workspaceRepository = new PrismaWorkspacesRepository()
  const updateWorkspaceUseCase = new UpdateWorkspaceUseCase(workspaceRepository)
  return updateWorkspaceUseCase
}
