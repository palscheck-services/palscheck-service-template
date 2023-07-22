/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

interface successCBParams<T> {
  res: Response
  data: T
  message: string
  statusCode?: number
}

class BuildResponse {
  public successCB({ res, data, message, statusCode = 200 }: successCBParams<any>) {
    return res.status(statusCode).json({
      message,
      data,
      success: true,
    })
  }
}

export const buildResponse = new BuildResponse()
