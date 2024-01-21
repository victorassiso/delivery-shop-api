import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Workspace (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to join in a Workspace', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    await request(app.server)
      .post('/workspaces')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'My Workspace',
        code: 'my-code',
      })

    const response = await request(app.server)
      .post('/workspace')
      .set('Authorization', `Bearer ${token}`)
      .send({
        code: 'my-code',
      })

    expect(response.statusCode).toEqual(200)
  })
})
