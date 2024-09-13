import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema, logger: true})

export default db