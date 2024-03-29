import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyWebsocket from '@fastify/websocket'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'
import { customerRoutes } from './http/controllers/customers/routes'
import { healthCheck } from './http/controllers/health-check/health-check'
import { metricRoutes } from './http/controllers/metrics/routes'
import { orderRoutes } from './http/controllers/orders/routes'
import { productRoutes } from './http/controllers/products/routes'
import { userRoutes } from './http/controllers/users/routes'
import { workspaceRoutes } from './http/controllers/workspace/routes'

export const app = fastify()

app.register(cors, {
  credentials: true,
  allowedHeaders: ['content-type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  origin: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '30m',
  },
})

app.register(fastifyCookie)
app.register(fastifyWebsocket, {
  options: { maxPayload: 524288000 },
})

app.register(userRoutes)
app.register(productRoutes)
app.register(workspaceRoutes)
app.register(customerRoutes)
app.register(orderRoutes)
app.register(metricRoutes)
app.register(healthCheck)

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
