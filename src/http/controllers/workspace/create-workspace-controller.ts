import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { WorkspaceAlreadyExistsError } from '@/use-cases/errors/workspace-already-exists-error'
import { makeCreateWorkspaceUseCase } from '@/use-cases/factories/make-create-workspace-use-case'
import { seedDatabase } from '@/utils/mock-data/seed-database'

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

    const { user, workspace } = await createWorkspaceUseCase.execute({
      name,
      code,
      userId: request.user.sub,
    })

    seedDatabase(workspace)

    const token = await reply.jwtSign(
      {
        role: user.role,
        workspaceId: user.workspaceId,
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
        workspaceId: user.workspaceId,
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
    if (err instanceof WorkspaceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
