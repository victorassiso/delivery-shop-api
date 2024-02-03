import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  const getUserProfileUseCase = makeGetUserProfileUseCase()
  const { user } = await getUserProfileUseCase.execute({
    id: request.user.sub,
  })

  const accessToken = await reply.jwtSign(
    {
      role: request.user.role,
      workspaceId: user.workspaceId,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  return reply.status(200).send({
    user: {
      id: request.user.sub,
      workspaceId: user.workspaceId,
    },
    accessToken,
  })
}
