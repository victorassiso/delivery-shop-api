import { SocketStream } from '@fastify/websocket'
import { FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

import { env } from '@/env'
import { WorkspaceAlreadyExistsError } from '@/use-cases/errors/workspace-already-exists-error'
import { makeCreateWorkspaceUseCase } from '@/use-cases/factories/make-create-workspace-use-case'
import { seedDatabase } from '@/utils/mock-data/seed-database'

export async function seedDatabaseController(
  connection: SocketStream,
  request: FastifyRequest,
) {
  const createWorkspaceBodySchema = z.object({
    name: z.string(),
    code: z.string(),
  })

  connection.socket.on('message', async (rawData) => {
    const string = rawData.toLocaleString()
    console.log({ string })
    const data = JSON.parse(string)
    console.log({ data })

    try {
      const { name, code } = createWorkspaceBodySchema.parse(data)

      const createWorkspaceUseCase = makeCreateWorkspaceUseCase()

      // Creating workspace
      const { user, workspace } = await createWorkspaceUseCase.execute({
        name,
        code,
        userId: request.user.sub,
      })

      // Seed Database
      await seedDatabase(workspace, (message: string) => {
        connection.socket.send(message)
      })

      connection.socket.send(
        JSON.stringify({ status: 201, workspaceId: user.workspaceId }),
      )
      connection.socket.close()
    } catch (err) {
      if (err instanceof WorkspaceAlreadyExistsError) {
        connection.socket.send(
          JSON.stringify({ status: 409, message: err.message }),
        )

        connection.socket.close()
        return
      }

      if (err instanceof ZodError) {
        connection.socket.send(
          JSON.stringify({ status: 400, message: err.message }),
        )

        connection.socket.close()
        return
      }

      if (env.NODE_ENV !== 'production') {
        console.error(err)
      } else {
        // TODO: Log to an external tool like DataDog/NewRelic/Sentry
      }

      connection.socket.send(
        JSON.stringify({ status: 500, message: 'Internal server error.' }),
      )

      connection.socket.close()
    }
  })
}
