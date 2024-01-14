import { FastifyInstance } from 'fastify'

import { createUserController } from '@/http/controllers/create-user-controller'

import { authenticateUserControler } from './controllers/authenticate-user-controller'
import { GetUserProfileController } from './controllers/get-user-profile-controller'
import { listUsersController } from './controllers/list-users-controller'
import { verifyJWT } from './middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.get('/users', listUsersController)

  app.post('/sessions', authenticateUserControler)

  app.get('/me', { onRequest: [verifyJWT] }, GetUserProfileController)
}
