import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { CreateAndAuthenticateUserAndCreateWorkspace } from '@/utils/test/create-and-authenticate-user-and-workspace'

describe('Get Workspace (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to get the workspace', async () => {
    const { token } = await CreateAndAuthenticateUserAndCreateWorkspace(app)

    const response = await request(app.server)
      .get('/workspaces')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.workspace).toEqual(
      expect.objectContaining({
        code: 'myworkspaceuniquecode',
      }),
    )
  })
})
