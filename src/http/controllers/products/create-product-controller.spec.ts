import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { CreateAndAuthenticateUserAndCreateWorkspace } from '@/utils/test/create-and-authenticate-user-and-workspace'

describe('Create Product (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to create a new Product', async () => {
    const { token } = await CreateAndAuthenticateUserAndCreateWorkspace(app)

    const response = await request(app.server)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'product example',
        category: 'example',
        description: 'example example',
        price: 199.99,
      })

    expect(response.statusCode).toEqual(201)
  })
})
