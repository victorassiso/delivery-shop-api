import { FastifyInstance } from 'fastify'

import { createUserController } from '@/http/controllers/users/create-user-controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { authenticateUserControler } from './authenticate-user-controller'
import { GetUserProfileController } from './get-user-profile-controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.post('/sessions', authenticateUserControler)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, GetUserProfileController)
}
