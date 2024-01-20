import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { WorkspaceAlreadyExistsError } from '@/use-cases/errors/workspace-already-exists-error'
import { makeCreateWorkspaceUseCase } from '@/use-cases/factories/make-create-workspace-use-case'

export async function createWorkspaceController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createWorkspaceBodySchema = z.object({
    name: z.string(),
    code: z.string(),
  })

  const { name, code } = createWorkspaceBodySchema.parse(request.body)

  try {
    const createWorkspaceUseCase = makeCreateWorkspaceUseCase()

    const { user } = await createWorkspaceUseCase.execute({
      name,
      code,
      user_id: request.user.sub,
    })

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
    console.log({ workspace_id: user.workspace_id })

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
    if (err instanceof WorkspaceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
