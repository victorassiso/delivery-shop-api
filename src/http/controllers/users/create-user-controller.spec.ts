import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Create User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to create a new user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
