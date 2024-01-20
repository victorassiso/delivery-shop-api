import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWorkspacesRepository } from '@/repositories/in-memory/in-memory-workspaces-repository'

import { CreateUserUseCase } from './create-user-use-case'
import { CreateWorkspaceUseCase } from './create-workspace-use-case'
import { WorkspaceAlreadyExistsError } from './errors/workspace-already-exists-error'

let workspacesRepository: InMemoryWorkspacesRepository
let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let sut: CreateWorkspaceUseCase

describe('Create Workspace Use Case', () => {
  beforeEach(() => {
    workspacesRepository = new InMemoryWorkspacesRepository()
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    sut = new CreateWorkspaceUseCase(workspacesRepository, usersRepository)
  })

  it('should be able to create a workspace', async () => {
    const createUserResponse = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { workspace, user } = await sut.execute({
      name: "John Doe's",
      code: 'John-Does-unique-code',
      user_id: createUserResponse.user.id,
    })

    expect(workspace.id).toEqual(expect.any(String))
    expect(user.workspace_id).toEqual(workspace.id)
  })

  it('should not be able to create a workspace with a workspace code that is already in use', async () => {
    const createUserResponse = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await sut.execute({
      name: "John Doe's",
      code: 'John-Does-unique-code',
      user_id: createUserResponse.user.id,
    })

    await expect(() =>
      sut.execute({
        name: "John Doe's",
        code: 'John-Does-unique-code',
        user_id: createUserResponse.user.id,
      }),
    ).rejects.toBeInstanceOf(WorkspaceAlreadyExistsError)
  })
})
