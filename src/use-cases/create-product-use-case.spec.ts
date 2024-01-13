import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryBusinessesRepository } from '@/repositories/in-memory/in-memory-businesses-repository'
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateBusinessUseCase } from './create-business-use-case'
import { CreateProductUseCase } from './create-product-use-case'
import { CreateUserUseCase } from './create-user-use-case'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

let businessesRepository: InMemoryBusinessesRepository
let createBusinessUseCase: CreateBusinessUseCase

let productsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Product Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)

    businessesRepository = new InMemoryBusinessesRepository()
    createBusinessUseCase = new CreateBusinessUseCase(
      businessesRepository,
      usersRepository,
    )

    productsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(productsRepository, businessesRepository)
  })

  it('should be able to create a product', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { business } = await createBusinessUseCase.execute({
      name: "John Doe's",
      code: 'John-Does-unique-code',
      user_id: user.id,
    })

    const { product } = await sut.execute({
      name: 'Example name',
      category: 'Example category',
      cost_price: 9.99,
      retail_price: 9.99,
      business_id: business.id,
    })

    expect(product.id).toEqual(expect.any(String))
  })
})
