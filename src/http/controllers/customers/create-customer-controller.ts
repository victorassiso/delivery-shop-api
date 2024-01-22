import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { PhoneAlreadyExistsError } from '@/use-cases/errors/phone-already-exists-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateCustomerUseCase } from '@/use-cases/factories/make-create-customer-use-case'

export async function createCustomerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCustomerBodySchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
    address: z.string().min(1),
  })

  const { name, email, address, phone } = createCustomerBodySchema.parse(
    request.body,
  )

  try {
    const createCustomerUseCase = makeCreateCustomerUseCase()

    const workspace_id = request.user.workspace_id

    if (!workspace_id) {
      return reply.status(400).send({ message: 'Resource not found.' })
    }

    await createCustomerUseCase.execute({
      name,
      email,
      address,
      phone,
      workspace_id,
    })
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

  return reply.status(201).send()
}
