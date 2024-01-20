import { User, Workspace } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { WorkspaceAlreadyExistsError } from './errors/workspace-already-exists-error'

interface CreateWorkspaceUseCaseRequest {
  name: string
  code: string
  user_id: string
}

interface CreateWorkspaceUseCaseResponse {
  workspace: Workspace
  user: User
}

export class CreateWorkspaceUseCase {
  constructor(
    private workspacesRepository: WorkspacesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    code,
    user_id,
  }: CreateWorkspaceUseCaseRequest): Promise<CreateWorkspaceUseCaseResponse> {
    // Validate Workspace Unique Code
    const workspaceWithTheSameCode =
      await this.workspacesRepository.findByCode(code)

    if (workspaceWithTheSameCode) {
      throw new WorkspaceAlreadyExistsError()
    }

    // Find User by Id
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    // Create workspace
    const workspace = await this.workspacesRepository.create({
      name,
      code,
    })

    // Update User's Workspace Id
    const updatedUser = await this.usersRepository.updateWorkspaceId(
      user_id,
      workspace.id,
    )

    if (!updatedUser) {
      throw new ResourceNotFoundError()
    }

    return { workspace, user: updatedUser }
  }
}
