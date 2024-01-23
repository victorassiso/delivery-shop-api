import { Workspace } from '@prisma/client'

import { makeCreateCustomerUseCase } from '@/use-cases/factories/make-create-customer-use-case'
import { makeCreateOrderUseCase } from '@/use-cases/factories/make-create-order-use-case'
import { makeCreateProductUseCase } from '@/use-cases/factories/make-create-product-use-case'

export async function seedDatabase(workspace: Workspace) {
  // Create Customers
  const createCustomerUseCase = makeCreateCustomerUseCase()

  const { customer: customer1 } = await createCustomerUseCase.execute({
    workspaceId: workspace.id,
    name: 'Giovanna Assis',
    email: 'giovannassis@gmail.com',
    address: 'Rua Mariz e Barros, 821, Maracanã, apto 601 bl 1',
    phone: '(21) 9 8294-2904',
  })
  const { customer: customer2 } = await createCustomerUseCase.execute({
    workspaceId: workspace.id,
    name: 'Andressa Matos',
    email: 'andressamatos-@outlook.com',
    address: 'CLNW 10/11 Lote A, apto 213',
    phone: '(21) 9 9284-1287',
  })

  // Create Products
  const createProductUseCase = makeCreateProductUseCase()

  const { product: product1 } = await createProductUseCase.execute({
    workspaceId: workspace.id,
    name: 'Coca-cola 2L',
    category: 'Bebidas',
    description: 'Refrigerante de cola',
    price: 10.99,
  })

  const { product: product2 } = await createProductUseCase.execute({
    workspaceId: workspace.id,
    name: 'Pizza de 4 Queijos Gigante',
    category: 'Pizzas',
    description: 'Queijo mussarela, parmesão, provolone e gorgonzola',
    price: 72.39,
  })

  const { product: product3 } = await createProductUseCase.execute({
    workspaceId: workspace.id,
    name: 'X-Frango Salada',
    category: 'Hamburgueres',
    description: 'Uma carne de frango, alface, tomate, cebola e molho ranch',
    price: 24.6,
  })

  const { product: product4 } = await createProductUseCase.execute({
    workspaceId: workspace.id,
    name: 'Triplo Duplo Chedar Bacon',
    category: 'Hamburgueres',
    description: 'Duas carnes, 2 fatias de queijo chedar e duas tiras de bacon',
    price: 34.5,
  })

  const { product: product5 } = await createProductUseCase.execute({
    workspaceId: workspace.id,
    name: 'Pizza de Calabresa Gigante',
    category: 'Pizzas',
    description:
      'Molho de tomate, queijo mussarela e rodelas de linguiça calabresa',
    price: 69.99,
  })

  // Create Orders
  const createOrderUseCase = makeCreateOrderUseCase()

  await createOrderUseCase.execute({
    workspaceId: workspace.id,
    customerId: customer1.id,
    items: [
      {
        productId: product5.id,
        quantity: 1,
      },
      {
        productId: product4.id,
        quantity: 2,
      },
    ],
  })

  await createOrderUseCase.execute({
    workspaceId: workspace.id,
    customerId: customer2.id,
    items: [
      {
        productId: product1.id,
        quantity: 1,
      },
      {
        productId: product2.id,
        quantity: 1,
      },
      {
        productId: product3.id,
        quantity: 2,
      },
    ],
  })
}
