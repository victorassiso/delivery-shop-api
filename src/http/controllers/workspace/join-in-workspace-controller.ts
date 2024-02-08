import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { WorkspaceNotFoundError } from '@/use-cases/errors/workspace-not-found-error'
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
      userId: request.user.sub,
      workspaceCode: code,
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return reply.status(200).send({
      workspaceId: user.workspaceId,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof WorkspaceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
