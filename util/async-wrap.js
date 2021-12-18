function asyncWrap(handler) {
  return async (req, res, next) => {
    try {
      return await handler.call(null, req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export default asyncWrap
