import { FastifyInstance } from 'fastify'
import { createUserController } from 'src/controllers/create-user-controller'

import { authenticateUserControler } from './controllers/authenticate-user-controller'
import { listUsersController } from './controllers/list-users-controller'

export async function Router(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.get('/users', listUsersController)
  app.post('/users/auth', authenticateUserControler)
}
