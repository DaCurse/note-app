import HttpErrors from 'http-errors'
import createErrorResponse from '../util/create-error-response.js'

const { NotFound } = HttpErrors

export default function notFoundHandler(req, res, _next) {
  const message = `Cannot ${req.method} ${req.url}`
  const errorResponse = createErrorResponse(NotFound(message))
  res.status(errorResponse.statusCode).json(errorResponse)
}
