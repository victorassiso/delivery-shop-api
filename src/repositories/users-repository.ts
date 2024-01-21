import { Prisma, User } from '@prisma/client'

export interface UpdateWorkspaceId {
  user_id: string
  workspace_id: string
}
export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  updateWorkspaceId(data: UpdateWorkspaceId): Promise<User | null>
}
