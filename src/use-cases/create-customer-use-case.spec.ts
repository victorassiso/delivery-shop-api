import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCustomersRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWorkspacesRepository } from '@/repositories/in-memory/in-memory-workspaces-repository'

import { CreateCustomerUseCase } from './create-customer-use-case'
import { CreateUserUseCase } from './create-user-use-case'
import { CreateWorkspaceUseCase } from './create-workspace-use-case'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { PhoneAlreadyExistsError } from './errors/phone-already-exists-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

let workspacesRepository: InMemoryWorkspacesRepository
let createWorkspaceUseCase: CreateWorkspaceUseCase

let customersRepository: InMemoryCustomersRepository
let sut: CreateCustomerUseCase

describe('Create Customer Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)

    workspacesRepository = new InMemoryWorkspacesRepository()
    createWorkspaceUseCase = new CreateWorkspaceUseCase(
      workspacesRepository,
      usersRepository,
    )

    customersRepository = new InMemoryCustomersRepository()
    sut = new CreateCustomerUseCase(customersRepository, workspacesRepository)
  })

  it('should be able to create customer', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'User',
      email: 'user@example.com',
      password: '123456',
    })

    const { workspace } = await createWorkspaceUseCase.execute({
      name: 'Workspace',
      code: 'Code',
      user_id: user.id,
    })

    const { customer } = await sut.execute({
      name: 'John Doe',
      workspace_id: workspace.id,
      phone: '12345678',
      email: 'john.doe@example.com',
      address: 'example st',
    })

    expect(customer.id).toEqual(expect.any(String))
  })

  it('should not be able to create a customer with a PHONE that already exists', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'User',
      email: 'user@example.com',
      password: '123456',
    })

    const { workspace } = await createWorkspaceUseCase.execute({
      name: 'Workspace',
      code: 'Code',
      user_id: user.id,
    })

    await sut.execute({
      name: 'John Doe 1',
      workspace_id: workspace.id,
      phone: '12345678',
      email: 'john.doe1@example.com',
      address: 'example st 1',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe 2',
        workspace_id: workspace.id,
        phone: '12345678',
        email: 'john.doe2@example.com',
        address: 'example st 2',
      }),
    ).rejects.toBeInstanceOf(PhoneAlreadyExistsError)
  })

  it('should not be able to create a customer with an EMAIL that already exists', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'User',
      email: 'user@example.com',
      password: '123456',
    })

    const { workspace } = await createWorkspaceUseCase.execute({
      name: 'Workspace',
      code: 'Code',
      user_id: user.id,
    })

    await sut.execute({
      name: 'John Doe 1',
      workspace_id: workspace.id,
      phone: '12345678',
      email: 'john.doe@example.com',
      address: 'example st 1',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe 2',
        workspace_id: workspace.id,
        phone: '87654321',
        email: 'john.doe@example.com',
        address: 'example st 2',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })

  it('should not be able to create a customer with a non-existent Workspace', async () => {
    await expect(() =>
      sut.execute({
        name: 'John Doe',
        workspace_id: 'wrong',
        phone: '12345678',
        email: 'john.doe@example.com',
        address: 'example st',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
