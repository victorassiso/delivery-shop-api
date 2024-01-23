import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrderDetailsUseCase } from '@/use-cases/factories/make-get-order-details-use-case'

export async function getOrderDetailsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getOrdersParamsSchema = z.object({
    orderId: z.string().uuid(),
  })

  const { orderId } = getOrdersParamsSchema.parse(request.params)

  const workspaceId = request.user.workspaceId
  if (!workspaceId) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  try {
    const getOrderDetailsUseCase = makeGetOrderDetailsUseCase()

    const { orderDetails } = await getOrderDetailsUseCase.execute({
      orderId,
    })

    return reply.status(200).send({
      orderDetails,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
