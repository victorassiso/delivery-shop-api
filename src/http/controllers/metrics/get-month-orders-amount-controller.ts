import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetMonthOrdersAmountUseCase } from '@/use-cases/factories/make-get-month-orders-amount-use-case'

export async function getMonthOrdersAmountController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const workspaceId = request.user.workspaceId

  if (!workspaceId) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  try {
    const getMonthOrdersAmountUseCase = makeGetMonthOrdersAmountUseCase()

    const { amount, percentualDiffFromLastMonth } =
      await getMonthOrdersAmountUseCase.execute({
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
