import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCustomersRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { InMemoryOrderItemsRepository } from '@/repositories/in-memory/in-memory-order-items-repository'
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryWorkspacesRepository } from '@/repositories/in-memory/in-memory-workspaces-repository'

import { CreateCustomerUseCase } from './create-customer-use-case'
import { CreateOrderUseCase } from './create-order-use-case'
import { CreateProductUseCase } from './create-product-use-case'
import { CreateUserUseCase } from './create-user-use-case'
import { CreateWorkspaceUseCase } from './create-workspace-use-case'
import { GetOrdersUseCase } from './get-orders-use-case'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

let workspacesRepository: InMemoryWorkspacesRepository
let createWorkspaceUseCase: CreateWorkspaceUseCase

let productsRepository: InMemoryProductsRepository
let createProductUseCase: CreateProductUseCase

let orderItemsRepository: InMemoryOrderItemsRepository

let customersRepository: InMemoryCustomersRepository
let createCustomerUseCase: CreateCustomerUseCase

let ordersRepository: InMemoryOrdersRepository
let createOrderUseCase: CreateOrderUseCase

let sut: GetOrdersUseCase

describe('Get Orders Use Case', () => {
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

    orderItemsRepository = new InMemoryOrderItemsRepository()

    customersRepository = new InMemoryCustomersRepository()
    createCustomerUseCase = new CreateCustomerUseCase(
      customersRepository,
      workspacesRepository,
    )

    ordersRepository = new InMemoryOrdersRepository()
    createOrderUseCase = new CreateOrderUseCase(
      ordersRepository,
      workspacesRepository,
      productsRepository,
      orderItemsRepository,
      customersRepository,
    )

    sut = new GetOrdersUseCase(ordersRepository)
  })

  it('should be able to get orders', async () => {
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

    const { customer } = await createCustomerUseCase.execute({
      name: 'John Doe',
      workspace_id: workspace.id,
      phone: '12345678',
      email: 'john.doe@example.com',
      address: 'example st',
    })

    const { product: product_1 } = await createProductUseCase.execute({
      name: 'Example name 1',
      category: 'Example category 1',
      description: 'This is an example 1',
      cost_price: 9.99,
      retail_price: 99.99,
      workspace_id: workspace.id,
    })

    const { product: product_2 } = await createProductUseCase.execute({
      name: 'Example name 2',
      category: 'Example category 2',
      description: 'This is an example 2',
      cost_price: 8.88,
      retail_price: 88.88,
      workspace_id: workspace.id,
    })

    await createOrderUseCase.execute({
      customer_id: customer.id,
      workspace_id: workspace.id,
      items: [
        {
          product_id: product_1.id,
          quantity: 2,
        },
        {
          product_id: product_2.id,
          quantity: 4,
        },
      ],
    })

    await createOrderUseCase.execute({
      customer_id: customer.id,
      workspace_id: workspace.id,
      items: [
        {
          product_id: product_1.id,
          quantity: 1,
        },
        {
          product_id: product_2.id,
          quantity: 3,
        },
      ],
    })

    const { orders } = await sut.execute({})

    expect(Array.isArray(orders)).toBe(true)
    expect(orders.length).toEqual(2)
  })
})
