import HttpErrors from 'http-errors'
import passport from 'passport'

const { Unauthorized } = HttpErrors

export default function authenticate(strategy, options) {
  return (req, res, next) => {
    passport.authenticate(strategy, options, (err, user) => {
      if (err) return next(err)
      if (!user) throw new Unauthorized()
      req.user = user
      next()
    })(req, res, next)
  }
}
