import { STATUS_CODES } from 'http'

function createErrorResponse({ status, message, stack }) {
  const statusCode = status || 500
  const errorResponse = { statusCode, error: STATUS_CODES[statusCode] }
  if (message) {
    errorResponse['message'] = message
  }
  if (stack && process.env.NODE_ENV !== 'production') {
    errorResponse['stack'] = stack
  }
  return errorResponse
}

export default createErrorResponse
