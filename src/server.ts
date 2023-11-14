import fastify from 'fastify'
import { mealRoutes } from './routes/meals'
import { env } from './env'

const app = fastify()

app.register(mealRoutes, { prefix: '/' })

app.listen({ port: env.PORT }).then(() => console.log('HTTP Server Running.'))
