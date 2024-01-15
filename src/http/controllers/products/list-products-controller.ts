import { FastifyReply, FastifyRequest } from 'fastify'

import { makeListProductsUseCase } from '@/use-cases/factories/make-list-products-use-case'

export async function listProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listProductsUseCase = makeListProductsUseCase()

  const business_id = request.user.business_id
  console.log(request.user)
  if (!business_id) {
    console.log('OI')
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  const products = await listProductsUseCase.execute({
    business_id,
  })

  return reply.status(200).send({ products })
}
