import { makeCreateProductUseCase } from '@/use-cases/factories/make-create-product-use-case'
import { makeGetProductsUseCase } from '@/use-cases/factories/make-get-products-use-case'

export const mockProducts = [
  {
    name: 'Coca-cola 2L',
    category: 'Bebidas',
    description: 'Refrigerante de cola',
    price: 10.99,
  },
  {
    name: 'Pizza de 4 Queijos Gigante',
    category: 'Pizzas',
    description: 'Queijo mussarela, parmesão, provolone e gorgonzola',
    price: 72.39,
  },
  {
    name: 'X-Frango Salada',
    category: 'Hamburgueres',
    description: 'Uma carne de frango, alface, tomate, cebola e molho ranch',
    price: 24.6,
  },
  {
    name: 'Triplo Duplo Chedar Bacon',
    category: 'Hamburgueres',
    description: 'Duas carnes, 2 fatias de queijo chedar e duas tiras de bacon',
    price: 34.5,
  },
  {
    name: 'Pizza de Calabresa Gigante',
    category: 'Pizzas',
    description:
      'Molho de tomate, queijo mussarela e rodelas de linguiça calabresa',
    price: 69.99,
  },
  {
    name: 'Água Mineral 500ml',
    category: 'Bebidas',
    description: 'Água purificada',
    price: 2.5,
  },
  {
    name: 'Lasanha à Bolonhesa',
    category: 'Massas',
    description: 'Camadas de massa, carne moída, queijo e molho de tomate',
    price: 45.75,
  },
  {
    name: 'Cheeseburguer Clássico',
    category: 'Hamburgueres',
    description: 'Carne, queijo, alface, tomate e maionese',
    price: 19.99,
  },
  {
    name: 'Suco de Laranja 1L',
    category: 'Bebidas',
    description: 'Suco natural de laranja',
    price: 15.0,
  },
  {
    name: 'Salada Caesar com Frango',
    category: 'Saladas',
    description: 'Alface, croutons, queijo parmesão e frango grelhado',
    price: 18.99,
  },
  {
    name: 'Macarrão Carbonara',
    category: 'Massas',
    description: 'Macarrão, bacon, ovos, queijo parmesão e pimenta preta',
    price: 29.95,
  },
  {
    name: 'Milkshake de Morango',
    category: 'Bebidas',
    description: 'Sorvete de morango batido com leite',
    price: 12.5,
  },
  {
    name: 'Sanduíche Vegano',
    category: 'Sanduíches',
    description:
      'Pão integral, hambúrguer de grão-de-bico, alface, tomate e maionese vegana',
    price: 22.0,
  },
  {
    name: 'Sushi Misto',
    category: 'Sushi',
    description: 'Sashimi e nigiri de peixe variado, rolos de alga e arroz',
    price: 38.99,
  },
  {
    name: 'Torta de Frutas',
    category: 'Sobremesas',
    description: 'Torta com variedade de frutas frescas',
    price: 14.75,
  },
  {
    name: 'Café Espresso',
    category: 'Bebidas',
    description: 'Café preto e forte em pequena quantidade',
    price: 3.5,
  },
  {
    name: 'Wrap de Frango Grelhado',
    category: 'Sanduíches',
    description:
      'Tortilha de trigo, frango grelhado, alface, tomate e molho de iogurte',
    price: 16.8,
  },
  {
    name: 'Risoto de Cogumelos',
    category: 'Arrozes',
    description: 'Arroz cremoso com cogumelos, queijo parmesão e ervas',
    price: 27.25,
  },
  {
    name: 'Cerveja Artesanal IPA',
    category: 'Bebidas',
    description: 'Cerveja artesanal tipo India Pale Ale',
    price: 18.99,
  },
  {
    name: 'Frutas Frescas Variadas',
    category: 'Sobremesas',
    description: 'Seleção de frutas frescas da estação',
    price: 11.25,
  },
  {
    name: 'Tacos de Carne Asada',
    category: 'Tacos',
    description:
      'Tortilhas de milho, carne grelhada, cebola, coentro e molho de pimenta',
    price: 14.99,
  },
  {
    name: 'Sorvete de Chocolate Belga',
    category: 'Sobremesas',
    description: 'Sorvete premium de chocolate belga',
    price: 8.75,
  },
  {
    name: 'Chá Verde Gelado',
    category: 'Bebidas',
    description: 'Chá verde gelado com limão',
    price: 6.5,
  },
  {
    name: 'Burrito de Feijão Preto',
    category: 'Burritos',
    description:
      'Tortilha de trigo, feijão preto, arroz, queijo, alface e molho picante',
    price: 12.99,
  },
  {
    name: 'Pudim de Caramelo',
    category: 'Sobremesas',
    description: 'Pudim cremoso com calda de caramelo',
    price: 9.99,
  },
]

export async function CreateMockProducts(workspaceId: string) {
  const createProductUseCase = makeCreateProductUseCase()

  for (let i = 0; i < mockProducts.length; i++) {
    const product = mockProducts[i]

    // Create Product
    await createProductUseCase.execute({
      workspaceId,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
    })
  }

  const getProductsUseCase = makeGetProductsUseCase()
  const { products } = await getProductsUseCase.execute({
    workspaceId,
  })

  return products
}
