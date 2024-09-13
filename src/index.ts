import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config'
import { cors } from 'hono/cors'

const app = new Hono()

app.use ('/*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


serve({
  fetch: app.fetch,
  port: parseInt(process.env.PORT || '3000')
})

console.log(`Server is running on port ${process.env.PORT}`)

