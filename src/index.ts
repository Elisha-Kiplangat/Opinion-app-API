import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config'
import { cors } from 'hono/cors'
import { usersRouter } from './users/users.router'
import authRouter from './Auth/auth.router'
import { partnersRouter } from './Partners/partners.router'
import { surveysRouter } from './surveys/surveys.router'
import { questionsRouter } from './questions/questions.router'
import { choicesRouter } from './choices/choices.router'

const app = new Hono()

app.use ('/*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', usersRouter)

app.route('/', authRouter)

app.route('/', partnersRouter)

app.route('/', surveysRouter)

app.route('/', questionsRouter)

app.route('/', choicesRouter)


serve({
  fetch: app.fetch,
  port: parseInt(process.env.PORT || '3000')
})

console.log(`Server is running on port ${process.env.PORT}`)

