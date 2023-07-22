import { validate } from '../../helpers'
import { query } from 'express-validator'

const validateroute = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1 }).toInt(),
  query('sort').optional().isIn(['asc', 'desc']),
  validate,
]

export const serviceValidation = {
  validateroute,
}
