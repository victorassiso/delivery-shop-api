import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUsersReposity } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '@/use-cases/authenticate-user-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'

export async function authenticateUserControler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateUserSchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersReposity()
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

    const user = await authenticateUserUseCase.execute({ email, password })

    return reply.status(200).send(user)
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
