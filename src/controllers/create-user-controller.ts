import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['user', 'admin']),
  })

  const requestBody = createUserSchema.safeParse(request.body)

  if (requestBody.success === false) {
    console.error('Invalid User variables!', requestBody.error.format())

    return reply.status(400).send({
      error:
        'Invalid User variables! ' + JSON.stringify(requestBody.error.format()),
    })
  }

  const { name, email, password, role } = requestBody.data

  // Validate email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    return reply.status(400).send({ error: 'Email already exists!' })
  }

  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
      role,
    },
  })

  return reply.status(201).send()
}
