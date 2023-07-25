import dotenv from 'dotenv'
import { envsafe, port, url } from 'envsafe'

dotenv.config()

export const env = envsafe({
  PORT: port({
    default: 5500,
    desc: 'The port the app is running on',
    example: 80,
  }),
  MONGODB_DB_URL: url({
    desc: 'MongoDB database URL',
    default: process.env.DATABASE_URL,
  }),
})
