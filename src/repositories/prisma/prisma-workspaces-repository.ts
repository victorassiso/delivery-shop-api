import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import {
  WorkspacesRepository,
  WorkspaceUpdateInput,
} from '../workspaces-repository'

export class PrismaWorkspacesRepository implements WorkspacesRepository {
  async create(data: Prisma.WorkspaceCreateInput) {
    const workspace = await prisma.workspace.create({
      data,
    })

    return workspace
  }

  async findByCode(code: string) {
    const workspace = await prisma.workspace.findUnique({
      where: {
        code,
      },
    })

    return workspace
  }

  async findById(id: string) {
    const workspace = await prisma.workspace.findUnique({
      where: {
        id,
      },
    })

    return workspace
  }

  async update(data: WorkspaceUpdateInput) {
    const workspace = await prisma.workspace.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        code: data.code,
      },
    })

    return workspace
  }
}
