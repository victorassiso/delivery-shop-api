import cors from '@fastify/cors'
import fastify from 'fastify'
import { Router } from 'src/http/routes'

export const app = fastify()

app.register(cors, {})

app.register(Router)
