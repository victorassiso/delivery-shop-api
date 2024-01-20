import { Prisma, Workspace } from '@prisma/client'

export interface WorkspaceUpdateInput {
  id: string
  name?: string
  code?: string
}
export interface WorkspacesRepository {
  create(data: Prisma.WorkspaceCreateInput): Promise<Workspace>
  findByCode(code: string): Promise<Workspace | null>
  findById(id: string): Promise<Workspace | null>
  update(data: WorkspaceUpdateInput): Promise<Workspace | null>
}
