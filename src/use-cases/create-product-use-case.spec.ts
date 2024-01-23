import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWorkspacesRepository } from '@/repositories/in-memory/in-memory-workspaces-repository'

import { CreateProductUseCase } from './create-product-use-case'
import { CreateUserUseCase } from './create-user-use-case'
import { CreateWorkspaceUseCase } from './create-workspace-use-case'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

let workspacesRepository: InMemoryWorkspacesRepository
let createWorkspaceUseCase: CreateWorkspaceUseCase

let productsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Product Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)

    workspacesRepository = new InMemoryWorkspacesRepository()
    createWorkspaceUseCase = new CreateWorkspaceUseCase(
      workspacesRepository,
      usersRepository,
    )

    productsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(productsRepository, workspacesRepository)
  })

  it('should be able to create a product', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { workspace } = await createWorkspaceUseCase.execute({
      name: "John Doe's",
      code: 'John-Does-unique-code',
      userId: user.id,
    })

    const { product } = await sut.execute({
      name: 'Example name',
      category: 'Example category',
      description: 'This is an example',
      price: 9.99,
      workspaceId: workspace.id,
    })

    expect(product.id).toEqual(expect.any(String))
  })
})
