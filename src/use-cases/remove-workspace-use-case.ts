import { UsersRepository } from '@/repositories/users-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RemoveWorkspaceUseCaseRequest {
  id: string
}

export class RemoveWorkspaceUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: RemoveWorkspaceUseCaseRequest) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const updatedUser = await this.usersRepository.removeWorkspace(id)

    return { user: updatedUser }
  }
}
