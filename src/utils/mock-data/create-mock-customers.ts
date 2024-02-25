import { Customer } from '@prisma/client'

import { makeCreateCustomerUseCase } from '@/use-cases/factories/make-create-customer-use-case'

import { limit } from '../limit'

const mockCustomers = [
  {
    name: 'Giovanna Assis',
    email: 'giovannassis@gmail.com',
    address: 'Rua Mariz e Barros, 821, Maracanã, apto 601 bl 1',
    phone: '(21) 9 8294-2904',
  },
  {
    name: 'Andressa Matos',
    email: 'andressamatos-@outlook.com',
    address: 'CLNW 10/11 Lote A, apto 213',
    phone: '(21) 9 9284-1287',
  },
  {
    name: 'Lucas Oliveira',
    email: 'lucas.oliveira@gmail.com',
    address: 'Av. Paulista, 1234, apto 502',
    phone: '(11) 9 8765-4322',
  },
  {
    name: 'Juliana Santos',
    email: 'julianasantos@yahoo.com',
    address: 'Rua da Consolação, 567, apto 303',
    phone: '(11) 9 7456-1235',
  },
  {
    name: 'Carlos Silva',
    email: 'carlos.silva@hotmail.com',
    address: 'Av. Atlântica, 789, apto 1501',
    phone: '(21) 9 8374-5679',
  },
  {
    name: 'Amanda Costa',
    email: 'amanda.costa@gmail.com',
    address: 'R. Augusta, 432, apto 22',
    phone: '(11) 9 6543-2110',
  },
  {
    name: 'Rafael Oliveira',
    email: 'rafael.oliveira@gmail.com',
    address: 'Av. Copacabana, 876, apto 1203',
    phone: '(21) 9 8123-4568',
  },
  {
    name: 'Fernanda Souza',
    email: 'fernanda.souza@yahoo.com',
    address: 'R. Oscar Freire, 543, apto 401',
    phone: '(11) 9 8765-0988',
  },
  {
    name: 'Pedro Santos',
    email: 'pedro.santos@hotmail.com',
    address: 'Av. Ipanema, 789, apto 902',
    phone: '(21) 9 8345-6790',
  },
  {
    name: 'Bianca Lima',
    email: 'bianca.lima@gmail.com',
    address: 'R. Bela Cintra, 876, apto 1502',
    phone: '(11) 9 7654-4323',
  },
  {
    name: 'Gustavo Martins',
    email: 'gustavo.martins@yahoo.com',
    address: 'Av. Nossa Senhora de Copacabana, 987, apto 803',
    phone: '(21) 9 8234-5679',
  },
  {
    name: 'Marina Oliveira',
    email: 'marina.oliveira@hotmail.com',
    address: 'R. Haddock Lobo, 543, apto 401',
    phone: '(11) 9 8765-4324',
  },
  {
    name: 'Roberto Silva',
    email: 'roberto.silva@gmail.com',
    address: 'Av. Vieira Souto, 876, apto 602',
    phone: '(21) 9 8123-4569',
  },
  {
    name: 'Camila Costa',
    email: 'camila.costa@yahoo.com',
    address: 'R. Pamplona, 543, apto 301',
    phone: '(11) 9 8765-0989',
  },
  {
    name: 'Vinícius Santos',
    email: 'vinicius.santos@hotmail.com',
    address: 'Av. das Américas, 789, apto 902',
    phone: '(21) 9 8345-6791',
  },
  {
    name: 'Isabela Lima',
    email: 'isabela.lima@gmail.com',
    address: 'R. Augusta, 876, apto 1402',
    phone: '(11) 9 7654-4325',
  },
  {
    name: 'Diego Martins',
    email: 'diego.martins@yahoo.com',
    address: 'Av. Paulista, 987, apto 703',
    phone: '(21) 9 8234-5680',
  },
  {
    name: 'Ana Oliveira',
    email: 'ana.oliveira@hotmail.com',
    address: 'R. Oscar Freire, 543, apto 1001',
    phone: '(11) 9 8765-4326',
  },
  {
    name: 'José Silva',
    email: 'jose.silva@gmail.com',
    address: 'Av. Ipanema, 789, apto 1202',
    phone: '(21) 9 8123-4570',
  },
  {
    name: 'Luana Souza',
    email: 'luana.souza@yahoo.com',
    address: 'R. Bela Cintra, 876, apto 1602',
    phone: '(11) 9 7654-4327',
  },
  {
    name: 'Lucas Martins',
    email: 'lucas.martins@gmail.com',
    address: 'Av. Nossa Senhora de Copacabana, 987, apto 903',
    phone: '(21) 9 8234-5681',
  },
  {
    name: 'Aline Oliveira',
    email: 'aline.oliveira@hotmail.com',
    address: 'R. Haddock Lobo, 543, apto 1501',
    phone: '(11) 9 8765-4328',
  },
  {
    name: 'Ricardo Silva',
    email: 'ricardo.silva@yahoo.com',
    address: 'Av. Vieira Souto, 876, apto 702',
    phone: '(21) 9 8123-4571',
  },
  {
    name: 'Mariana Costa',
    email: 'mariana.costa@gmail.com',
    address: 'R. Pamplona, 543, apto 401',
    phone: '(11) 9 8765-4329',
  },
  {
    name: 'Guilherme Santos',
    email: 'guilherme.santos@yahoo.com',
    address: 'Av. das Américas, 789, apto 802',
    phone: '(21) 9 8345-6792',
  },
  {
    name: 'Fernanda Lima',
    email: 'fernanda.lima@gmail.com',
    address: 'R. Augusta, 876, apto 1601',
    phone: '(11) 9 7654-4330',
  },
  {
    name: 'Henrique Martins',
    email: 'henrique.martins@yahoo.com',
    address: 'Av. Paulista, 987, apto 803',
    phone: '(21) 9 8234-5682',
  },
  {
    name: 'Bárbara Oliveira',
    email: 'barbara.oliveira@hotmail.com',
    address: 'R. Oscar Freire, 543, apto 1402',
    phone: '(11) 9 8765-4331',
  },
  {
    name: 'Eduardo Silva',
    email: 'eduardo.silva@gmail.com',
    address: 'Av. Ipanema, 789, apto 1102',
    phone: '(21) 9 8123-4572',
  },
  {
    name: 'Larissa Souza',
    email: 'larissa.souza@yahoo.com',
    address: 'R. Bela Cintra, 876, apto 903',
    phone: '(11) 9 7654-4332',
  },
  {
    name: 'Rafaela Lima',
    email: 'rafaela.lima@gmail.com',
    address: 'Av. Nossa Senhora de Copacabana, 987, apto 602',
    phone: '(21) 9 8234-5683',
  },
  {
    name: 'Gabriel Oliveira',
    email: 'gabriel.oliveira@hotmail.com',
    address: 'R. Haddock Lobo, 543, apto 1201',
    phone: '(11) 9 8765-4333',
  },
  {
    name: 'Carolina Silva',
    email: 'carolina.silva@yahoo.com',
    address: 'Av. Vieira Souto, 876, apto 301',
    phone: '(21) 9 8123-4573',
  },
  {
    name: 'Thiago Costa',
    email: 'thiago.costa@gmail.com',
    address: 'R. Pamplona, 543, apto 902',
    phone: '(11) 9 8765-4334',
  },
  {
    name: 'Amanda Santos',
    email: 'amanda.santos@yahoo.com',
    address: 'Av. das Américas, 789, apto 1502',
    phone: '(21) 9 8345-6793',
  },
  {
    name: 'João Lima',
    email: 'joao.lima@gmail.com',
    address: 'R. Augusta, 876, apto 803',
    phone: '(11) 9 7654-4335',
  },
  {
    name: 'Isadora Martins',
    email: 'isadora.martins@hotmail.com',
    address: 'Av. Paulista, 987, apto 502',
    phone: '(21) 9 8234-5684',
  },
  {
    name: 'Luciana Oliveira',
    email: 'luciana.oliveira@gmail.com',
    address: 'R. Oscar Freire, 543, apto 22',
    phone: '(11) 9 8765-4336',
  },
  {
    name: 'Bruno Silva',
    email: 'bruno.silva@yahoo.com',
    address: 'Av. Ipanema, 789, apto 213',
    phone: '(21) 9 8123-4574',
  },
  {
    name: 'Natália Souza',
    email: 'natalia.souza@gmail.com',
    address: 'R. Bela Cintra, 876, apto 1203',
    phone: '(11) 9 7654-4337',
  },
]

export async function createMockCustomers(
  workspaceId: string,
  progressCallback: (message: string) => void,
) {
  const createCustomerUseCase = makeCreateCustomerUseCase()
  const createCustomerTasks = []
  const customers: Customer[] = []
  let lastCallback = Date.now()

  for (let i = 0; i < mockCustomers.length; i++) {
    // Create customer
    const createCustomerTask = () =>
      createCustomerUseCase.execute({
        workspaceId,
        name: mockCustomers[i].name,
        email: mockCustomers[i].email,
        address: mockCustomers[i].address,
        phone: mockCustomers[i].phone,
      })

    createCustomerTasks.push(createCustomerTask)
  }

  const customerResults = await limit(createCustomerTasks, {
    concurrencyLimit: 40,
    progressCallback: (progress) => {
      if (Date.now() - lastCallback >= 50) {
        progressCallback(
          JSON.stringify({
            step: 'customers',
            progress,
          }),
        )
        lastCallback = Date.now()
      }
    },
  })

  for (const result of customerResults) {
    customers.push(result.customer)
  }

  // Send final progress update
  progressCallback(
    JSON.stringify({
      step: 'customers',
      progress: 1,
    }),
  )

  return customers
}
