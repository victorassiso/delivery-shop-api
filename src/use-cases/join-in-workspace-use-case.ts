import { UsersRepository } from '@/repositories/users-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { WorkspaceNotFoundError } from './errors/workspace-not-found-error'

interface JoinInWorkspaceUseCaseRequest {
  user_id: string
  workspace_code: string
}

export class JoinInWorkspaceUseCase {
  constructor(
    private workspacesRepository: WorkspacesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ user_id, workspace_code }: JoinInWorkspaceUseCaseRequest) {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const workspace = await this.workspacesRepository.findByCode(workspace_code)

    if (!workspace) {
      throw new WorkspaceNotFoundError()
    }

    const updatedUser = await this.usersRepository.updateWorkspaceId({
      user_id,
      workspace_id: workspace.id,
    })

    return { user: updatedUser, workspace }
  }
}
