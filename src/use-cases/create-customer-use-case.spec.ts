import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCustomersRepository } from '@/repositories/in-memory/in-memory-customers-repository'

import { CreateCustomerUseCase } from './create-customer-use-case'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { PhoneAlreadyExistsError } from './errors/phone-already-exists-error'

let customersRepository: InMemoryCustomersRepository
let sut: CreateCustomerUseCase

describe('Create Customer Use Case', () => {
  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new CreateCustomerUseCase(customersRepository)
  })

  it('should be able to create customer', async () => {
    const { customer } = await sut.execute({
      name: 'John Doe',
      phone: '12345678',
      email: 'john.doe@example.com',
      address: 'example st',
    })

    expect(customer.id).toEqual(expect.any(String))
  })

  it('should not be able to create a customer with a PHONE that already exists', async () => {
    await sut.execute({
      name: 'John Doe 1',
      phone: '12345678',
      email: 'john.doe1@example.com',
      address: 'example st 1',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe 2',
        phone: '12345678',
        email: 'john.doe2@example.com',
        address: 'example st 2',
      }),
    ).rejects.toBeInstanceOf(PhoneAlreadyExistsError)
  })

  it('should not be able to create a customer with an EMAIL that already exists', async () => {
    await sut.execute({
      name: 'John Doe 1',
      phone: '12345678',
      email: 'john.doe@example.com',
      address: 'example st',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe 2',
        phone: '87654321',
        email: 'john.doe@example.com',
        address: 'example st 2',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
