import cors from '@fastify/cors'
import fastify from 'fastify'
import { Router } from 'src/http/routes'
import { ZodError } from 'zod'

import { env } from './env'

export const app = fastify()

app.register(cors, {})

app.register(Router)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Log to an external tool like DataDog/NewRelic/Sentry
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
