import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateUserUseCase } from './create-user-use-case'

describe('Create User Use Case', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const userProps = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    const { user } = await createUserUseCase.execute(userProps)

    const isPasswordCorrectlyHashed = await compare(
      userProps.password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create a new user with an e-mail that already exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const userProps = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    await createUserUseCase.execute(userProps)

    expect(() => createUserUseCase.execute(userProps)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })

  it('should be able to create user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const userProps = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    const { user } = await createUserUseCase.execute(userProps)

    expect(user.id).toEqual(expect.any(String))
  })
})
