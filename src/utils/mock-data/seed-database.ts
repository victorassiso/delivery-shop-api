import { Workspace } from '@prisma/client'

import { createMockCustomers } from './create-mock-customers'
import { createMockOrders } from './create-mock-orders'
import { createMockProducts } from './create-mock-products'

export async function seedDatabase(
  workspace: Workspace,
  progressCallback: (message: string) => void,
) {
  progressCallback(JSON.stringify({ step: 'products', progress: 0 }))
  progressCallback(JSON.stringify({ step: 'customers', progress: 0 }))
  progressCallback(JSON.stringify({ step: 'orders', progress: 0 }))
  progressCallback(JSON.stringify({ step: 'items', progress: 0 }))

  // Create mock products and customers
  const [products, customers] = await Promise.all([
    createMockProducts(workspace.id, progressCallback),
    createMockCustomers(workspace.id, progressCallback),
  ])

  await createMockOrders(workspace.id, products, customers, progressCallback)
}
