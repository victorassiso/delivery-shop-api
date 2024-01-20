import { Workspace } from '@prisma/client'

import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetWorkspaceUseCaseRequest {
  id: string
}

interface GetWorkspaceUseCaseResponse {
  workspace: Workspace
}

export class GetWorkspaceUseCase {
  constructor(private workspacesRepository: WorkspacesRepository) {}

  async execute({
    id,
  }: GetWorkspaceUseCaseRequest): Promise<GetWorkspaceUseCaseResponse> {
    const workspace = await this.workspacesRepository.findById(id)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    return { workspace }
  }
}
