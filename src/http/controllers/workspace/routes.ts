import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createWorkspaceController } from './create-workspace-controller'
import { GetWorkspaceController } from './get-workspace-controller'

export async function workspaceRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/workspaces', createWorkspaceController)
  app.get('/workspaces', GetWorkspaceController)
}
