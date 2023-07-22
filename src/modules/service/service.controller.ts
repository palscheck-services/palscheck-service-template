import { asyncHandler, buildResponse } from '../../helpers'
import ExampleService from './service.service'

const { successCB } = buildResponse

class ServiceController {
  constructor(private readonly service: typeof ExampleService) {}

  public examplefindAll = asyncHandler(async (req, res) => {
    const users = await this.service.expamplefindAll(req)
    successCB({
      res,
      data: users,
      message: 'Data retrieved successfully',
    })
  })
}

export default new ServiceController(ExampleService)
