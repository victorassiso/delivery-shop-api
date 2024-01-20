import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { BusinessAlreadyExistsError } from '@/use-cases/errors/business-already-exists-error'
import { makeCreateBusinessUseCase } from '@/use-cases/factories/make-create-business-use-case'

export async function createBusinessController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBusinessBodySchema = z.object({
    name: z.string(),
    code: z.string(),
  })

  const { name, code } = createBusinessBodySchema.parse(request.body)

  try {
    const createBusinessUseCase = makeCreateBusinessUseCase()

    const { user } = await createBusinessUseCase.execute({
      name,
      code,
      user_id: request.user.sub,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
        business_id: user.business_id,
      },
      {
        sign: {
          sub: request.user.sub,
        },
      },
    )

    return reply.status(201).send({ token })
  } catch (err) {
    if (err instanceof BusinessAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
