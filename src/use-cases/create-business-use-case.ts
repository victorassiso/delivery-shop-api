import { Business, User } from '@prisma/client'

import { BusinessesRepository } from '@/repositories/businesses-repository'
import { UsersRepository } from '@/repositories/users-repository'

import { BusinessAlreadyExistsError } from './errors/business-already-exists-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateBusinessUseCaseRequest {
  name: string
  code: string
  user_id: string
}

interface CreateBusinessUseCaseResponse {
  business: Business
  user: User
}

export class CreateBusinessUseCase {
  constructor(
    private businessesRepository: BusinessesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    code,
    user_id,
  }: CreateBusinessUseCaseRequest): Promise<CreateBusinessUseCaseResponse> {
    // Validate Business Unique Code
    const businessWithTheSameCode =
      await this.businessesRepository.findByCode(code)

    if (businessWithTheSameCode) {
      throw new BusinessAlreadyExistsError()
    }

    // Find User by Id
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    // Create business
    const business = await this.businessesRepository.create({
      name,
      code,
    })

    // Update User's Business Id
    const updatedUser = await this.usersRepository.updateBusinessId(
      user_id,
      business.id,
    )

    if (!updatedUser) {
      throw new ResourceNotFoundError()
    }

    return { business, user: updatedUser }
  }
}
