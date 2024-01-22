import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateUserUseCase } from './create-user-use-case'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create user', async () => {
    const userProps = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    const { user } = await sut.execute(userProps)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new user with an e-mail that already exists', async () => {
    const userProps = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    await sut.execute(userProps)

    await expect(() => sut.execute(userProps)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })

  it('should hash user password upon registration', async () => {
    const userProps = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    const { user } = await sut.execute(userProps)

    const isPasswordCorrectlyHashed = await compare(
      userProps.password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
