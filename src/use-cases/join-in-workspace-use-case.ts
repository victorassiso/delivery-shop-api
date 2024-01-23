import { UsersRepository } from '@/repositories/users-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { WorkspaceNotFoundError } from './errors/workspace-not-found-error'

interface JoinInWorkspaceUseCaseRequest {
  userId: string
  workspaceCode: string
}

export class JoinInWorkspaceUseCase {
  constructor(
    private workspacesRepository: WorkspacesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ userId, workspaceCode }: JoinInWorkspaceUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const workspace = await this.workspacesRepository.findByCode(workspaceCode)

    if (!workspace) {
      throw new WorkspaceNotFoundError()
    }

    const updatedUser = await this.usersRepository.updateWorkspaceId({
      userId,
      workspaceId: workspace.id,
    })

    return { user: updatedUser, workspace }
  }
}
