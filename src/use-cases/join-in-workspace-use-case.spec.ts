import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWorkspacesRepository } from '@/repositories/in-memory/in-memory-workspaces-repository'

import { CreateUserUseCase } from './create-user-use-case'
import { CreateWorkspaceUseCase } from './create-workspace-use-case'
import { WorkspaceNotFoundError } from './errors/workspace-not-found-error'
import { JoinInWorkspaceUseCase } from './join-in-workspace-use-case'

let workspacesRepository: InMemoryWorkspacesRepository
let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let createWorkspaceUseCase: CreateWorkspaceUseCase
let sut: JoinInWorkspaceUseCase

describe('Join in Workspace Use Case', () => {
  beforeEach(() => {
    workspacesRepository = new InMemoryWorkspacesRepository()
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    createWorkspaceUseCase = new CreateWorkspaceUseCase(
      workspacesRepository,
      usersRepository,
    )
    sut = new JoinInWorkspaceUseCase(workspacesRepository, usersRepository)
  })

  it('should be able to join in a workspace', async () => {
    const createUser1Response = await createUserUseCase.execute({
      name: 'John Doe 1',
      email: 'johndoe1@example.com',
      password: '123456',
    })

    const createWorkspaceResponse = await createWorkspaceUseCase.execute({
      name: "John Doe 1's",
      code: 'John-Does-1-workspace-code',
      user_id: createUser1Response.user.id,
    })

    const createUser2Response = await createUserUseCase.execute({
      name: 'John Doe 2',
      email: 'johndoe2@example.com',
      password: '123456',
    })

    const { user: user2 } = await sut.execute({
      user_id: createUser2Response.user.id,
      workspace_code: 'John-Does-1-workspace-code',
    })

    expect(user2?.workspace_id).toEqual(createWorkspaceResponse.workspace.id)
  })

  it('should not be able to join in a workspace that does not exists', async () => {
    const createUser1Response = await createUserUseCase.execute({
      name: 'John Doe 1',
      email: 'johndoe1@example.com',
      password: '123456',
    })

    await createWorkspaceUseCase.execute({
      name: "John Doe 1's",
      code: 'John-Does-1-workspace-code',
      user_id: createUser1Response.user.id,
    })

    const createUser2Response = await createUserUseCase.execute({
      name: 'John Doe 2',
      email: 'johndoe2@example.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        user_id: createUser2Response.user.id,
        workspace_code: 'wrong-code',
      }),
    ).rejects.toBeInstanceOf(WorkspaceNotFoundError)
  })
})
