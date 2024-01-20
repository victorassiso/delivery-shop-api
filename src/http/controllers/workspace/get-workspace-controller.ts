import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetWorkspaceUseCase } from '@/use-cases/factories/make-get-workspace-use-case'

export async function getWorkspaceController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getWorkspaceUseCase = makeGetWorkspaceUseCase()

  if (!request.user.workspace_id) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  const { workspace } = await getWorkspaceUseCase.execute({
    id: request.user.workspace_id,
  })

  return reply.status(200).send({
    workspace: {
      ...workspace,
      password_hash: undefined,
    },
  })
}
