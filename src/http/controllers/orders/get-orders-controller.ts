import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrdersUseCase } from '@/use-cases/factories/make-get-orders-use-case'

export async function getOrdersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getOrdersParamsSchema = z.object({
    pageIndex: z.coerce.number().optional(),
    orderId: z.string().uuid().optional(),
    customerName: z.string().optional(),
    status: z
      .enum(['pending', 'canceled', 'processing', 'delivering', 'delivered'])
      .optional(),
  })

  const { pageIndex, orderId, customerName, status } =
    getOrdersParamsSchema.parse(request.params)

  const workspace_id = request.user.workspace_id
  if (!workspace_id) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  try {
    const getOrdersUseCase = makeGetOrdersUseCase()

    const { orders, meta } = await getOrdersUseCase.execute({
      workspace_id,
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
