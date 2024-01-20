import { Prisma, Workspace } from '@prisma/client'

export interface WorkspacesRepository {
  create(data: Prisma.WorkspaceCreateInput): Promise<Workspace>
  findByCode(code: string): Promise<Workspace | null>
  findById(id: string): Promise<Workspace | null>
}
