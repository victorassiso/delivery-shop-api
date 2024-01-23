import { Customer } from '@prisma/client'

import { CustomersRepository } from '@/repositories/customers-repository'
import { WorkspacesRepository } from '@/repositories/workspaces-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface GetCustomersUseCaseRequest {
  workspaceId: string
  pageIndex?: number
  id?: string
  name?: string
  email?: string
  phone?: string
  address?: string
}

export interface GetCustomersUseCaseResponse {
  customers: Customer[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export class GetCustomersUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private workspacesRepository: WorkspacesRepository,
  ) {}

  async execute({
    workspaceId,
    pageIndex,
    id,
    name,
    email,
    phone,
    address,
  }: GetCustomersUseCaseRequest): Promise<GetCustomersUseCaseResponse> {
    const workspace = await this.workspacesRepository.findById(workspaceId)

    if (!workspace) {
      throw new ResourceNotFoundError()
    }

    const customers = await this.customersRepository.query({
      workspaceId,
      pageIndex,
      id,
      name,
      email,
      phone,
      address,
    })

    const slicedCustomers: Customer[] = customers.slice(
      (pageIndex || 0) * 10,
      (pageIndex || 0) * 10 + 10,
    )

    const meta = {
      pageIndex: pageIndex ?? 0,
      perPage: 10,
      totalCount: customers.length,
    }

    return {
      customers: slicedCustomers,
      meta,
    }
  }
}
