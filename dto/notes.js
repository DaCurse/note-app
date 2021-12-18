import Joi from 'joi'

const DEFAULT_LIMIT = 10
const TITLE_MAX_LENGTH = 255
const CONTENT_MAX_LENGTH = 2000

export const getNotesDTO = Joi.object({
  limit: Joi.number().integer().min(1).default(DEFAULT_LIMIT),
})

export const getNoteByIdDTO = Joi.object({
  id: Joi.number().integer().required(),
})

export const noteDTO = Joi.object({
  title: Joi.string().required().max(TITLE_MAX_LENGTH),
  content: Joi.string().required().max(CONTENT_MAX_LENGTH),
})
