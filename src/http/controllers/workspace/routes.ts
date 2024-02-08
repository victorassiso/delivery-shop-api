import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createWorkspaceController } from './create-workspace-controller'
import { getWorkspaceController } from './get-workspace-controller'
import { joinInWorkspaceController } from './join-in-workspace-controller'
import { removeWorkspaceController } from './remove-workspace-controller'
import { updateWorkspaceController } from './update-workspace-controller'

export async function workspaceRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/workspaces/create', createWorkspaceController)
  app.get('/workspaces', getWorkspaceController)
  app.put('/workspaces', updateWorkspaceController)
  app.post('/workspaces/join-in', joinInWorkspaceController)
  app.patch('/workspaces/remove', removeWorkspaceController)
}
