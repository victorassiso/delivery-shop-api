import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      workspaceId: string | null
      role: 'admin' | 'user' | null
    }
  }
}
