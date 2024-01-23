import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { PhoneAlreadyExistsError } from '@/use-cases/errors/phone-already-exists-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateOrderUseCase } from '@/use-cases/factories/make-create-order-use-case'

export async function createOrderController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrderBodySchema = z.object({
    customerId: z.string(),
    items: z.array(
      z.object({
        productId: z.string(),
        quantity: z.number(),
      }),
    ),
  })

  const { customerId, items } = createOrderBodySchema.parse(request.body)

  try {
    const createOrderUseCase = makeCreateOrderUseCase()

    const workspaceId = request.user.workspaceId

    if (!workspaceId) {
      return reply.status(400).send({ message: 'Resource not found.' })
    }

    const { order } = await createOrderUseCase.execute({
      customerId,
      workspaceId,
      items,
    })

    return reply.status(201).send({ order })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof PhoneAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
