import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetMonthRevenueUseCase } from '@/use-cases/factories/make-get-month-revenue-use-case'

export async function getMonthRevenueController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const workspaceId = request.user.workspaceId

  if (!workspaceId) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  try {
    const getMonthRevenueUseCase = makeGetMonthRevenueUseCase()

    const { amount, percentualDiffFromLastMonth } =
      await getMonthRevenueUseCase.execute({
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
