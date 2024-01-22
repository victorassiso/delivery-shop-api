import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { CreateAndAuthenticateUserAndCreateWorkspace } from '@/utils/test/create-and-authenticate-user-and-workspace'

describe('Create Customer (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to create a Customer', async () => {
    const { token } = await CreateAndAuthenticateUserAndCreateWorkspace(app)

    const response = await request(app.server)
      .post('/customers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Customer',
        email: 'customer@example.com',
        address: 'Example st, 123',
        phone: '12345678',
      })

    expect(response.statusCode).toEqual(201)
  })
})
