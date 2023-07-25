/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

interface SuccessCBParams<T> {
  res: Response
  data: T
  message: string
  statusCode?: successCode
}

interface ErrorCBParams<T> {
  res: Response
  data: T
  message: string
  statusCode?: errorCode
}


export enum successCode {
  success = 200,
  created = 201
}

export enum errorCode {
  server = 500,
  badRequest = 400,
  unAuthorize = 401,
  notFound = 404
}

class BuildResponse {
  public successCB({ res, data, message, statusCode }: SuccessCBParams<any>) {
    const status: successCode = statusCode!
    return res.status(status).json({
      message,
      data,
      success: true,
    })
  }

  public errorCB({ res, data, message, statusCode }: ErrorCBParams<any>) {
    const status: errorCode = statusCode!
    return res.status(status).json({
      message,
      data,
      success: false,
    })
  }
}

export const buildResponse = new BuildResponse()
