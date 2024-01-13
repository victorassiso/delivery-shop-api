import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export const app = fastify()

app.post('/users', async (request, reply) => {
  console.log(request.body)
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
})

app.get('/users', async (request, reply) => {
  const users = await prisma.user.findMany()

  return reply.status(200).send({ users })
})