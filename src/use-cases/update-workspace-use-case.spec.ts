import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWorkspacesRepository } from '@/repositories/in-memory/in-memory-workspaces-repository'

import { CreateUserUseCase } from './create-user-use-case'
import { CreateWorkspaceUseCase } from './create-workspace-use-case'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UpdateWorkspaceUseCase } from './update-workspace-use-case'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

let workspacesRepository: InMemoryWorkspacesRepository
let createWorkspaceUseCase: CreateWorkspaceUseCase
let sut: UpdateWorkspaceUseCase

describe('Update Workspace Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)

    workspacesRepository = new InMemoryWorkspacesRepository()
    createWorkspaceUseCase = new CreateWorkspaceUseCase(
      workspacesRepository,
      usersRepository,
    )
    sut = new UpdateWorkspaceUseCase(workspacesRepository)
  })

  it("should be able to update an user's workspace", async () => {
    const createUserResponse = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { workspace: createdWorkspace } =
      await createWorkspaceUseCase.execute({
        name: "John Doe's",
        code: 'John-Does-unique-code',
        userId: createUserResponse.user.id,
      })

    const { workspace: updatedWorkspace } = await sut.execute({
      id: createdWorkspace.id,
      name: 'New Name',
      code: 'New-Code',
    })

    expect(updatedWorkspace.id).toEqual(createdWorkspace.id)
    expect(updatedWorkspace.name).toEqual('New Name')
    expect(updatedWorkspace.code).toEqual('New-Code')
  })

  it("should not be able to update an user's workspace with a worspace code that does not exists", async () => {
    const createUserResponse = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { workspace: createdWorkspace } =
      await createWorkspaceUseCase.execute({
        name: "John Doe's",
        code: 'John-Does-unique-code',
        userId: createUserResponse.user.id,
      })

    await sut.execute({
      id: createdWorkspace.id,
      name: 'New Name',
      code: 'New-Code',
    })

    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
        name: 'New Name',
        code: 'New-Code',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
