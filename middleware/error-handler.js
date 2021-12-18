import createErrorResponse from '../util/create-error-response.js'

export default function errorHandler(error, _req, res, _next) {
  const errorResponse = createErrorResponse(error)
  res.status(errorResponse.statusCode).json(errorResponse)
}
