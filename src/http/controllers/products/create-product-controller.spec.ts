import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Product (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to create a new Product', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'product example',
        category: 'example',
        cost_price: 99.99,
        retail_price: 199.99,
      })

    expect(response.statusCode).toEqual(201)
  })
})