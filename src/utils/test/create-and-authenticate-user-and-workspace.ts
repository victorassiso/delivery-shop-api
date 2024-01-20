import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAuthenticateUserAndCreateWorkspace(
  app: FastifyInstance,
) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token: authToken } = authResponse.body

  const createWorkspaceResponse = await request(app.server)
    .post('/workspaces')
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      name: 'My Workspace',
      code: 'myworkspaceuniquecode',
    })

  const { token: createWorkspaceToken } = createWorkspaceResponse.body

  return { token: createWorkspaceToken }
}
