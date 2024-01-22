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
    customer_id: z.string(),
    items: z.array(
      z.object({
        product_id: z.string(),
        quantity: z.number(),
      }),
    ),
  })

  const { customer_id, items } = createOrderBodySchema.parse(request.body)

  try {
    const createOrderUseCase = makeCreateOrderUseCase()

    const workspace_id = request.user.workspace_id

    if (!workspace_id) {
      return reply.status(400).send({ message: 'Resource not found.' })
    }

    const { order } = await createOrderUseCase.execute({
      customer_id,
      workspace_id,
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
