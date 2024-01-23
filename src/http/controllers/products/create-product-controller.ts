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
    description: z.string().nullable(),
    price: z.number(),
  })

  const data = createProductBodySchema.parse(request.body)
  try {
    const createProductUseCase = makeCreateProductUseCase()

    const workspaceId = request.user.workspaceId

    if (!workspaceId) {
      return reply.status(400).send({ message: 'Resource not found.' })
    }

    const { product } = await createProductUseCase.execute({
      ...data,
      workspaceId,
    })

    return reply.status(201).send({ product })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
