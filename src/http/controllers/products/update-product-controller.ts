import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateProductUseCase } from '@/use-cases/factories/make-update-product-use-case'

export async function updateProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateProductBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    price: z.number().optional(),
  })

  const updateProductParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = updateProductParamsSchema.parse(request.params)

  const { category, description, name, price } = updateProductBodySchema.parse(
    request.body,
  )

  try {
    const updateProductUseCase = makeUpdateProductUseCase()

    const { product } = await updateProductUseCase.execute({
      id,
      category,
      description,
      name,
      price,
    })

    return reply.status(200).send({ product })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
