import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get Workspace (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to get the workspace', async () => {
    const { token: authToken } = await CreateAndAuthenticateUser(app)

    const createWorkspaceResponse = await request(app.server)
      .post('/workspaces')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'My Workspace',
        code: 'myworkspaceuniquecode',
      })

    const { token: createWorkspaceToken } = createWorkspaceResponse.body

    const response = await request(app.server)
      .get('/workspaces')
      .set('Authorization', `Bearer ${createWorkspaceToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.workspace).toEqual(
      expect.objectContaining({
        code: 'myworkspaceuniquecode',
      }),
    )
  })
})
