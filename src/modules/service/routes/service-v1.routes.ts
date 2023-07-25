import { Router } from 'express'
import ServiceController from '../service.controller'
import { serviceValidation } from '../service.validation'

const router = Router()

router.get('/', serviceValidation.validateroute, ServiceController.examplefindAll)

export const serviceV1Routes = router
