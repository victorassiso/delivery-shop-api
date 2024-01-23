import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrdersUseCase } from '@/use-cases/factories/make-get-orders-use-case'

export async function getOrdersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getOrdersQuerySchema = z.object({
    pageIndex: z.coerce.number().optional(),
    orderId: z.string().uuid().optional(),
    customerName: z.string().optional(),
    status: z
      .enum(['pending', 'canceled', 'processing', 'delivering', 'delivered'])
      .optional(),
  })

  const { pageIndex, orderId, customerName, status } =
    getOrdersQuerySchema.parse(request.query)

  const workspaceId = request.user.workspaceId
  if (!workspaceId) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  try {
    const getOrdersUseCase = makeGetOrdersUseCase()

    const { orders, meta } = await getOrdersUseCase.execute({
      workspaceId,
      pageIndex,
      orderId,
      customerName,
      status,
    })

    return reply.status(200).send({
      orders,
      meta,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
