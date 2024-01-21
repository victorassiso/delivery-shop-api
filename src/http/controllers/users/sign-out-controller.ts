import { FastifyReply, FastifyRequest } from 'fastify'

export async function signOut(request: FastifyRequest, reply: FastifyReply) {
  return reply
    .clearCookie('refreshToken', {
      path: '/',
      secure: true,
      sameSite: 'none',
      httpOnly: true,
    })
    .status(200)
    .send()
}
