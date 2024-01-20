import { FastifyReply, FastifyRequest } from 'fastify'

import { makeListProductsUseCase } from '@/use-cases/factories/make-list-products-use-case'

export async function listProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const workspace_id = request.user.workspace_id

  console.log(request.user)

  if (!workspace_id) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  const listProductsUseCase = makeListProductsUseCase()

  const products = await listProductsUseCase.execute({
    workspace_id,
  })

  return reply.status(200).send({ products })
}
