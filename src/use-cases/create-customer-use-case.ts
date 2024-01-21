import { Customer } from '@prisma/client'

import { CustomersRepository } from '@/repositories/customers-repository'

import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { PhoneAlreadyExistsError } from './errors/phone-already-exists-error'

interface CreateCustomerUseCaseRequest {
  name: string
  phone: string
  email: string
  address: string
}

interface CreateCustomerUseCaseReply {
  customer: Customer
}

export class CreateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    name,
    phone,
    email,
    address,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseReply> {
    // Validate Phone
    const samePhone = await this.customersRepository.findByPhone(phone)

    if (samePhone) {
      throw new PhoneAlreadyExistsError()
    }

    // Validate Email
    const sameEmail = await this.customersRepository.findByEmail(email)

    if (sameEmail) {
      throw new EmailAlreadyExistsError()
    }

    // Create Customer
    const customer = await this.customersRepository.create({
      name,
      phone,
      email,
      address,
    })

    return { customer }
  }
}
