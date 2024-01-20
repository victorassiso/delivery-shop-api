import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { CreateAndAuthenticateUserAndCreateWorkspace } from '@/utils/test/create-and-authenticate-user-and-workspace'

describe('Update Workspace (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to update a Workspace', async () => {
    const { token } = await CreateAndAuthenticateUserAndCreateWorkspace(app)

    const response = await request(app.server)
      .put('/workspaces')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'My Workspace',
        code: 'myworkspaceuniquecode',
      })

    expect(response.statusCode).toEqual(200)
  })
})
