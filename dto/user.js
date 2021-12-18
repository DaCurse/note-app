import Joi from 'joi'

const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 32

const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_LENGTH = 128
const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*/
const INVALID_PASSWORD_MESSAGE =
  'Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter and 1 number'

export const userDTO = Joi.object({
  username: Joi.string()
    .min(MIN_USERNAME_LENGTH)
    .max(MAX_USERNAME_LENGTH)
    .required(),
  password: Joi.string()
    .regex(PASSWORD_REGEX)
    .message(INVALID_PASSWORD_MESSAGE)
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH)
    .required(),
})
