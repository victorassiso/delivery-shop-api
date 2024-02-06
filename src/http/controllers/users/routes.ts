import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { authenticateUserControler } from './authenticate-user-controller'
import { createUserController } from './create-user-controller'
import { GetUserProfileController } from './get-user-profile-controller'
import { refresh } from './refresh'
import { removeWorkspaceController } from './remove-workspace-controller'
import { signOut } from './sign-out-controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.post('/sessions', authenticateUserControler)

  app.patch('/token/refresh', refresh)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, GetUserProfileController)
  app.post('/sign-out', { onRequest: [verifyJWT] }, signOut)
  app.patch(
    '/users/remove-workspace',
    { onRequest: [verifyJWT] },
    removeWorkspaceController,
  )
}
