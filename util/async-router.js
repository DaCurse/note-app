import { Router } from 'express'
import asyncWrap from './async-wrap.js'

// TODO: Make this better, maybe properly extend `express.Router`, and support all HTTP methods
class AsyncRouter {
  constructor() {
    this.expressRouter = Router()
  }

  asyncifyHandlers(handlers) {
    return handlers.map(asyncWrap)
  }

  use(path, ...handlers) {
    this.expressRouter.use(path, ...this.asyncifyHandlers(handlers))
  }

  handle(method, path, handlers) {
    if (typeof this.expressRouter[method] !== 'function') {
      throw new Error(`Invalid method: ${method}`)
    }
    this.expressRouter[method](path, ...this.asyncifyHandlers(handlers))
  }

  get(path, ...handlers) {
    this.handle('get', path, handlers)
  }

  post(path, ...handlers) {
    this.handle('post', path, handlers)
  }

  put(path, ...handlers) {
    this.handle('put', path, handlers)
  }

  delete(path, ...handlers) {
    this.handle('delete', path, handlers)
  }
}

export default AsyncRouter
