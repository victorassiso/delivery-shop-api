import { PrismaWorkspacesRepository } from '@/repositories/prisma/prisma-workspaces-repository'

import { GetWorkspaceUseCase } from '../get-workspace-use-case'

export function makeGetWorkspaceUseCase() {
  const workspacesRepository = new PrismaWorkspacesRepository()
  const getWorkspaceUseCase = new GetWorkspaceUseCase(workspacesRepository)
  return getWorkspaceUseCase
}
