import Joi from 'joi';

const DEFAULT_LIMIT = 10;

export const getNotesSchema = Joi.object({
  limit: Joi.number().integer().default(DEFAULT_LIMIT),
});

export const getNoteByIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});
