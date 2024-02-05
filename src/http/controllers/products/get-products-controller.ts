import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetProductsUseCase } from '@/use-cases/factories/make-get-products-use-case'

export async function getProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getProductsQuerySchema = z.object({
    pageIndex: z.coerce.number().optional(),
    perPage: z.coerce.number().optional(),
    id: z.string().uuid().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
  })

  const {
    pageIndex,
    perPage,
    category,
    description,
    id,
    maxPrice,
    minPrice,
    name,
  } = getProductsQuerySchema.parse(request.query)

  const workspaceId = request.user.workspaceId
  if (!workspaceId) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  try {
    const getProductsUseCase = makeGetProductsUseCase()

    const { products, meta } = await getProductsUseCase.execute({
      workspaceId,
      pageIndex,
      perPage,
      category,
      description,
      id,
      maxPrice,
      minPrice,
      name,
    })

    return reply.status(200).send({
      products,
      meta,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
