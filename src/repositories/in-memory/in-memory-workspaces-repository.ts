import { Prisma, Workspace } from '@prisma/client'

import { WorkspacesRepository } from '../workspaces-repository'

export class InMemoryWorkspacesRepository implements WorkspacesRepository {
  public items: Workspace[] = []

  async create(data: Prisma.WorkspaceCreateInput) {
    const { name, code } = data

    const workspace: Workspace = {
      id: 'workspace-1',
      name,
      code,
      created_at: new Date(),
    }

    this.items.push(workspace)

    return workspace
  }

  async findByCode(code: string) {
    const workspace = this.items.find((item) => item.code === code)

    if (!workspace) {
      return null
    }

    return workspace
  }

  async findById(id: string) {
    const workspace = this.items.find((item) => item.id === id)

    if (!workspace) {
      return null
    }

    return workspace
  }
}
