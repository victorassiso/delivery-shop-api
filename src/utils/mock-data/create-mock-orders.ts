import { Customer, Product } from '@prisma/client'

import { PrismaOrderItemsRepository } from '@/repositories/prisma/prisma-order-items-repository'
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository'
import { limit } from '@/utils/limit'

import {
  getRandomCustomer,
  getRandomDatePast4Months,
  getRandomOrderState,
  getRandomProduct,
} from './get-random-functions'

interface Item {
  productId: string
  quantity: number
  price: number
}
export async function createMockOrders(
  workspaceId: string,
  products: Product[],
  customers: Customer[],
  progressCallback: (message: string) => void,
) {
  const prismaOrdersRepository = new PrismaOrdersRepository()
  const orderItemsRepository = new PrismaOrderItemsRepository()
  const totalOrders = 850
  let lastCallback = Date.now()
  const createOrderTasks = []
  const createItemTasks = []
  const itemsMatrix: Item[][] = []
  const concurrencyLimit = 40

  // Create orders ...
  for (let i = 0; i < totalOrders; i++) {
    // Create items
    const items = []
    const numberOfProducts = Math.floor(Math.random() * 2) + 1
    for (let j = 0; j < numberOfProducts; j++) {
      const curProduct = getRandomProduct(products)
      items.push({
        productId: curProduct.id,
        quantity: Math.floor(Math.random() * 3) + 1,
        price: curProduct.price,
      })
    }
    itemsMatrix.push(items)

    // Calculate Total
    const total = items.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity
    }, 0)

    // Create Order
    const customer = getRandomCustomer(customers)
    const createdAt = getRandomDatePast4Months()

    const createOrderTask = () =>
      prismaOrdersRepository.create({
        workspaceId,
        customerId: customer.id,
        total,
        createdAt,
        status: getRandomOrderState(),
      })
    createOrderTasks.push(createOrderTask)
  }

  console.log('Awaiting all orders...')
  const orders = await limit(createOrderTasks, {
    concurrencyLimit,
    progressCallback: (progress) => {
      if (Date.now() - lastCallback >= 500) {
        progressCallback(
          JSON.stringify({
            step: 'orders',
            progress,
          }),
        )
        lastCallback = Date.now()
      }
    },
  })

  progressCallback(
    JSON.stringify({
      step: 'orders',
      progress: 1,
    }),
  )
  console.log({
    Callback: {
      step: 'orders',
      progress: 1,
    },
  })

  for (let i = 0; i < itemsMatrix.length; i++) {
    for (let j = 0; j < itemsMatrix[i].length; j++) {
      const createItemTask = () =>
        orderItemsRepository.create({
          workspaceId,
          orderId: orders[i].id,
          price: itemsMatrix[i][j].price,
          productId: itemsMatrix[i][j].productId,
          quantity: itemsMatrix[i][j].quantity,
          createdAt: orders[i].createdAt,
        })
      createItemTasks.push(createItemTask)
    }
  }

  console.log('Awaiting all items...')
  await limit(createItemTasks, {
    concurrencyLimit,
    progressCallback: (progress) => {
      if (Date.now() - lastCallback >= 500) {
        progressCallback(
          JSON.stringify({
            step: 'items',
            progress,
          }),
        )
        lastCallback = Date.now()
      }
    },
  })

  progressCallback(
    JSON.stringify({
      step: 'items',
      progress: 1,
    }),
  )
  console.log({
    Callback: {
      step: 'items',
      progress: 1,
    },
  })
}
