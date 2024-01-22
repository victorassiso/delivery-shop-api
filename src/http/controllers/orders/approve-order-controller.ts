import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateOrderStatusUseCase } from '@/use-cases/factories/make-update-order-status-use-case'

export async function processOrderController(
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
    status: 'processing',
  })

  return reply.status(200).send()
}
