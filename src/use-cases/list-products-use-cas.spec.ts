import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWorkspacesRepository } from '@/repositories/in-memory/in-memory-workspaces-repository'

import { CreateProductUseCase } from './create-product-use-case'
import { CreateUserUseCase } from './create-user-use-case'
import { CreateWorkspaceUseCase } from './create-workspace-use-case'
import { ListProductsUseCase } from './list-products-use-case'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

let workspacesRepository: InMemoryWorkspacesRepository
let createWorkspaceUseCase: CreateWorkspaceUseCase

let productsRepository: InMemoryProductsRepository
let createProductUseCase: CreateProductUseCase
let sut: ListProductsUseCase

describe('Update Workspace Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)

    workspacesRepository = new InMemoryWorkspacesRepository()
    createWorkspaceUseCase = new CreateWorkspaceUseCase(
      workspacesRepository,
      usersRepository,
    )

    productsRepository = new InMemoryProductsRepository()
    createProductUseCase = new CreateProductUseCase(
      productsRepository,
      workspacesRepository,
    )
    sut = new ListProductsUseCase(productsRepository)
  })

  it('should be able to list all products', async () => {
    const createUserResponse = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { workspace: createdWorkspace } =
      await createWorkspaceUseCase.execute({
        name: "John Doe's",
        code: 'John-Does-unique-code',
        user_id: createUserResponse.user.id,
      })

    await createProductUseCase.execute({
      name: 'Example',
      category: 'Examples',
      cost_price: 99.99,
      retail_price: 199.99,
      workspace_id: createdWorkspace.id,
    })

    const { products } = await sut.execute({
      workspace_id: createdWorkspace.id,
    })

    expect(Array.isArray(products)).toBe(true)
    expect(products.length).toBeGreaterThan(0)
  })
})
