import { Prisma, User } from '@prisma/client'

import { UpdateWorkspaceId, UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const { name, email, passwordHash } = data
    const now = new Date()

    const user = {
      id: 'user-1',
      name,
      email,
      passwordHash,
      role: null,
      workspaceId: null,
      createdAt: now,
      updatedAt: now,
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async updateWorkspaceId({ userId, workspaceId }: UpdateWorkspaceId) {
    let user: User | null = null

    this.items.map((item) => {
      if (item.id === userId) {
        user = { ...item, workspaceId }
        return user
      } else {
        return item
      }
    })

    return user
  }
}
