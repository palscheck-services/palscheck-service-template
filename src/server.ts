import app from './app'
import dotenv from 'dotenv'
import { env } from './config/env.config'
import { connectToDB } from './config/mongoose.config'
import { redisClient } from './config/redis.config'

dotenv.config()
redisClient.connect()

const PORT = env.PORT || 3000

connectToDB(() => {
  app.listen(PORT, () => {
    console.log('redis client',redisClient.isReady)
    console.log(`Server is running on port ${PORT}`)
  })
})
