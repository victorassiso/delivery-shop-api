import { Workspace } from '@prisma/client'

import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { CodeAlreadyExistsError } from './errors/code-already-exists-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateWorkspaceUseCaseRequest {
  id: string
  name: string
  code: string
}

interface UpdateWorkspaceUseCaseResponse {
  workspace: Workspace
}

export class UpdateWorkspaceUseCase {
  constructor(private workspacesRepository: WorkspacesRepository) {}

  async execute({
    id,
    name,
    code,
  }: UpdateWorkspaceUseCaseRequest): Promise<UpdateWorkspaceUseCaseResponse> {
    const codeAlreadyInUse = await this.workspacesRepository.findByCode(code)

    if (codeAlreadyInUse) {
      throw new CodeAlreadyExistsError()
    }

    const workspace = await this.workspacesRepository.update({ id, name, code })

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    return { workspace }
  }
}
