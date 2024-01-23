import { FastifyReply, FastifyRequest } from 'fastify'

import { makeListProductsUseCase } from '@/use-cases/factories/make-list-products-use-case'

export async function listProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const workspaceId = request.user.workspaceId

  if (!workspaceId) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  const listProductsUseCase = makeListProductsUseCase()

  const { products } = await listProductsUseCase.execute({
    workspaceId,
  })

  return reply.status(200).send({ products })
}
