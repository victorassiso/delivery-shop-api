import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Business (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to create a new Business', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const response = await request(app.server)
      .post('/businesses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'My Business',
        code: 'mybusinessuniquecode',
        user_id: profileResponse.body.user.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
