import { compare } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export async function authenticateUserControler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateUserSchema.parse(request.body)

  // Validate email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return reply.status(404).send({ error: 'E-mail not found!' })
  }

  // Validate password
  const isPasswordValid = await compare(password, user.password_hash)

  if (isPasswordValid) {
    return reply.status(200).send({ success: 'Login successful' })
  } else {
    return reply.status(403).send({ error: 'Invalid password!' })
  }
}
