import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { WorkspacesRepository } from '../workspaces-repository'

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
}
