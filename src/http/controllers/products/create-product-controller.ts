import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateProductUseCase } from '@/use-cases/factories/make-create-product-use-case'

export async function createProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createProductBodySchema = z.object({
    name: z.string().min(1),
    category: z.string().min(1),
    cost_price: z.number(),
    retail_price: z.number(),
  })

  const data = createProductBodySchema.parse(request.body)
  try {
    const createProductUseCase = makeCreateProductUseCase()

    const business_id = request.user.business_id

    if (!business_id) {
      return reply.status(400).send({ message: 'Resource not found.' })
    }

    await createProductUseCase.execute({
      ...data,
      business_id,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
