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

  const { name, email, password, role } = createUserSchema.parse(request.body)

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
