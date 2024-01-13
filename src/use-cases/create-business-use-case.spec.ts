import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryBusinessesRepository } from '@/repositories/in-memory/in-memory-businesses-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateBusinessUseCase } from './create-business-use-case'
import { CreateUserUseCase } from './create-user-use-case'
import { BusinessAlreadyExistsError } from './errors/business-already-exists-error'

let businessesRepository: InMemoryBusinessesRepository
let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let sut: CreateBusinessUseCase

describe('Create Business Use Case', () => {
  beforeEach(() => {
    businessesRepository = new InMemoryBusinessesRepository()
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    sut = new CreateBusinessUseCase(businessesRepository, usersRepository)
  })

  it('should be able to create a business', async () => {
    const createUserResponse = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { business, user } = await sut.execute({
      name: "John Doe's",
      code: 'John-Does-unique-code',
      user_id: createUserResponse.user.id,
    })

    expect(business.id).toEqual(expect.any(String))
    expect(user.business_id).toEqual(business.id)
  })

  it('should not be able to create a business with a business code that is already in use', async () => {
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
    ).rejects.toBeInstanceOf(BusinessAlreadyExistsError)
  })
})
