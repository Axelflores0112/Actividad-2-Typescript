import { Strategy, ExtractJwt } from 'passport-jwt'
import { config } from '../../../config/config'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, next) => {
  return next(null, payload)
})

<<<<<<< HEAD
export default JwtStrategy
=======
export default JwtStrategy
>>>>>>> c6e2e7a16722b455ec0d95673cd004704965c8f6
