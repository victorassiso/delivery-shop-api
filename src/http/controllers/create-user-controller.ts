import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersReposity } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '@/use-cases/create-user-use-case'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUserBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersReposity()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    await createUserUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
