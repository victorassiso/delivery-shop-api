import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function healthCheck(app: FastifyInstance) {
  app.get('/health-check', (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ message: 'OK' })
  })

  app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ message: 'Welcome to Delivery Shop Api' })
  })
}
