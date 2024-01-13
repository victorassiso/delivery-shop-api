import { z } from 'zod'
import { prisma } from "src/lib/prisma";
import { FastifyReply, FastifyRequest } from 'fastify'


export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['user', 'admin'])
  })

  const { name, email, password, role } = createUserSchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
      role
    }
  })

  return reply.status(201).send()
}