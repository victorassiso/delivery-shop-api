import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetDayOrdersAmountUseCase } from '@/use-cases/factories/make-get-day-orders-amount-use-case'

export async function getDayOrdersAmountController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const workspaceId = request.user.workspaceId

  if (!workspaceId) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  try {
    const getDayOrdersAmountUseCase = makeGetDayOrdersAmountUseCase()

    const { amount, percentualDiffFromYesterday } =
      await getDayOrdersAmountUseCase.execute({
        workspaceId,
      })

    return reply.status(200).send({
      amount,
      percentualDiffFromYesterday,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
