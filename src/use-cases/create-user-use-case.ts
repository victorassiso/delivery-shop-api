import { hash } from 'bcryptjs'
import { prisma } from 'src/lib/prisma'
import { UsersRepository } from 'src/repositories/users-repository'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: CreateUserUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithTheSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithTheSameEmail) {
      throw new Error('E-mail already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
