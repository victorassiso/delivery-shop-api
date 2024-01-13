import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '@/lib/prisma'

export async function listUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const users = await prisma.user.findMany()

  return reply.status(200).send({ users })
}
