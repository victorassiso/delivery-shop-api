import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRemoveWorkspaceUseCase } from '@/use-cases/factories/make-remove-workspace-use-case'

export async function removeWorkspaceController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const removeWorkspaceUseCase = makeRemoveWorkspaceUseCase()

  try {
    const { user } = await removeWorkspaceUseCase.execute({
      id: request.user.sub,
    })

    return reply.status(200).send({ user })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
