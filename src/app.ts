import cors from '@fastify/cors'
import fastifyjwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'
import { businessRoutes } from './http/controllers/businesses/routes'
import { userRoutes } from './http/controllers/users/routes'

export const app = fastify()
app.register(fastifyjwt, {
  secret: env.JWT_SECRET,
})

app.register(cors, {})

app.register(userRoutes)
app.register(businessRoutes)

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
