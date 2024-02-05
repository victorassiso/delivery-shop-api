import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetCustomersUseCase } from '@/use-cases/factories/make-get-customers-use-case'

export async function getCustomersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getCustomersQuerySchema = z.object({
    pageIndex: z.coerce.number().optional().default(0),
    perPage: z.coerce.number().optional(),
    id: z.string().uuid().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
  })

  const { pageIndex, perPage, id, name, email, address, phone } =
    getCustomersQuerySchema.parse(request.query)

  const workspaceId = request.user.workspaceId

  if (!workspaceId) {
    return reply.status(400).send({ message: 'Resource not found.' })
  }

  try {
    const getCustomersUseCase = makeGetCustomersUseCase()

    const { customers, meta } = await getCustomersUseCase.execute({
      pageIndex,
      perPage,
      id,
      name,
      email,
      address,
      phone,
      workspaceId,
    })

    return reply.status(200).send({ customers, meta })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
