import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { mealRoutes } from './routes/meals'
import { env } from './env'

const app = fastify()

app.register(cookie)

app.register(mealRoutes, { prefix: '/meals' })

app.listen({ port: env.PORT }).then(() => console.log('HTTP Server Running.'))
