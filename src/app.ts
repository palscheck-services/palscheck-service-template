import express, { Application, Request, Response, NextFunction } from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import { serviceV1Routes } from './modules/service/routes/service-v1.routes'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
)

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req: Request, res: Response) => {
  res.send('welcome to palscheck microservice')
})

// route registration
app.use('/api/v1',serviceV1Routes)
// error handler, could still be improved
app.use(
  (
    error: { status: number; message: string; errors: any; code: number; keyValue: any },
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    let finalMessage = error.message

    if (error.code === 11000) {
      finalMessage = `${Object.keys(error.keyValue)} already exists`
    }

    res.status(error.status || 500).json({
      message: finalMessage,
      data: undefined,
      success: false,
      errors: error?.errors || {},
    })
    next()
  },
)

app.use((req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next()
  }
  res.status(404).json({
    message: 'Route not found',
    error: { message: 'Route not found' },
    data: undefined,
    success: false,
  })
})

export default app
