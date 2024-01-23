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
import { UpdateOrderStatusUseCase } from './update-order-status-use-case'

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

let sut: UpdateOrderStatusUseCase

describe('Update Order Status Use Case', () => {
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

    sut = new UpdateOrderStatusUseCase(ordersRepository)
  })

  it('should be able to update an order status', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'User',
      email: 'user@example.com',
      password: '123456',
    })

    const { workspace } = await createWorkspaceUseCase.execute({
      name: 'Workspace',
      code: 'Code',
      userId: user.id,
    })

    const { customer } = await createCustomerUseCase.execute({
      name: 'John Doe',
      workspaceId: workspace.id,
      phone: '12345678',
      email: 'john.doe@example.com',
      address: 'example st',
    })

    const { product: product1 } = await createProductUseCase.execute({
      name: 'Example name 1',
      category: 'Example category 1',
      description: 'This is an example 1',
      price: 99.99,
      workspaceId: workspace.id,
    })

    const { product: product2 } = await createProductUseCase.execute({
      name: 'Example name 2',
      category: 'Example category 2',
      description: 'This is an example 2',
      price: 88.88,
      workspaceId: workspace.id,
    })

    const createOrderResponse = await createOrderUseCase.execute({
      customerId: customer.id,
      workspaceId: workspace.id,
      items: [
        {
          productId: product1.id,
          quantity: 2,
        },
        {
          productId: product2.id,
          quantity: 4,
        },
      ],
    })

    const responseProcessing = await sut.execute({
      id: createOrderResponse.order.id,
      status: 'processing',
    })

    expect(responseProcessing.order.status).toEqual('processing')

    const responseDelivering = await sut.execute({
      id: createOrderResponse.order.id,
      status: 'delivering',
    })

    expect(responseDelivering.order.status).toEqual('delivering')

    const responseDelivered = await sut.execute({
      id: createOrderResponse.order.id,
      status: 'delivered',
    })

    expect(responseDelivered.order.status).toEqual('delivered')

    const responseCanceled = await sut.execute({
      id: createOrderResponse.order.id,
      status: 'canceled',
    })

    expect(responseCanceled.order.status).toEqual('canceled')
  })
})
