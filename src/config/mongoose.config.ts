import mongoose from 'mongoose'
import { env } from './env.config'

const { MONGODB_DB_URL } = env

const connectionUrl = MONGODB_DB_URL

mongoose.set('strictQuery', true)

const connectToDB = (cb?: () => void) => {
  mongoose
    .connect(connectionUrl)
    .then(() => {
      cb?.()
      console.log('Connected to database')
    })
    .catch((error: Error) => {
      console.log('Error connecting to database', error)
    })
}

export { connectToDB }
