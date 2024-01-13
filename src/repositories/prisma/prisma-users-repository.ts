import { Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

import { UsersRepository } from '../users-repository'

export class PrismaUserReposity implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
