import { ServiceModel } from './service.interface'
import { resolvePagination } from '../../helpers'
import { ServiceRepository } from './service.repository'

import { Request } from 'express'

class ExampleService {
  constructor(private readonly serviceRepository: typeof ServiceRepository) {}

  public async expamplefindAll(req: Request, filter?: Partial<ServiceModel>) {
    const { limit, page } = resolvePagination(req.query)
    const request = await this.serviceRepository
      .find(filter || {})
      .skip((page - 1) * limit)
      .limit(limit)

    const usersCount = await ServiceRepository.countDocuments()
    return {
      request,
      meta: {
        total: usersCount,
        page,
        limit,
      },
    }
  }
}

export default new ExampleService(ServiceRepository)
