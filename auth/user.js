import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { getUserById } from '../services/user.js'

const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const UserStrategy = new JwtStrategy(options, async function (jwtData, done) {
  try {
    done(null, await getUserById(jwtData.userId))
  } catch (error) {
    return done(error, false)
  }
})

export default UserStrategy
