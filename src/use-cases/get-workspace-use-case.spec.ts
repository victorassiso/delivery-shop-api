import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryWorkspacesRepository } from '@/repositories/in-memory/in-memory-workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetWorkspaceUseCase } from './get-workspace-use-case'

let workspacesRepository: InMemoryWorkspacesRepository
let sut: GetWorkspaceUseCase

describe('Get Workspace  Use Case', () => {
  beforeEach(() => {
    workspacesRepository = new InMemoryWorkspacesRepository()
    sut = new GetWorkspaceUseCase(workspacesRepository)
  })

  it('should be able to find workspace by id', async () => {
    const createdWorkspace = await workspacesRepository.create({
      name: 'My Workspace',
      code: 'myCode',
    })

    const { workspace } = await sut.execute({
      id: createdWorkspace.id,
    })

    expect(workspace.code).toEqual('myCode')
  })

  it('should not be able to find workspace by a non-existent id', async () => {
    expect(async () => {
      await sut.execute({
        id: 'non-existent-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
