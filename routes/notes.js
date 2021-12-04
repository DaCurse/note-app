import { Router } from 'express';
import Joi from 'joi';
import validate from '../middleware/validate.js';
import { getNoteById, getNotes } from '../services/notes.js';

const router = Router();

router.get(
  '/',
  validate(Joi.object({ limit: Joi.number().integer() }), 'query'),
  async (req, res) => {
    res.json(await getNotes(req.query.limit));
  }
);

router.get(
  '/:id',
  validate(Joi.object({ id: Joi.number().integer().required() }), 'params'),
  async (req, res) => {
    res.json(await getNoteById(req.params.id));
  }
);

export const prefix = '/notes';
export { router };
