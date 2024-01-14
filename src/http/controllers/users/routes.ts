import { FastifyInstance } from 'fastify'

import { createUserController } from '@/http/controllers/users/create-user-controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { authenticateUserControler } from './authenticate-user-controller'
import { GetUserProfileController } from './get-user-profile-controller'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.post('/sessions', authenticateUserControler)

  app.patch('/token/refresh', refresh)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, GetUserProfileController)
}
