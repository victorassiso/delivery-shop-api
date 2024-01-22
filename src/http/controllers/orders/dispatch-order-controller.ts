import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateOrderStatusUseCase } from '@/use-cases/factories/make-update-order-status-use-case'

export async function dispatchOrderController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrderParamsSchema = z.object({
    orderId: z.string(),
  })

  const { orderId } = createOrderParamsSchema.parse(request.params)

  const updateOrderStatusUseCase = makeUpdateOrderStatusUseCase()

  await updateOrderStatusUseCase.execute({
    id: orderId,
    status: 'delivering',
  })

  return reply.status(200).send()
}
