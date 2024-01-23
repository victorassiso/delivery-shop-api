import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateWorkspaceUseCase } from '@/use-cases/factories/make-update-workspace-use-case'

export async function updateWorkspaceController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const UpdateWorkspaceBodySchema = z.object({
    name: z.string(),
    code: z.string(),
  })

  const { name, code } = UpdateWorkspaceBodySchema.parse(request.body)

  try {
    const updateWorkspaceUseCase = makeUpdateWorkspaceUseCase()

    if (!request.user.workspaceId) {
      throw new ResourceNotFoundError()
    }

    await updateWorkspaceUseCase.execute({
      id: request.user.workspaceId,
      name,
      code,
    })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
