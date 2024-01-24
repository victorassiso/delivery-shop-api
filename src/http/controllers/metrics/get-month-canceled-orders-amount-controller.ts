import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetMonthCanceledOrdersAmountUseCase } from '@/use-cases/factories/make-get-month-canceled-orders-amount-use-case'

export async function getMonthCanceledOrdersAmountController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const workspaceId = request.user.workspaceId

  if (!workspaceId) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  try {
    const getMonthCanceledOrdersAmountUseCase =
      makeGetMonthCanceledOrdersAmountUseCase()

    const { amount, percentualDiffFromLastMonth } =
      await getMonthCanceledOrdersAmountUseCase.execute({
        workspaceId,
      })

    return reply.status(200).send({
      amount,
      percentualDiffFromLastMonth,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
