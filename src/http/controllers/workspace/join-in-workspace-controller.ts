import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeJoinInWorkspaceUseCase } from '@/use-cases/factories/make-join-in-workspace-use-case'

export async function joinInWorkspaceController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createWorkspaceBodySchema = z.object({
    code: z.string(),
  })

  const { code } = createWorkspaceBodySchema.parse(request.body)

  try {
    const joinInWorkspaceUseCase = makeJoinInWorkspaceUseCase()

    const { user } = await joinInWorkspaceUseCase.execute({
      user_id: request.user.sub,
      workspace_code: code,
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const token = await reply.jwtSign(
      {
        role: user.role,
        workspace_id: user.workspace_id,
      },
      {
        sign: {
          sub: request.user.sub,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
        workspace_id: user.workspace_id,
      },
      {
        sign: {
          sub: request.user.sub,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
        httpOnly: true,
      })
      .status(201)
      .send({ token })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
