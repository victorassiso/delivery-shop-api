import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get User Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to get the user profile', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    )
  })
})
