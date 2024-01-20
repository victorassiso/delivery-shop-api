import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const { name, email, password_hash } = data
    const now = new Date()

    const user = {
      id: 'user-1',
      name,
      email,
      password_hash,
      role: null,
      workspace_id: null,
      created_at: now,
      updated_at: now,
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

  async updateWorkspaceId(user_id: string, workspace_id: string) {
    let user: User | null = null

    this.items.map((item) => {
      if (item.id === user_id) {
        user = { ...item, workspace_id }
        return user
      } else {
        return item
      }
    })

    return user
  }
}
