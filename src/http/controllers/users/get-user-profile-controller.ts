import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

export async function GetUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const { user } = await getUserProfileUseCase.execute({
    id: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  })
}
