import { Workspace } from '@prisma/client'

import { PrismaOrderItemsRepository } from '@/repositories/prisma/prisma-order-items-repository'
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'

import { CreateMockCustomers } from './create-mock-customers'
import { CreateMockProducts } from './create-mock-products'
import {
  getRandomCustomer,
  getRandomDatePast4Months,
  getRandomOrderState,
  getRandomProduct,
} from './get-random-functions'

export async function seedDatabase(workspace: Workspace) {
  // Create mock customers
  const customers = await CreateMockCustomers(workspace.id)

  // Create mock products
  const products = await CreateMockProducts(workspace.id)

  // Create Orders...
  const prismaOrdersRepository = new PrismaOrdersRepository()

  for (let i = 0; i < 850; i++) {
    // Create items
    const items = []
    const numberOfProducts = Math.floor(Math.random() * 4) + 1
    for (let j = 0; j < numberOfProducts; j++) {
      const curProduct = getRandomProduct(products)
      items.push({
        productId: curProduct.id,
        quantity: Math.floor(Math.random() * 3) + 1,
        price: curProduct.price,
      })
    }
    // Calculate Total
    const total = items.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity
    }, 0)

    // Create Order
    const curCustomer = getRandomCustomer(customers)
    const randomDate = getRandomDatePast4Months()

    const createdOrder = await prismaOrdersRepository.create({
      workspaceId: workspace.id,
      customerId: curCustomer.id,
      total,
      createdAt: randomDate,
      status: getRandomOrderState(),
    })

    // Create Order Items
    const orderItemsRepository = new PrismaOrderItemsRepository()
    items.forEach(async (item) => {
      await orderItemsRepository.create({
        workspaceId: workspace.id,
        orderId: createdOrder.id,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
        createdAt: randomDate,
      })
    })
  }
}
