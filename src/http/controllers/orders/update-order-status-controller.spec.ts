import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { CreateAndAuthenticateUserAndCreateWorkspace } from '@/utils/test/create-and-authenticate-user-and-workspace'

describe('Update Order Status Order (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to update an Order Status', async () => {
    const { token } = await CreateAndAuthenticateUserAndCreateWorkspace(app)

    const createFirstProductResponse = await request(app.server)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'product example 1',
        category: 'example 1',
        description: 'example example 1',
        cost_price: 9.99,
        retail_price: 99.99,
      })

    const createSecondProductResponse = await request(app.server)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'product example 2',
        category: 'example 2',
        description: 'example example 2',
        cost_price: 8.88,
        retail_price: 88.88,
      })

    const createCustomerResponse = await request(app.server)
      .post('/customers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Customer',
        email: 'customer@example.com',
        address: 'Example st, 123',
        phone: '12345678',
      })

    const createOrderResponse = await request(app.server)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        customer_id: createCustomerResponse.body.customer.id,
        items: [
          {
            product_id: createFirstProductResponse.body.product.id,
            quantity: 3,
          },
          {
            product_id: createSecondProductResponse.body.product.id,
            quantity: 5,
          },
        ],
      })

    const orderId = createOrderResponse.body.order.id

    const processResponse = await request(app.server)
      .patch(`/orders/${orderId}/approve`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(processResponse.statusCode).toEqual(200)

    const dispatchResponse = await request(app.server)
      .patch(`/orders/${orderId}/dispatch`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(dispatchResponse.statusCode).toEqual(200)

    const deliverResponse = await request(app.server)
      .patch(`/orders/${orderId}/deliver`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(deliverResponse.statusCode).toEqual(200)

    const cancelResponse = await request(app.server)
      .patch(`/orders/${orderId}/cancel`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(cancelResponse.statusCode).toEqual(200)
  })
})
